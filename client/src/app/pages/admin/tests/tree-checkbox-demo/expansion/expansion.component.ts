import { Component, computed, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';

export interface Tests {
  name: string;
  selected: boolean;
  price: number;
  result?: string;
}
export interface TestGroup {
  name: string;
  tests: Tests[];
}
@Component({
  selector: 'app-expansion',
  standalone: true,
  imports: [MatExpansionModule, MatCheckboxModule, FormsModule],
  templateUrl: './expansion.component.html',
  styleUrl: './expansion.component.css',
})
export class ExpansionComponent {
  step: any;
  setStep(step: number) {
    this.step = step;
  }
  public tests = model<TestGroup[]>([]);

  /**
   *
   */
  constructor() {}
  updateAllComplete(_t18: Tests, _t3: TestGroup) {
    console.log('_t18');
    console.log(_t18);
    console.log(' _t3');
    console.log(_t3);
    // update test signal
    this.tests.update((currentData) => {
      return currentData.map((group) => {
        if (group.name === _t3.name) {
          return {
            ...group,
            tests: group.tests.map((test) => {
              if (test.name === _t18.name) {
                return {
                  ...test,
                };
              }
              return test;
            }),
          };
        }
        return group;
      });
    });
  }
}
