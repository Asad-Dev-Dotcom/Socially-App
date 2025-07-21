import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/postService/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Data, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  user = '';
  photo = '';
  postText: string = '';
  filePreview: (string | ArrayBuffer | null)[] = [];
  currentPreviewIndex: number = 0;

  selectedFiles: File[] = [];
  existingMedia: any[] = [];

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.user = this.data.author;
    this.postText = this.data.text;
    this.data.media.forEach((el: any) => {
      if (el.path) {
        const normalizedPath = el.path.replace(/\\/g, '/');
        const fullUrl = `http://localhost:3000/${normalizedPath}`;
        this.filePreview.push(fullUrl);
      }
    });

    this.existingMedia = [...this.data.media];

  }

  onfileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];

        this.selectedFiles.push(file);

        const reader = new FileReader();
        reader.onload = () => {
          this.filePreview.push(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  submitPost() {
    if (this.postText.length == 0 && this.selectedFiles.length == 0) {
      this.snackBar.open('Enter Post Text or Media', 'Close', {
        duration: 3000,
      });
      return;
    }

    const formData = new FormData();

    formData.append('text', this.postText);
    formData.append('author', this.user);
    formData.append('postId', this.data._id);

    formData.append('existingMedia', JSON.stringify(this.existingMedia)); // send as stringified array

    this.selectedFiles.forEach((file) => {
      formData.append('newMedia', file);
    });


    this.dialogRef.close(formData);

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
      this.selectedFiles.push(droppedFile);
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview.push(reader.result);
      };
      reader.readAsDataURL(droppedFile);
    }
  }

  removeFile(index: number) {
    const removed = this.filePreview[index];

    if (typeof removed === 'string' && removed.startsWith('http')) {
      // It's from existingMedia — find by normalized path
      const removedMedia = this.existingMedia.find(
        (m) => `http://localhost:3000/${m.path.replace(/\\/g, '/')}` === removed
      );
      this.existingMedia = this.existingMedia.filter((m) => m !== removedMedia);
    } else {
      // It's a new file
      const fileIndex = index - this.existingMedia.length;
      if (fileIndex >= 0) {
        this.selectedFiles.splice(fileIndex, 1);
      }
    }

    this.filePreview.splice(index, 1);
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
    return (
      typeof preview === 'string' &&
      (preview.startsWith('data:image/') ||
        preview.endsWith('.jpg') ||
        preview.endsWith('.jpeg') ||
        preview.endsWith('.png') ||
        preview.endsWith('.gif'))
    );
  }

  isVideo(preview: string | ArrayBuffer | null): boolean {
    return (
      typeof preview === 'string' &&
      (preview.startsWith('data:video/') ||
        preview.endsWith('.mp4') ||
        preview.endsWith('.mov') ||
        preview.endsWith('.webm') ||
        preview.endsWith('.avi'))
    );
  }
}
