import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/authService/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PostService } from 'src/app/core/services/postService/post.service';
import { EditPostComponent } from 'src/app/pages/post/edit-post/edit-post.component';
import { HostListener } from '@angular/core';
import { EditCommentDialogComponent } from '../edit-comment-dialog/edit-comment-dialog.component';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.css']
})
export class CommentPostComponent {

  token = localStorage.getItem('token')
  decipherData = this.authservice.decodeToken(this.token || '')
  tokenID = this.decipherData.id
  logInUser = this.decipherData.name
  showCommentMenu : { [id : string]: boolean } = {};
    likedPostIds : any[] = []
  likedPostsList : any[] = []
  dataList : any = []
  selectedMedia : any = []
  currentIndexMedia : number = 0
  modalOpen : boolean = false
    postSaved : boolean = false
  savedPostsList : any[] = []
  commentsList : any = []
  newComment : string = ''
  commentsCount : number = 0
  


    constructor(
      private authservice : AuthService,
      private service : PostService,
      private dialog : MatDialog,
      private snackBar: MatSnackBar,
      public dialogRef: MatDialogRef<CommentPostComponent>,
      @Inject(MAT_DIALOG_DATA) public post: any
    ) {}

      ngOnInit(): void {
    this.getPostInfo()
    this.getAllComments()
    console.log('token id ======================', this.tokenID)

  }


  // POST --- COMMENT

  getAllComments(){
    const id = this.post._id
    this.service.getAllComments(id).subscribe((result)=>{
     this.commentsList = result.comments
  .filter((el: any) => el.text && el.userId?.name)
  .map((el: any) => ({
    text: el.text,
    name: el.userId.name,
    userId : el.userId._id,
    commentId : el._id
  }));

      console.log('commentslist====', this.commentsList)

      this.commentsCount = this.commentsList.length
    })

    
  }

  submitComment(id : string){
    if(this.newComment.length===0){
      this.snackBar.open('Enter any Comment', 'Close', { duration : 3000 })
      return;
    }
    console.log('comment text====', this.newComment)
    console.log('post-id for comment====', id)
    console.log('username===', this.logInUser, 'userID====', this.tokenID)

    this.service.comment(id, this.tokenID, this.newComment).subscribe({
      next : (res) => {
        this.snackBar.open('Comment Done', "Close", { duration : 3000 })
        this.getAllComments()
      },
      error : (err) => this.snackBar.open('Comment Error', "Close", { duration : 3000 })
    })

    this.newComment = ''

  }

  

  editComment(comment : any){
    console.log('editcomment==========================', comment)
    const dialogRef = this.dialog.open(EditCommentDialogComponent, {
      width : '400px',
      data : comment
    })

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        const payload = { 
          commentId : comment.commentId,
          postId : this.post._id,
          userId : this.tokenID,
          text : result
         }
        console.log('edit-comment---------------------------------------data--------', result)
        this.service.editComment(payload).subscribe({
          next: (res) => {
            this.snackBar.open('Comment Edited', 'Close', { duration : 3000 })
            this.getAllComments()
          },
          error : (err) => this.snackBar.open('Comment Edit Error', "Close", { duration : 3000 })
        })
      }
    })

  }

  deleteComment(id : string){
    
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width : '500px',
    data : { message : 'Are you sure you want to delete this Comment?' }
  })

  dialogRef.afterClosed().subscribe((result)=>{
    if(result===true){
      this.service.deleteComment(id, this.post._id, this.tokenID).subscribe({
       next: (res) => {
        this.snackBar.open("Comment Deleted Successfully!", 'close', { duration : 3000 })
        this.getAllComments()
      },
       error: (err) => this.snackBar.open('Error in Deleting Comment', 'close', { duration : 3000 }),
     });
    }
  })

  }


  

    
openModal(mediaArray : any[], index : number){
    this.selectedMedia = mediaArray
    this.currentIndexMedia = index,
    this.modalOpen = true
  }


      nextMediaInPost(post: any) {
  if (!post.carouselIndex) post.carouselIndex = 0;
  if (post.carouselIndex < post.media.length - 1) {
    post.carouselIndex++;
  }
}

prevMediaInPost(post: any) {
  if (!post.carouselIndex) post.carouselIndex = 0;
  if (post.carouselIndex > 0) {
    post.carouselIndex--;
  }
}




  // LIKE-- UNLIKE-- 

    likePost(postId : any){
    if(!this.likedPostIds.includes(postId)){
       this.service.likePost(postId, this.tokenID).subscribe({
      next : (res) => {
        this.snackBar.open('Post Liked', 'Close', { duration : 3000 })
        this.getPostInfo()
      },
      error : (err) => this.snackBar.open('Post Liked Error', 'Close', { duration : 3000 })
    })
    }else{
      this.service.unlikePost(postId, this.tokenID).subscribe({
      next : (res) => {
        this.snackBar.open('Post unliked', 'Close', { duration : 3000 })
        this.getPostInfo()
      },
      error : (err) => this.snackBar.open('Post unliked Error', 'Close', { duration : 3000 })
    })
    }
  }


  getPostInfo(){
  this.service.getPostInfo(this.tokenID).subscribe((res) => {
    console.log('postinfo coming here=====', res);

    this.likedPostIds = res.likedPostIds
    this.likedPostsList = res.totalLikes
    console.log('likedPostIds:', this.likedPostIds);
    console.log('total post liked====', res.totalLikes)
  });
  }

  checkPostLikeForColor = (id: string) => this.likedPostIds.includes(id);

checkPostForTotalLikes = (id: string): number => {
  const post = this.likedPostsList.find((el) => el.postId === id);
  return post ? post.likes.length : 0;
};


// SAVE --- POST

  savePost(postId : any){
    this.service.savePost(postId, this.tokenID).subscribe({
      next : (res) => {
        this.snackBar.open('Post Liked!', 'Close', { duration : 3000 })
        this.postSaved = true
      },
      error : (err) => {
        this.snackBar.open('Post Like Failed!', 'Close', { duration : 3000 })
      }
    })
  }

  isPostSaved(postId: string): boolean {
  return this.savedPostsList.find((el : any) => el._id === postId);
}



@HostListener('document:click', ['$event'])
closeShowMenu(event : MouseEvent){
  const target = event.target as HTMLElement

  if(!target.closest('.drop-comment') && !target.closest('.dropdown-menu-comment')){
    this.showCommentMenu = {}
  }
}


}
