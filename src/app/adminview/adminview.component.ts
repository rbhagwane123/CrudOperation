import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddreService } from '../services/addre.service';
import { CrudOperationService } from '../services/crud-operation.service';
import { EmailpassService } from '../services/emailpass.service';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css'],
})
export class AdminviewComponent implements OnInit {
  adminView: boolean = false;
  dataSet: any = {};
  listUsers: any;
  singleUser: any;
  search: string = '';
  page: number = 1;
  count: number = 5;
  // i:number=0;

  constructor(private service: AddreService,
    private userServ: CrudOperationService,
    private router: Router,
    private modalService : NgbModal,
    private emailServ: EmailpassService) {}

  ngOnInit() {
    this.renderData();
  }

  //Fetching details
  renderData(){
    this.userServ.getUsersAdd().subscribe((data:any)=>{
      this.listUsers = data.data;
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

  reverse: boolean = true;
  sort()
  {
    if(this.reverse)
    {
      this.listUsers.sort((a:any ,b:any)=> (a._id < b._id ? -1:1));

    }else
    {
      this.listUsers.sort((a:any,b:any)=> (a._id > b._id ? -1:1));
    }
    this.reverse= !this.reverse;
  }
}
