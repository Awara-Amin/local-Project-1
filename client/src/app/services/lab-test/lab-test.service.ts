import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

// import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

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

@Injectable({
  providedIn: 'root',
})
export class LabTestService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  public GetAllTests(): Observable<TestGroup[]> {
    const url = `${this.baseUrl}/lab-tests`;
    let labTests = this.httpClient.get<TestGroup[]>(url);

    return labTests;
    // books.subscribe((res) => {
    //   this.bookList = res;
    // });
  }
}
