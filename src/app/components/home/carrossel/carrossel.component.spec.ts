/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosselComponent } from './carrossel.component';

describe('CarrosselComponent', () => {
	let component: CarrosselComponent;
	let fixture: ComponentFixture<CarrosselComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CarrosselComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CarrosselComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
