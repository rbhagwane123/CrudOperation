import { throwError } from 'rxjs';
import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from './modules/city';
import { Country } from './modules/country';
import { State } from './modules/state';
import { AddreService } from './services/addre.service';

import { DatePipe } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { outputAst } from '@angular/compiler';
import { CrudOperationService } from './services/crud-operation.service';
import { HttpFeatureKind } from '@angular/common/http';
import { EmailpassService } from './services/emailpass.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud-operation';

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
  search: string='';
  page: number=1;
  count:number = 5;
  loginView!:boolean;
  loginStatus: boolean = false;
  passedEmail: String='';
  adminView:boolean=false;
  log:boolean=false;

  constructor(
    private service: AddreService,
    private userServ: CrudOperationService,
    private router: Router,
    private modalService : NgbModal,
    private emailServ: EmailpassService)
    {

    }

  ngOnInit(){
    this.loginView = this.emailServ.getloginView();
    this.adminView = this.emailServ.getadminView();
    this.log = this.emailServ.getlog();
    this.renderData();
  }
  //Fetching details
  renderData(){
    this.userServ.getUsersAdd().subscribe((data:any)=>{
      this.listUsers = data.data;
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

  logOut()
  {
    this.emailServ.setadminView(false);
    this.loginStatus = false;
    this.emailServ.setlog(false);
    this.emailServ.setEmail('');
    this.emailServ.setloginView(true);
    this.singleUser='';
    this.ngOnInit();
  }
  fillData(content:any)
  {
    this.userServ.getSingleUsers(content).subscribe((result: any)=>{
      this.singleUser = result.data;
      console.log(this.singleUser[0].name);

      //modal opening
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    });
  }

  remove(person: any) {
    this.userServ.removeUsers(person._id).subscribe((data) => {
      this.listUsers = this.listUsers.filter((u: any) => u !== person);
    });
  }

  Search(){
    if(this.search == ''){
      this.ngOnInit();
    }else{
      this.listUsers = this.listUsers.filter((res: { name: string; })=>{
        // console.log(res.name.toLocaleLowerCase().match(this.search.toLocaleLowerCase()));
        return res.name.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
      });
    }
  }

  reverse: boolean = false;
  sort(){
      if(this.reverse){
        let newarr = this.listUsers.sort((a: { _id: any },b: { _id: any })=> a._id - b._id);
        this.listUsers = newarr;
      }else{
        let newarr = this.listUsers.sort((a: { _id: any },b: { _id: any })=> b._id - a._id);
        this.listUsers = newarr;
      }
      this.reverse= !this.reverse;
  }

  login()
  {
    this.router.navigate(['/login']);
  }

}
