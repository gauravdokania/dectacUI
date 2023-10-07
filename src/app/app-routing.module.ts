import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers';
// import { RegisterComponent } from './register/register.component';
import { FirstUserComponent } from './first-user/first-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VideoPopupComponent } from './video-popup/video-popup.component';
import { ProfileComponent } from './profile/profile.component';
import { VideoDashboardComponent } from './video-dashboard/video-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: 'login', component:  LoginComponent},
  { path: 'first-user', component:  FirstUserComponent},
  { path: 'forgotPassword', component:  ForgotPasswordComponent},
  { path: '', component:  DashboardComponent, canActivate: [AuthGuard]},
  { path: 'resetpassword', component: ResetPasswordComponent, canActivate: [AuthGuard] },  
  { path: 'video', component: VideoDashboardComponent, canActivate: [AuthGuard] },
  { path: 'video/:id', component: VideoPopupComponent, canActivate: [AuthGuard] },
  { path: 'getprofile', component: ProfileComponent, canActivate: [AuthGuard] },
   // otherwise redirect to home
  //  { path: '**', redirectTo: '' }
  { path: '**', component: NotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
