import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  
  imageTitle:string="Products Logo";
  imageW:number=750;
  imageMrgn:number=10;
  imageHeight=300;
  constructor() { }

  ngOnInit() {
  }

}
