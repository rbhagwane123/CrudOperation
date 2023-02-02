import { ProfileComponent } from './../profile/profile.component';
import { AppComponent } from './../app.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudOperationService } from '../services/crud-operation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailpassService } from '../services/emailpass.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup | any;
  InputemaiL: String = '';
  Inputpassword: String = '';
  singleUser: any;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private userServ: CrudOperationService,
    private fb: FormBuilder,
    private component: AppComponent,
    private emailServ: EmailpassService
  ) {}
  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  checkLogin() {
    this.InputemaiL = this.signupForm.get('email').value;
    this.Inputpassword = this.signupForm.get('password').value;
    if (this.InputemaiL == 'admin@gmail.com' && this.Inputpassword == 'admin')
    {

      this.component.loginStatus = true;
      this.emailServ.setlog(true);
      this.emailServ.setloginView(false);
      this.emailServ.setadminView(true);
      this.component.ngOnInit();
    }
    else
    {
      this.userServ.getEmailUsers(this.InputemaiL).subscribe((result: any) => {
        this.singleUser = result.data;
        if (result.data == '') {
          this.component.loginStatus = false;
          alert(`username doesn't exist`);
        } else if (this.Inputpassword == this.singleUser[0].password) {
          this.router.navigate(['/profile']);
          this.emailServ.setlog(true);
          this.emailServ.setEmail(this.InputemaiL);
          this.emailServ.setloginView(false);
          this.component.loginStatus = true;
          this.component.ngOnInit();

        } else if (
          this.Inputpassword != this.singleUser[0].password &&
          this.Inputpassword != 'admin'
        ) {
          alert('Invalid password');
          this.component.loginStatus = false;
        } else if (result.data != '' && this.Inputpassword == 'admin') {
          this.router.navigate(['/profile']);
          this.emailServ.setlog(true);
          this.emailServ.setEmail(this.InputemaiL);
          this.emailServ.setloginView(false);
          this.component.loginStatus = true;
          this.component.ngOnInit();

        }
      });
    }

  }
}
