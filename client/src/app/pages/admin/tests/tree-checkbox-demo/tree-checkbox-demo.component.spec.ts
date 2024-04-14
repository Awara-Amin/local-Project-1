import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeCheckboxDemoComponent } from './tree-checkbox-demo.component';

describe('TreeCheckboxDemoComponent', () => {
  let component: TreeCheckboxDemoComponent;
  let fixture: ComponentFixture<TreeCheckboxDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeCheckboxDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreeCheckboxDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
