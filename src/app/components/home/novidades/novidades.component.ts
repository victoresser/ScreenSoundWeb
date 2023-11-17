import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
@Component({
  selector: 'app-novidades',
  templateUrl: './novidades.component.html',
  styleUrls: ['./novidades.component.css'],
})
export class NovidadesComponent implements OnInit {
  offset = 0;
  maxOffset = 400;
  constructor(private el: ElementRef) {}

  ngOnInit() {}


  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.offset = window.scrollY;
  }

  calculateBackgroundPositionY(): string {
    const adjustedOffset = Math.min(this.offset, this.maxOffset);
    return `${adjustedOffset * -0.7}px`;
  }
}
