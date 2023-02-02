import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudOperationService {

  baseUrl ='http://localhost:8000/Details';

  constructor(private http: HttpClient)
  {

  }
  getAllUsers()
  {
    return this.http.get(this.baseUrl+'/getAll');
  }

  getUsersAdd()
  {
    return this.http.get(this.baseUrl+'/add');
  }

  getSingleUsers(id:any)
  {
    return this.http.get(this.baseUrl+'/getSingle/'+id);
  }

  getEmailUsers(email:any)
  {
    return this.http.get(this.baseUrl+'/email/'+email);
  }

  updateUsers( _id:any,listUsers:any)
  {
    // console.log(this.baseUrl+'/update/'+_id);
    return this.http.patch(this.baseUrl+'/update/'+_id,listUsers);
  }

  removeUsers(_id:any){
    return this.http.delete(this.baseUrl+'/delete/'+_id);
  }

  registerUsers(listUsers:any)
  {
    return this.http.post(this.baseUrl+'/create',listUsers);
  }

  addDocument(id: any,content: any)
  {
    return this.http.patch(this.baseUrl+'/store/'+id,content);
  }
  // getDocument(email: any)
  // {
  //   return this.http.get(this.baseUrl+'/getDoc/'+email);
  // }
}
