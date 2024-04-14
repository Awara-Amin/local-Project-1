import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-multiple-check-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './multiple-check-box.component.html',
  styleUrl: './multiple-check-box.component.css',
})
export class MultipleCheckBoxComponent implements OnInit {
  _courselist!: course[];

  constructor() {}

  ngOnInit() {
    this.getcourses();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  getcourses() {
    this._courselist = [
      { id: 1, name: 'C#', isselected: false },
      { id: 2, name: 'ASP.NET', isselected: false },
      { id: 3, name: 'SQL', isselected: false },
      { id: 4, name: 'MVC', isselected: false },
      { id: 5, name: 'JQUERY', isselected: false },
      { id: 6, name: 'ANGULAR', isselected: false },
    ];
  }
  onchange() {
    console.log('this._courselist March----25');
    console.log(this._courselist);
  }
}
class course {
  id!: number;
  name!: string;
  isselected!: boolean;
}
