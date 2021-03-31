import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  restItems: any;
  restItemsUrl = 'https://caronsale-backend-service-dev.herokuapp.com/api/v1/public/preview/auctions';
  limit: number = 8;// here set the limit to retrived data 


  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${this.restItemsUrl}?limit=${this.limit}`);
    
  }
  
}