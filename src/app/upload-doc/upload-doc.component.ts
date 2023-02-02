import { Subject } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ngbCompleteTransition } from '@ng-bootstrap/ng-bootstrap/util/transition/ngbTransition';
import { State } from '@popperjs/core';
import { AppComponent } from '../app.component';
import { City } from '../modules/city';
import { Country } from '../modules/country';
import { AddreService } from '../services/addre.service';
import { CrudOperationService } from '../services/crud-operation.service';
import { EmailpassService } from '../services/emailpass.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-upload-doc',
  templateUrl: './upload-doc.component.html',
  styleUrls: ['./upload-doc.component.css'],
})
export class UploadDocComponent implements OnInit{
  closeResult!: string;
  uploadForm!: FormGroup | any;
  dataSet :any={};
  listUsers: any;
  singleUser: any;
  imgPath: String='';
  currentTime!: Date;
  url:String='';

  // file: FileList | null | undefined;


  constructor(private modalService : NgbModal,
    private service: AddreService,
    private userServ: CrudOperationService,
    private fb: FormBuilder,
    private router: Router,
    private component: AppComponent,
    private emailServ: EmailpassService,
    private profile: ProfileComponent){

  }
  ngOnInit()
  {
    this.uploadForm = new FormGroup({
      image: new FormControl(null,[Validators.required]),
    });

  }

  FetchDetails(content: any)
  {
    this.userServ.getEmailUsers(content).subscribe((result: any)=>{
      this.singleUser = result.data;
      this.arrayFilling();
    });

  }
  arrayFilling()
  {
    console.log(this.singleUser[0]._id);
    this.dataSet['name'] = this.singleUser[0].username;
    this.dataSet['email'] = this.singleUser[0].email;
    this.dataSet['password'] = this.singleUser[0].password;
    this.dataSet['dob'] = this.singleUser[0].dob;
    this.dataSet['country'] = this.singleUser[0].country;
    this.dataSet['state'] = this.singleUser[0].state;
    this.dataSet['city'] = this.singleUser[0].city;
    this.currentTime = new Date();
    this.dataSet['storeTime'] = this.currentTime;
    this.dataSet['document'] = this.url;
  }

  onFileSelect(event:any)
  {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload =(e:any)=>{
        this.url = e.target.result;
      }
      this.FetchDetails(this.emailServ.getEmail());
    }
  }

  onUpload()
  {
    this.arrayFilling();
    this.userServ.addDocument(this.singleUser[0]._id, this.dataSet)
    .subscribe((data)=>{
      this.emailServ.setimgStatus(true);
      this.modalService.dismissAll();
      this.profile.ngOnInit();
    },(error)=>{
      console.log(error);
    });
    this.uploadForm.reset();
    this.url = '';
  }

  Startupload(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  //when close is clicked modal close
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
