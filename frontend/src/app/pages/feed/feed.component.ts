import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/postService/post.service';
import { AuthService } from 'src/app/core/services/authService/auth.service';
import { HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostComponent } from '../post/post.component';
import { EditPostComponent } from '../post/edit-post/edit-post.component';
import { CommentPostComponent } from 'src/app/shared/dialogs/comment-post/comment-post.component';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  dataList : any = []
  selectedMedia : any = []
  currentIndexMedia : number = 0
  modalOpen : boolean = false
  authorName : string = ''
  showMenu : { [id: string]: boolean } = {};
  token = localStorage.getItem('token')
  decipherData = this.authservice.decodeToken(this.token || '')
  tokenID = this.decipherData.id
  // postLiked : boolean = false
  postSaved : boolean = false
  savedPostsList : any[] = []
  likedPostIds : any[] = []
  likedPostsList : any[] = []
  commentPostsList : any[] = []
  commentsCount : any = []

  

  constructor( private service : PostService, private authservice : AuthService,
    private dialog : MatDialog, private snackBar : MatSnackBar
   ){}

  ngOnInit(): void {
    this.getData()
    this.getSavedPosts()
    this.getPostInfo()
    this.getCommentsCount()

  }


  getData(){
    this.service.display().subscribe((data)=>{
      this.dataList = data
      });
  }


  getSavedPosts(){
    this.service.getAllSave(this.tokenID).subscribe((res : any)=>{
      this.savedPostsList = res
      console.log('saved posts list====', res)
    })
  }

  getCommentsCount(){
    this.service.getAllCommentsCount().subscribe((data)=>{
      this.commentsCount = data
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


openCreate(){
  const dialogRef = this.dialog.open(PostComponent, {
    width: '600px',
    panelClass: 'custom-dialog-container' // Optional
  })

  dialogRef.afterClosed().subscribe((result)=>{
    if(result){
      this.service.create(result).subscribe({
        next: (res: any) => {
          this.snackBar.open(res.message, 'close', { duration : 3000 })
          this.getData();
        },
        error: (err) => this.snackBar.open(err.message, 'close', { duration : 3000 }),
      });
    }
  })
}


deletePost(id : any){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width : '500px',
    data : { message : 'Are you sure you want to delete this item?' }
  })

  dialogRef.afterClosed().subscribe((result)=>{
    if(result===true){
      this.service.delete(id).subscribe({
       next: (res) => {
        this.snackBar.open("Post Deleted Successfully!", 'close', { duration : 3000 })
        this.getData()
      },
       error: (err) => this.snackBar.open('Error in Deleting Student', 'close', { duration : 3000 }),
     });
    }
  })
}


editPost(post : any){
    const editDialogRef = this.dialog.open(EditPostComponent, {
      width : '600px',
      data : post
    })

    editDialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this.service.update(result).subscribe({
          next: (res: any) => {
          this.snackBar.open(res.message, 'close', { duration : 3000 })
          this.getData();
        },
        error: (err) => this.snackBar.open(err.message, 'close', { duration : 3000 }),

        })
      }
      
    })
  }



  // LIKE ---- UNLIKE ---- POST /////


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


// COMMENT ---- DELETE COMMENT ---- EDIT COMMENT

showCommentModal(post : any){
  console.log('comment will send post data====', post)
  const commentDialogRef = this.dialog.open(CommentPostComponent, {
    width : '900px',
    data : post
  })
}





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

  if(!target.closest('.dots-btn') && !target.closest('.dropdown-menu')){
    this.showMenu = {}
  }
}

}
