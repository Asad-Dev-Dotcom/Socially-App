import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/postService/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  user : any;
  postText: string = '';
  filePreview: (string | ArrayBuffer | null)[] = [];
  currentPreviewIndex: number = 0;

  selectedFiles: File[]  = [];


  constructor( private service : PostService, private authService : AuthService, private snackBar : MatSnackBar, private router : Router, public dialogRef: MatDialogRef<PostComponent> ){}

  ngOnInit(): void {
      const token = localStorage.getItem('token');
      if (token) {
        const data = this.authService.decodeToken(token)
        this.user = data
      }
  }

  onfileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i< input.files.length; i++) {
      const file = input.files[i];

        this.selectedFiles.push(file)

        const reader = new FileReader()
        reader.onload = () => {
          this.filePreview.push(reader.result)
        }
        reader.readAsDataURL(file)
    }
  }
  }

  submitPost() {
   const formData = new FormData();

  formData.append('text', this.postText);
  formData.append('author', this.user.name);

  this.selectedFiles.forEach((file)=>{
    formData.append('media', file)
  })



  this.dialogRef.close(formData)


    // this.service.create(formData).subscribe({
    //   next : (res) => {
    //     this.snackBar.open('Post Uploaded', 'Close', { duration : 3000 } )
    //     this.router.navigate(['/feed'])
    //   },
    //   error : (err) => {
    //     this.snackBar.open('Post Upload Failled', 'Close', { duration : 3000 } )
    //   }

    // })
    
    this.postText = '';
    this.selectedFiles = [];
    this.filePreview = [];
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer?.files?.length) {
      const droppedFile = event.dataTransfer.files[0];
        this.selectedFiles.push(droppedFile)
        const reader = new FileReader();
        reader.onload = () => {
          this.filePreview.push(reader.result)
        };
        reader.readAsDataURL(droppedFile);
  }
  }

  removeFile(index : number){
    this.filePreview.splice(index, 1)
    this.selectedFiles.splice(index, 1)
  }

  nextPreview() {
  if (this.currentPreviewIndex < this.filePreview.length - 1) {
    this.currentPreviewIndex++;
  }
}

prevPreview() {
  if (this.currentPreviewIndex > 0) {
    this.currentPreviewIndex--;
  }
}

goToPreview(index: number) {
  this.currentPreviewIndex = index;
}

isImage(preview: string | ArrayBuffer | null): boolean {
  return typeof preview === 'string' && preview.startsWith('data:image/');
}

isVideo(preview: string | ArrayBuffer | null): boolean {
  return typeof preview === 'string' && preview.startsWith('data:video/');
}

}
