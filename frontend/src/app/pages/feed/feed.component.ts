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
  

  constructor( private service : PostService, private authservice : AuthService,
    private dialog : MatDialog, private snackBar : MatSnackBar
   ){}

  ngOnInit(): void {
    this.getData()

  }

  // showmenu(id : any){
  //   const token = localStorage.getItem('token')
  //   const decipherData = this.authservice.decodeToken(token || '')
  //   const tokenID = decipherData.id

  //   if(id===tokenID){
  //     return true;
  //   }
  //   return false
  // }


  getData(){
    const token = localStorage.getItem('token')
    const decipherData = this.authservice.decodeToken(token || '')
    const tokenID = decipherData.id
    this.service.display().subscribe((data)=>{
      this.dataList = data
      console.log('data on feed==', data)
      this.dataList.find((el : any)=> {
        if(el.userID===tokenID){
          this.IsActions = true
          this.authorName = el.author
          return;
        }})
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

      //   if(result){
      //             this.service.update(result).subscribe({
      //   next: (res: any) => {
      //     this.snackBar.open(res.message, 'close', { duration : 3000 })
      //     this.getData();
      //   },
      //   error: (err) => this.snackBar.open(err.message, 'close', { duration : 3000 }),
      // });
      //   }


      })
      }
    })
  }





}
