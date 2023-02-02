import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Country } from '../modules/country';

@Injectable({
  providedIn: 'root'
})
export class AddreService {
  httpOptions ={
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'X-CSCAPI-KEY': 'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg=='
      // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJtdmdhZGFnaUBnbWFpbC5jb20ifSwiZXhwIjoxNTY2MjM0ODU0fQ.nMWPN38zptwwDKAo11bFyjhCRuzNhZc6NqqCaYJVxP0",
      // "Accept": "application/json"
    })
  };

  constructor(private http: HttpClient) { }

  getCountry(): Observable<Country[]>{
    return this.http.get<Country[]>('https://api.countrystatecity.in/v1/countries', {headers: this.httpOptions.headers})
    // return this.http.get<Country[]>('https://www.universal-tutorial.com/api/countries', {headers: this.httpOptions.headers})
  }

  getStateOfSelectedCountry(countryIso: any): Observable<any>{
    return this.http.get(`https://api.countrystatecity.in/v1/countries/${countryIso}/states`,{headers: this.httpOptions.headers} )
  }

  getCitiesOfSelectedState(countryIso: any, stateIso: any): Observable<any>{
    // console.log(countryIso, stateIso);
    return this.http.get(`https://api.countrystatecity.in/v1/countries/${countryIso}/states/${stateIso}/cities`, {headers: this.httpOptions.headers} )
  }


  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('Error occured', error.error.message);
    }else{
      console.error(`Backend returned code ${error.status}, ` + `body was : ${error.error}`);
    }

    return throwError('Something bad happened. Please try again later');
  }


}
