import { AppComponent } from './../app.component';
import { Country } from './../modules/country';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { State } from '@popperjs/core';
import { City } from '../modules/city';
import { AddreService } from '../services/addre.service';

import { forbiddenDOBValidation } from '../shared/dob.validator';
import { CrudOperationService } from '../services/crud-operation.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit{

  @Input('id') id !: string;

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
  update :boolean = false;
  currentTime!: Date;

  constructor(private modalService : NgbModal,
    private fb: FormBuilder,
    private service: AddreService,
    private userServ: CrudOperationService,
    private component: AppComponent,
    private profile: ProfileComponent)
  {

  }
  ngOnInit()
  {
    this.signupForm = this.fb.group({
      username: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      dob:['',[Validators.required, forbiddenDOBValidation.bind(this)]],
      country:['',[Validators.required]],
      state: ['',[Validators.required]],
      city:['',[Validators.required]]

    });

  }

  //Fetching details
  renderData(){
    this.userServ.getAllUsers().subscribe((data: any) => {

      this.listUsers = data.data;
    });
  }

  //Fetching countries
  private fetchCountry() {
    this.service.getCountry().subscribe((data) => {
      this.listcountry = data;
    });
  }

  fillUpdateData(content: any)
  {
    //modal opening

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    //values setting
    this.userServ.getSingleUsers(this.id).subscribe((result: any)=>{
      this.singleUser = result.data;
      console.log(this.singleUser[0].name);

    //Filling name, email, dob
      // let date =  new Date(this.singleUser[0].dob)
      // let _date = date.getFullYear()+'-0'+date.getMonth()+'-'+date.getDate();
      // console.log(_date);
      this.signupForm.get('username').setValue(this.singleUser[0].name);
      this.signupForm.get('email').setValue(this.singleUser[0].email);
      this.signupForm.get('dob').setValue(this.singleUser[0].dob);

      //filling country
      this.fetchCountry();
      this.signupForm.get('country').setValue(this.singleUser[0].country);
      this.service.getStateOfSelectedCountry(this.singleUser[0].country)
      .subscribe((data) => {
        this.listState = data;
      });

      //filling state
      this.signupForm.get('state').setValue(this.singleUser[0].state);
      this.service.getCitiesOfSelectedState(this.singleUser[0].country, this.singleUser[0].state)
      .subscribe((data) => {
        this.listCity = data;
      });

      // //filling city
      this.signupForm.get('city').setValue(this.singleUser[0].city);
    });
  }

  UpdateRecord(){
    this.arrayFillingForUpdate();

    this.userServ.updateUsers(this.id,this.dataSet).subscribe((data)=>{
      alert('Updated Successfully');
      this.update = false;
      this.signupForm.reset();
      this.modalService.dismissAll();
      this.profile.ngOnInit();
    }, (error) =>{
      alert('Not able to Update...');

    });
  }
  arrayFillingForUpdate()
  {
    this.dataSet['id'] =  this.singleUser[0].id;
    this.dataSet['name'] = this.signupForm.get('username').value;
    this.dataSet['email'] = this.signupForm.get('email').value;
    this.dataSet['dob'] = this.signupForm.get('dob').value;
    this.dataSet['country'] = this.signupForm.get('country').value;
    this.dataSet['state'] = this.signupForm.get('state').value;
    this.dataSet['city'] = this.signupForm.get('city').value;
    this.currentTime = new Date();
    this.dataSet['storeTime'] = this.currentTime;
  }

  //when close is clicked modal close
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.renderData();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.renderData();
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
