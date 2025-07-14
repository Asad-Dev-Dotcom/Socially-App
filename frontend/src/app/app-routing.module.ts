import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FeedComponent } from './pages/feed/feed.component';
import { PostComponent } from './pages/post/post.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { authDeGuard, authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path : '', component : LoginComponent, canActivate : [authDeGuard] },
  { path: 'signup', component : SignupComponent, canActivate : [authDeGuard] },
  { path: 'feed', component: FeedComponent, canActivate : [authGuard] },
  { path : 'post', component : PostComponent, canActivate : [authGuard] },
  { path : 'profile', component : ProfileComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
