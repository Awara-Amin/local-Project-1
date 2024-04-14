import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProduuctsComponent } from './category-produucts.component';

describe('CategoryProduuctsComponent', () => {
  let component: CategoryProduuctsComponent;
  let fixture: ComponentFixture<CategoryProduuctsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryProduuctsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryProduuctsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
