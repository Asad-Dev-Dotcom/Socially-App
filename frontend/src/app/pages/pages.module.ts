import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from '../app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditPostComponent } from './post/edit-post/edit-post.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FeedComponent, PostComponent, ProfileComponent, PageNotFoundComponent, EditPostComponent],
  imports: [
    CommonModule, SharedModule, FormsModule, HttpClientModule, MatSnackBarModule,
    AppRoutingModule, ReactiveFormsModule
  ]
})
export class PagesModule { }
