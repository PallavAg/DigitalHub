import { Component, OnInit, Input, Output } from '@angular/core';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-columncomponent',
  templateUrl: './columncomponent.component.html',
  styleUrls: ['./columncomponent.component.css']
})
export class ColumncomponentComponent implements OnInit {

  @Input() title: string;
  items: any[] = [];
  @Input() parentSubject: any;


  constructor(private mediaService: MediaService) { }

  ngOnInit() {
    this.loadData();
    this.parentSubject.subscribe(event => {
      this.loadData();
    })
  }

  loadData() {
    this.mediaService.getLinks().subscribe(data => {
      this.items = data;
      console.log(data);
      let title = this.title;
      this.items = this.items.filter(function (item) { return item.mediaType == title })
    }, err => { window.alert(err); });
  }



}
