import { Component, OnInit, Input, Output } from '@angular/core';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-columncomponent',
  templateUrl: './columncomponent.component.html',
  styleUrls: ['./columncomponent.component.css']
})
export class ColumncomponentComponent implements OnInit {

  @Input() title:string;
  items: any[] = [];
  

  constructor(private mediaService: MediaService)  { }

  ngOnInit() {
    this.mediaService.getLinks().subscribe(data => { 
      this.items = data; 
      console.log(data) 
    }, err => {window.alert(err);} );
  }

}
