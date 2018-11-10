import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/media.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  link: String;



  constructor(private mediaService: MediaService) {

  }

  sendToBack(){
    let media = { url: this.link } //JSON Object

    this.mediaService.addLinks(media).subscribe(data => { window.alert("Successfully added your link");  }, err => {window.alert(err);} );

  }

  ngOnInit() {
  }

}
