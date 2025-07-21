import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommentPostComponent } from './dialogs/comment-post/comment-post.component';
import { EditCommentDialogComponent } from './dialogs/edit-comment-dialog/edit-comment-dialog.component';




@NgModule({
  declarations: [HeaderComponent, ConfirmDialogComponent, CommentPostComponent, EditCommentDialogComponent],
  imports: [
    CommonModule, AppRoutingModule, MatButtonModule, MatInputModule, MatOptionModule, MatSelectModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatDialogModule
  ],
  exports : [HeaderComponent]
})
export class SharedModule { }
