import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirModalComponent } from './excluir-modal.component';

describe('ExcluirModalComponent', () => {
  let component: ExcluirModalComponent;
  let fixture: ComponentFixture<ExcluirModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcluirModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcluirModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
