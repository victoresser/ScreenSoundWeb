import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
@Component({
  selector: 'app-novidades',
  templateUrl: './novidades.component.html',
  styleUrls: ['./novidades.component.css'],
})
export class NovidadesComponent implements OnInit {
  offset: number = 0;
  limit: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.limit = this.el.nativeElement.offsetHeight - window.innerHeight;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    this.offset = window.scrollY;

    // if (this.offset > this.limit) {
    //   this.offset = this.limit;
    // }
  }
}
