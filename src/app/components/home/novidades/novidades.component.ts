import { Component, HostListener } from '@angular/core';
@Component({
	selector: 'app-novidades',
	templateUrl: './novidades.component.html',
	styleUrls: ['./novidades.component.css'],
})
export class NovidadesComponent {
	offset = 0;
	maxOffset = 400;
	constructor() {}

	@HostListener('window:scroll', ['$event'])
	onScroll(): void {
    this.offset = window.scrollY;
  }

	calculateBackgroundPositionY(): string {
		const adjustedOffset = Math.min(this.offset, this.maxOffset);
		return `${adjustedOffset * -0.7}px`;
	}
}
