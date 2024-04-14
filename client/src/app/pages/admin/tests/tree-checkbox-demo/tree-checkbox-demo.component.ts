import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
// import { CommonModule } from '@angular/common';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { NodeService } from '../../../../services/test/node.service';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { MatButtonModule } from '@angular/material/button';
import { TreeFlatOverviewExample } from './angular-tree/angular-tree.component';
import {
  ExpansionComponent,
  TestGroup,
  Tests,
} from './expansion/expansion.component';
import { PatientService } from '../../../../services/patient/patient.service';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Mahdi wanted to add an interface here with export then replace it with TreeNode, nawe la na MyData
export interface MyData<T = any> {
  /**
   * Label of the node.
   */
  label?: string;
  /**
   * Data represented by the node.
   */
  data?: T;
  /**
   * Icon of the node to display next to content.
   */
  icon?: string;
  /**
   * Icon to use in expanded state.
   */
  expandedIcon?: string;
  /**
   * Icon to use in collapsed state.
   */
  collapsedIcon?: string;
  /**
   * An array of treenodes as children.
   */
  children?: MyData<T>[];
  /**
   * Specifies if the node has children. Used in lazy loading.
   * @defaultValue false
   */
  leaf?: boolean;
  /**
   * Expanded state of the node.
   * @defaultValue false
   */
  expanded?: boolean;
  /**
   * Type of the node to match a template.
   */
  type?: string;
  /**
   * Parent of the node.
   */
  parent?: TreeNode<T>;
  /**
   * Defines if value is partially selected.
   */
  partialSelected?: boolean;
  /**
   * Inline style of the node.
   */
  style?: any;
  /**
   * Style class of the node.
   */
  styleClass?: string;
  /**
   * Defines if the node is draggable.
   */
  draggable?: boolean;
  /**
   * Defines if the node is droppable.
   */
  droppable?: boolean;
  /**
   * Whether the node is selectable when selection mode is enabled.
   * @defaultValue false
   */
  selectable?: boolean;
  /**
   * Mandatory unique key of the node.
   */
  key?: string;
  isselected?: boolean;
}

@Component({
  selector: 'app-tree-checkbox-demo',
  standalone: true,
  imports: [
    TreeModule,
    TreeSelectModule,
    FormsModule,
    MatButtonModule,
    TreeFlatOverviewExample,
    ExpansionComponent,
    // BrowserAnimationsModule,
    // CommonModule,
  ],
  templateUrl: './tree-checkbox-demo.component.html',
  styleUrl: './tree-checkbox-demo.component.css',
})
export class TreeCheckboxDemoComponent implements OnInit {
  private readonly patientService = inject(PatientService);

  public tests = signal<TestGroup[]>([]);

  public testsToSubmit = signal<Tests[]>([]);
  testList!: any[];
  // files!: TreeNode[];
  // treeOptions: MyData<any>[] = [
  // treeOptions: MyData<any>[] = [
  //   {
  //     key: '0',
  //     label: 'Tests',
  //     data: 'Documents Folder',
  //     icon: 'pi pi-fw pi-inbox',
  //     // price:30,
  //     children: [
  //       {
  //         key: '0-0',
  //         label: 'X-Ray',
  //         data: 'Work Folder',
  //         icon: 'pi pi-fw pi-cog',
  //         isselected: false,
  //         leaf: false,
  //       },
  //       {
  //         key: '0-1',
  //         label: 'Home',
  //         data: 'Home Folder',
  //         icon: 'pi pi-fw pi-home',
  //         isselected: false,
  //       },
  //     ],
  //   },
  //   {
  //     key: '1',
  //     label: 'Events',
  //     data: 'Events Folder',
  //     icon: 'pi pi-fw pi-calendar',
  //     children: [
  //       {
  //         key: '1-0',
  //         label: 'Meeting',
  //         icon: 'pi pi-fw pi-calendar-plus',
  //         data: 'Meeting',
  //       },
  //       {
  //         key: '1-1',
  //         label: 'Product Launch',
  //         icon: 'pi pi-fw pi-calendar-plus',
  //         data: 'Product Launch',
  //       },
  //       {
  //         key: '1-2',
  //         label: 'Report Review',
  //         icon: 'pi pi-fw pi-calendar-plus',
  //         data: 'Report Review',
  //       },
  //     ],
  //   },
  //   {
  //     key: '2',
  //     label: 'Movies',
  //     data: 'Movies Folder',
  //     icon: 'pi pi-fw pi-star-fill',
  //     children: [
  //       {
  //         key: '2-0',
  //         icon: 'pi pi-fw pi-star-fill',
  //         label: 'Al Pacino',
  //         data: 'Pacino Movies',
  //         children: [
  //           {
  //             key: '2-0-0',
  //             label: 'Scarface',
  //             icon: 'pi pi-fw pi-video',
  //             data: 'Scarface Movie',
  //           },
  //           {
  //             key: '2-0-1',
  //             label: 'Serpico',
  //             icon: 'pi pi-fw pi-video',
  //             data: 'Serpico Movie',
  //           },
  //         ],
  //       },
  //       {
  //         key: '2-1',
  //         label: 'Robert De Niro',
  //         icon: 'pi pi-fw pi-star-fill',
  //         data: 'De Niro Movies',
  //         children: [
  //           {
  //             key: '2-1-0',
  //             label: 'Goodfellas',
  //             icon: 'pi pi-fw pi-video',
  //             data: 'Goodfellas Movie',
  //           },
  //           {
  //             key: '2-1-1',
  //             label: 'Untouchables',
  //             icon: 'pi pi-fw pi-video',
  //             data: 'Untouchables Movie',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  // selectedFiles!: TreeNode[];
  selectedOption: any;
  // selectedOption2: any;
  // constructor(private nodeService: NodeService) {}
  ngOnInit() {
    let currentData = null;
    if (typeof localStorage !== 'undefined') {
      currentData = localStorage.getItem('tests');
    }
    if (currentData) {
      this.tests.set(JSON.parse(currentData));
    } else {
      this.tests.set([
        {
          name: 'Group1',
          tests: [
            {
              name: 'Test1',
              selected: true,
              price: 20,
            },
            {
              name: 'Test2',
              selected: false,
              price: 30,
            },
          ],
        },
        {
          name: 'Group2',
          tests: [
            {
              name: 'Test3',
              selected: false,
              price: 40,
            },
            {
              name: 'Test4',
              selected: false,
              price: 50,
            },
          ],
        },
      ]);
    }
  }
  constructor() {
    effect(
      () => {
        const currentData = this.tests();
        console.log('tcurrentData ');
        console.log(currentData);
        if (currentData) {
          localStorage.setItem('tests', JSON.stringify(currentData));
          let testsRequired: Tests[] = [];
          currentData.forEach((group) => {
            group.tests.forEach((test) => {
              if (test.selected) {
                testsRequired.push(test);
              }
            });
          });
          console.log('testsRequired');
          this.testsToSubmit.set(testsRequired);
          console.log('testsRequired');
          console.log(testsRequired);
          console.log;
        } else {
          this.testsToSubmit.set([]);
        }
      },
      { allowSignalWrites: true }
    );
  }

  // show() {
  //   console.log('this.selectedOption');
  //   console.log('this.selectedOption');
  // }
  showChnages($event: any) {
    console.log('this.selectedOption---March-23');
    console.log(
      (this.selectedOption.filter(
        (item: any) => item?.children == undefined
      ).isselected = true)
    );
    console.log('this.selectedOption---March-24');
    //console.log($event[0]?.isselected);
  }
  submit() {
    if (this.testsToSubmit().length) {
      this.patientService.updatePatientTests(
        this.testsToSubmit().map((anyTest) => {
          return {
            name: anyTest.name,
            price: anyTest.price,
            result: anyTest.result ?? '',
          };
        })
      );
    }
  }
}
