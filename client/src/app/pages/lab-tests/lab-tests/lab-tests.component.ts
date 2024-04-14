import { KeyValuePipe } from '@angular/common';
import { Component, ViewChild, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import test from 'node:test';

export interface Tests {
  name: string;
  units: string;
  result?: string;
  publicCost: number;
  normalRange: string;
  selected: boolean;
}
export interface TestGroup {
  group: string;
  tests: Tests[];
}

@Component({
  selector: 'app-lab-tests',
  standalone: true,
  imports: [MatExpansionModule, MatCheckboxModule, FormsModule, KeyValuePipe],
  templateUrl: './lab-tests.component.html',
  styleUrl: './lab-tests.component.css',
})
export class LabTestsComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  step: any;
  setStep(step: number) {
    this.step = step;
  }

  // labTestsList: any[] = [];
  public tests = model<Record<string, any>>(new Map());

  /**
   *
   */
  constructor() {}

  updateAllComplete(test: any, _t3: TestGroup) {
    this.tests.update((currentData) => {
      const group = currentData[test.group];
      const testToChange = group.find((item: any) => item.name == test.name);
      // testToChange.selected = testToChange.selected
      //   ? !testToChange.selected
      //   : true;
      return structuredClone(currentData);
    });
    // update test signal
    // this.tests.update((currentData) => {
    //   return currentData.map((item) => {
    //     if (item.group === _t3.group) {
    //       return {
    //         ...item,
    //         tests: item.tests.map((test) => {
    //           if (test.name === _t18.name) {
    //             return {
    //               ...test,
    //             };
    //           }
    //           return test;
    //         }),
    //       };
    //     }
    //     return item;
    //   });
    // });
  }
}
