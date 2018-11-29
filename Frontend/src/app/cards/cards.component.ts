import { Component, OnInit, Input, Output } from '@angular/core';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() item:any;

  constructor() { }

  ngOnInit() {
  }

}
