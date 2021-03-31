import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { sha512 } from 'js-sha512';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private http: HttpClient) { }
  
  hashPasswordWithCycles(plainTextpassword:string,cycles:number):string{
    let hash=`${plainTextpassword}`;
    for (let i= 0; i < cycles;i++){
       hash = sha512(hash);
    }
    return hash
  }
  
  
  login(email: string, plainTextpassword: string) {
    let password = `${this.hashPasswordWithCycles(plainTextpassword, 5)}`;
    let _url = 'https://caronsale-backend-service-dev.herokuapp.com/api/v1';
    return this.http.put<any>(`${_url}/authentication/${email}`, { password})
    .pipe(map(user => {
      // login successful if there's a jwt token in the response
      if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
  
        }

      return user;
      }));
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
}
}
