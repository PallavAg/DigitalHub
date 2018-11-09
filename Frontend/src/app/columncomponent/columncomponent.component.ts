import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-columncomponent',
  templateUrl: './columncomponent.component.html',
  styleUrls: ['./columncomponent.component.css']
})
export class ColumncomponentComponent implements OnInit {

  @Input() title:string;

  constructor() { }

  ngOnInit() {
  }

}
