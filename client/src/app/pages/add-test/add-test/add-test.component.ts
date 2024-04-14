import {
  Component,
  OnInit,
  effect,
  inject,
  model,
  signal,
} from '@angular/core';

// import {
//   LabTestsComponent,
//   TestGroup,
//   Tests,
// } from '../lab-tests/lab-tests.component';

// import { PatientStoreService } from '../../services/patient.service';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
// import { LabTestService } from '../../services/lab-test.service';
import { Observable, tap } from 'rxjs';
import { KeyValuePipe } from '@angular/common';
import {
  LabTestsComponent,
  Tests,
} from '../../lab-tests/lab-tests/lab-tests.component';
import { PatientService } from '../../../services/patient/patient.service';
import { LabTestService } from '../../../services/lab-test/lab-test.service';

@Component({
  selector: 'app-add-test',
  standalone: true,
  imports: [
    LabTestsComponent,
    TableModule,
    FormsModule,
    MatGridListModule,
    KeyValuePipe,
  ],
  templateUrl: './add-test.component.html',
  styleUrl: './add-test.component.css',
})
export class AddTestComponent implements OnInit {
  updateResult(result: any, test: any) {
    this.tests.update((currentData) => {
      const group = currentData[test.group];
      let testToChange = group.find((item: any) => item.name == test.name);
      testToChange.results = result;
      //   ? !testToChange.selected
      //   : true;
      return currentData;
    });
  }
  private readonly patientService = inject(PatientService);
  private readonly labTestsService = inject(LabTestService);
  public tests = signal<Record<string, any>>(new Map());
  public testsToSubmit = signal<any[]>([]);
  public total = 0;

  selectedOption: any;

  ngOnInit(): void {
    let currentData = null;
    if (typeof localStorage !== 'undefined') {
      currentData = localStorage.getItem('tests');
    }
    if (currentData) {
      this.tests.set(JSON.parse(currentData));
    } else {
      this.labTestsService
        .GetAllTests()
        .pipe(
          tap((res: any) => {
            const groupedByGroupName = res.reduce((acc: any, item: any) => {
              const groupName = item.group.name;
              if (!acc[groupName]) {
                acc[groupName] = [];
              }
              acc[groupName].push({ ...item, group: item.group.name });
              return acc;
            }, {});
            this.tests.set(groupedByGroupName);
          })
        )
        .subscribe();
    }

    // .set([
    //   {
    //     name: 'Group1',
    //     tests: [
    //       {
    //         name: 'Test1',
    //         units: 'mlg',
    //         normalRange: '(10-20)',
    //         selected: true,
    //         price: 20,
    //       },
    //       {
    //         name: 'Test2',
    //         units: 'mlg',
    //         normalRange: '(10-20)',
    //         selected: false,
    //         price: 30,
    //       },
    //     ],
    //   },
    //   {
    //     name: 'Group2',
    //     tests: [
    //       {
    //         name: 'Test3',
    //         units: 'mlg',
    //         normalRange: '(10-20)',
    //         selected: false,
    //         price: 40,
    //       },
    //       {
    //         name: 'Test4',
    //         units: 'mlg',
    //         normalRange: '(10-20)',
    //         selected: false,
    //         price: 50,
    //       },
    //     ],
    //   },
    //   {
    //     name: 'Group3',
    //     tests: [
    //       {
    //         name: 'Test5',
    //         units: 'mlg',
    //         normalRange: '(10-20)',
    //         selected: false,
    //         price: 40,
    //       },
    //       {
    //         name: 'Test6',
    //         units: 'mlg',
    //         normalRange: '(10-20)',
    //         selected: false,
    //         price: 50,
    //       },
    //     ],
    //   },
    //   {
    //     name: 'Group4',
    //     tests: [
    //       {
    //         name: 'Test7',
    //         units: 'mlg',
    //         normalRange: '(10-20)',
    //         selected: false,
    //         price: 40,
    //       },
    //       {
    //         name: 'Test8',
    //         units: 'mlg',
    //         normalRange: '(10-20)',
    //         selected: false,
    //         price: 50,
    //       },
    //     ],
    //   },
    // ]);
    //}
  }

  constructor() {
    effect(
      () => {
        const currentData = this.tests();
        if (currentData) {
          localStorage.setItem('tests', JSON.stringify(currentData));
          let reqTests: Tests[] = [];
          this.total = 0;
          for (let group of Object.entries(currentData)) {
            group[1].forEach((test: any) => {
              if (test.selected) {
                reqTests.push(test);
                this.total += test.publicCost;
              }
            });
          }
          this.testsToSubmit.set(reqTests);
        } else {
          this.testsToSubmit.set([]);
        }
      },
      { allowSignalWrites: true }
    );
  }

  // getTotalQuantity() {
  //   return this.testsToSubmit.reduce(
  //     (sum: any, current: any) => sum + current.publicCost,
  //     0
  //   );
  // }

  getAllTests() {
    this.labTestsService.GetAllTests().subscribe((res: any) => {
      return res;
    });
  }

  // showChnages($event: any) {
  //   console.log('this.selectedOption---March-23');
  //   console.log(
  //     (this.selectedOption.filter(
  //       (item: any) => item?.children == undefined
  //     ).isselected = true)
  //   );
  //   console.log('this.selectedOption---March-24');
  //   //console.log($event[0]?.isselected);
  // }
  submit() {
    if (this.testsToSubmit().length) {
      this.patientService.updatePatientTests(
        this.testsToSubmit().map((test) => {
          return {
            group: test.group,
            name: test.name,
            units: test.units,
            normalRange: test.normalRange,
            results: test.results ?? '',
            price: test.publicCost,
          };
        })
      );
    }
  }
}
