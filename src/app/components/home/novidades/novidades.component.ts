import { Component, HostListener, OnInit } from '@angular/core';
@Component({
  selector: 'app-novidades',
  templateUrl: './novidades.component.html',
  styleUrls: ['./novidades.component.css'],
})
export class NovidadesComponent implements OnInit {
  offset: number = 0;

  constructor() {}

  ngOnInit() {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    this.offset = window.scrollY;
  }
}
