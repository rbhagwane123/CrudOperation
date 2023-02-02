import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddDetailsComponent } from './add-details/add-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { UploadDocComponent } from './upload-doc/upload-doc.component';


export const routes: Routes=[
  { path:'', component: AppComponent, pathMatch: 'full' },
  { path:'home', component: AppComponent, pathMatch: 'full' },
  { path:'profile', component: ProfileComponent, pathMatch: 'full' },
  { path:'login', component: LoginComponent, pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    AddDetailsComponent,
    UpdateDetailsComponent,
    LoginComponent,
    ProfileComponent,
    AdminviewComponent,
    UploadDocComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
