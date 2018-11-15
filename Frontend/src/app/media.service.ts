import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class MediaService {



  constructor(private http: Http) {

   }

   public jwt() {
       // create authorization header with jwt token
       //let currentUser = JSON.parse(localStorage.getItem('currentUser'));
       let token = localStorage.getItem('jwtToken');
       if (token) {
       	let headers = new Headers({ 'Authorization': token });
       	return new RequestOptions({ headers: headers });
       }
     }

   addLinks(link: any){
    return this.http.post('http://localhost:3000/api/media', link, this.jwt()).map((response: Response) => response.json());
  }

  getLinks(){
    return this.http.get('http://localhost:3000/api/media', this.jwt()).map((response: Response) => response.json());
  }

}
