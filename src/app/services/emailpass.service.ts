import { Injectable, Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class EmailpassService {

  passedEmail:String='';
  adminView:boolean=false;
  loginView:boolean=true;
  log:boolean = false;
  imgStatus: boolean=false;
  constructor() { }

  setlog(val:boolean)
  {
    this.log = val;
  }

  getlog()
  {
    return this.log;
  }
  setEmail(val: String)
  {
    this.passedEmail = val;
  }
  getEmail()
  {
    return this.passedEmail;
  }

  setadminView(val: boolean)
  {
    this.adminView = val;
  }

  getadminView()
  {
    return this.adminView;
  }

  setloginView(val:boolean)
  {
    this.loginView=val;
  }
  getloginView(){
    return this.loginView;
  }

  setimgStatus(val: boolean)
  {
    this.imgStatus = val;
  }

  getimgStatus()
  {
    return this.imgStatus;
  }
}
