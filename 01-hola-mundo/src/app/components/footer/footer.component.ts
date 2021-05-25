import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: number;
  name: string;
  surname: string;
  
  constructor() { 
    this.year = new Date().getFullYear();
    this.name = 'Paco';
    this.surname = 'Rodriguez';
  }

  ngOnInit(): void {
  }

}
