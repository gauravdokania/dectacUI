import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
// import { JwtInterceptor, ErrorInterceptor } from '../app/_helpers';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';

// user created
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
// import { fakeBackendProvider } from '../app/_helpers';
// import { RegisterComponent } from './register/register.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FirstUserComponent } from './first-user/first-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RightNavbarComponent } from './right-navbar/right-navbar.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VideoThumbnailComponent } from './video-thumbnail/video-thumbnail.component';
import { VideoPopupComponent } from './video-popup/video-popup.component';
import { ProfileComponent } from './profile/profile.component';
import { VideoDashboardComponent } from './video-dashboard/video-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DateFormatPipe } from './date-format.pipe';
import { NewUserRegistrationComponent } from './new-user-registration/new-user-registration.component';
import { TermandconditionsComponent } from './termandconditions/termandconditions.component';
import { SignaturePadCustomComponent } from './signature-pad-custom/signature-pad-custom.component';



@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ChartModule,
    TableModule,
    BreadcrumbModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatMomentDateModule, MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule, 
    AngularSignaturePadModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    // RegisterComponent,
    ModalComponent,
    FirstUserComponent,
    ForgotPasswordComponent,
    RightNavbarComponent,
    ResetPasswordComponent,
    VideoThumbnailComponent,
    VideoPopupComponent,
    ProfileComponent,
    VideoDashboardComponent,
    NotFoundComponent,
    BreadcrumbComponent,
    DateFormatPipe,
    NewUserRegistrationComponent,
    TermandconditionsComponent,
    SignaturePadCustomComponent
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    MdbModalService,
    // provider used to create fake backend
    // fakeBackendProvider,
    MatNativeDateModule, MatMomentDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
