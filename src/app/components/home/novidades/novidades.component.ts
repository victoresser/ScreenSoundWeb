import { Component, HostListener } from '@angular/core';
@Component({
	selector: 'app-novidades',
	templateUrl: './novidades.component.html',
	styleUrls: ['./novidades.component.scss'],
})
export class NovidadesComponent {
	offset = 0;
	maxOffset = 300;
	maxOffSetDesktop = 1000;
	constructor() {}

	@HostListener('window:scroll', ['$event'])
	onScroll(): void {
    this.offset = window.scrollY;
  }

	calculateBackgroundPositionY(offSet: number, maxOffSet: number): string {
		const adjustedOffset = Math.min(offSet, maxOffSet);
		return `${adjustedOffset * -0.7}px`;
	}
}
