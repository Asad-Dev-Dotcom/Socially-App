import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-comment-dialog',
  templateUrl: './edit-comment-dialog.component.html',
  styleUrls: ['./edit-comment-dialog.component.css']
})
export class EditCommentDialogComponent {

updatedText: string;

  constructor(
    public dialogRef: MatDialogRef<EditCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string },
    private snackBar : MatSnackBar
  ) {
    this.updatedText = data.text;
  }

  submit() {
    if(this.updatedText.length === 0){
      this.snackBar.open('Comment is required', 'Close', { duration : 3000 })
      return;
    }
    this.dialogRef.close(this.updatedText);
  }

  close() {
    this.dialogRef.close();
  }
}

