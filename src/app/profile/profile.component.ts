import { Profile } from './../modules/Profile';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { CrudOperationService } from '../services/crud-operation.service';
import { EmailpassService } from '../services/emailpass.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  prfileSet :any={};
  listUsers: any;
  singleUser: any;
  imgStatus:boolean=false;

  ngOnInit()
  {
    // this.profileServ.getProfiles();
    // this.profileSubscription = this.profileServ.
    // getProfilesStream()
    // .subscribe((profile: Profile[]) =>{
    //   this.profiles = profile;
    // })
    this.FetchDetails(this.emailServ.getEmail());
    this.imgStatus = this.emailServ.getimgStatus();

  }


  constructor(private router: Router,
    private modalService : NgbModal,
    private userServ: CrudOperationService,
    private fb: FormBuilder,
    private component: AppComponent,
    private emailServ: EmailpassService,
    private _location: Location)
  {

  }

  // ngOnDestroy()
  // {
  //   this.profileSubscription.unsubscribe();
  // }

  FetchDetails(content: any)
  {
    this.userServ.getEmailUsers(content).subscribe((result: any)=>{
      this.singleUser = result.data;
      if(this.singleUser[0].document == 'empty')
      {
        this.imgStatus = false;

      }
      else{
        this.emailServ.setimgStatus(true);
      }
    });
  }

}
