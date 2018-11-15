import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/media.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  link: String;
  helper: JwtHelperService = new JwtHelperService();
  decodedToken: String;
  expirationDate: String;
  isExpired: String;
  userId: String;

  constructor(private mediaService: MediaService) {
   const tokenKey = localStorage.getItem("jwtToken");
   const decodedToken = this.helper.decodeToken(tokenKey);
   this.userId = decodedToken._id;
   const expirationDate = this.helper.getTokenExpirationDate(tokenKey);
   const isExpired = this.helper.isTokenExpired(tokenKey);
   console.log("*****");
   console.log(decodedToken);
  }

  sendToBack(){
    let media = { url: this.link, userId: this.userId } //JSON Object

    this.mediaService.addLinks(media).subscribe(data => { window.alert("Successfully added your link");  }, err => {window.alert(err);} );

  }

  ngOnInit() {
  }

}
