import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/postService/post.service';
import { AuthService } from 'src/app/core/services/authService/auth.service';
import { HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostComponent } from '../post/post.component';
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
  IsActions : boolean = false
  showMenu : boolean = false;
  token = localStorage.getItem('token')
  decipherData = this.authservice.decodeToken(this.token || '')
  tokenID = this.decipherData.id
  postLiked : boolean = false
  postSaved : boolean = false
  savedPostsList : any[] = []
  

  constructor( private service : PostService, private authservice : AuthService,
    private dialog : MatDialog, private snackBar : MatSnackBar
   ){}

  ngOnInit(): void {
    this.getData()
    this.getSavedPosts()


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
  console.log('you clicked opencraetepost===')
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
  console.log('clicked the edit----')
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width : '500px',
      data : { message : 'Are you sure you want to Update Student Record?' }
    })

    dialogRef.afterClosed().subscribe((result)=>{
      if(result===true){
      const editdialogRef = this.dialog.open(PostComponent, {
        width : '800px',
        data : post
      })

      editdialogRef.afterClosed().subscribe((result)=>{


      })
      }
    })
  }




  likePost(postId : any){

  }

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





}
