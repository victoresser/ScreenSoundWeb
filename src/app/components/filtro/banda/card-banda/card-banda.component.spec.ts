import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBandaComponent } from './card-banda.component';

describe('CardBandaComponent', () => {
  let component: CardBandaComponent;
  let fixture: ComponentFixture<CardBandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBandaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardBandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
