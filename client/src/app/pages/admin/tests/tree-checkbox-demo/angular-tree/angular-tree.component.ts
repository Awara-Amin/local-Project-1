import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
  selected?: boolean;
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple', selected: false },
      { name: 'Banana', selected: false },
      { name: 'Fruit loops', selected: false },
    ],
    selected: false,
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
         selected: false,
      },
      {
        name: 'Orange',
       
        selected: false,
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'angular-tree',
  templateUrl: 'angular-tree.component.html',
  standalone: true,
  imports: [
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
  ],
})
export class TreeFlatOverviewExample {
private selectedNode:any
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  updateAllComplete(event:any) {
    console.log(event);
    const item:any=this.dataSource.data[event.level-1]
   item.children.find((x:any)=>x.name==event.name).selected=event.selected
    console.log( this.dataSource.data);
  }
  setIndex(node:any) {
this.selectedNode=node
}
}

/**  Copyright 2024 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
