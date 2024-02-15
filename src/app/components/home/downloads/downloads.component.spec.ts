/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadsComponent } from './downloads.component';

describe('DownloadsComponent', () => {
	let component: DownloadsComponent;
	let fixture: ComponentFixture<DownloadsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [DownloadsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DownloadsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
