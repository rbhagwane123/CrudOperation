import { AppComponent } from './../app.component';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { State } from '@popperjs/core';
import { City } from '../modules/city';
import { Country } from '../modules/country';
import { AddreService } from '../services/addre.service';

import { forbiddenDOBValidation } from '../shared/dob.validator';
import { CrudOperationService } from '../services/crud-operation.service';
@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css']
})
export class AddDetailsComponent implements OnInit{

  closeResult!: string;
  signupForm!: FormGroup | any;
  listcountry!: Country[];
  countrySelected!: any;
  listState!: State[];
  selectedState!: any;
  listCity!: City[];
  dataSet :any={};
  listUsers: any;
  singleUser: any;
  update: boolean = false;
  currentTime!: Date;

  constructor(private modalService : NgbModal,
    private service: AddreService,
    private userServ: CrudOperationService,
    private fb: FormBuilder,
    private router: Router,
    private component: AppComponent){

  }
  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
      dob:['',[Validators.required, forbiddenDOBValidation.bind(this)]],
      country:['',[Validators.required]],
      state: ['',[Validators.required]],
      city:['',[Validators.required]]

    });
    this.fetchCountry();
  }

//Fetching details
  renderData(){
    this.userServ.getUsersAdd().subscribe((data:any)=>{
      this.listUsers = data.data;
    });
  }

  onSubmit() {
    this.arrayFilling();
    this.userServ.registerUsers(this.dataSet).subscribe(
      (data) => {
        alert('Inserted Successfully!');
        this.modalService.dismissAll();
        this.component.ngOnInit();
      },
      (error) => {
        alert('Not Inserted')

      }
    );
    this.signupForm.reset();
    this.renderData();
    }

  //Fetching countries
  private fetchCountry() {
    this.service.getCountry().subscribe((data) => {
      this.listcountry = data;
    });
  }

  //After selecting over country dropdown
  onCountrySelected() {
    this.countrySelected = this.signupForm.get('country').value;
    // console.log(this.countrySelected);
    this.service
      .getStateOfSelectedCountry(this.countrySelected)
      .subscribe((data) => {
        this.listState = data;
      });
  }
  //After selecting over state dropdown
  onStateSelected() {
    this.countrySelected = this.signupForm.get('country').value;
    this.selectedState = this.signupForm.get('state').value;
    this.service
      .getCitiesOfSelectedState(this.countrySelected, this.selectedState)
      .subscribe((data) => {
        this.listCity = data;

      });
  }

  arrayFilling()
  {
    this.dataSet['name'] = this.signupForm.get('username').value;
    this.dataSet['email'] = this.signupForm.get('email').value;
    this.dataSet['password'] = this.signupForm.get('password').value;
    this.dataSet['dob'] = this.signupForm.get('dob').value;
    this.dataSet['country'] = this.signupForm.get('country').value;
    this.dataSet['state'] = this.signupForm.get('state').value;
    this.dataSet['city'] = this.signupForm.get('city').value;
    this.currentTime = new Date();
    this.dataSet['storeTime'] = this.currentTime;
    this.dataSet['document'] = 'empty';

  }

  //when Add Button clicked modal open
  addDetails(content: any){
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
    }
    else {
      return `with: ${reason}`;
    }
  }

}
