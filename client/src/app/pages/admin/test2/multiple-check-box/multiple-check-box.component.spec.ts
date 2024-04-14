import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleCheckBoxComponent } from './multiple-check-box.component';

describe('MultipleCheckBoxComponent', () => {
  let component: MultipleCheckBoxComponent;
  let fixture: ComponentFixture<MultipleCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleCheckBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipleCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
