import { Injectable, OnInit, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import { Tests } from '../../pages/admin/tests/tree-checkbox-demo/expansion/expansion.component';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService implements OnInit {
  private baseUrl: string = 'http://localhost:3000';
  patients: any = [];
  token: any;
  public patient = signal<any>({});

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // this.getPatients();
  }
  //create patient
  savePatient(obj: any) {
    console.log('inside patient.service.ts----March-1');
    console.log(obj);
    this.token = this.tokenService.getToken();
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token,
    });

    console.log(' saveBook inside patients.service.ts----March-2');
    const url = `${this.baseUrl}/patient`;
    return this.http.post<any>(`${url}`, obj, {
      responseType: 'json',
      headers: httpHeaders,
    });
  }

  // Mahdi's work for the seleceted drop down work
  public async updatePatientTests(tests: Partial<Tests>[]) {
    console.log(tests);
    this.token = this.tokenService.getToken();
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token,
    });

    console.log(' updatePatientTests inside patients.service.ts----March-2');
    const url = `${this.baseUrl}/patient/6605db7aa01698d64eccd3d4`;
    const resp = await lastValueFrom(
      this.http.put<any>(
        url,
        { test: tests },
        {
          responseType: 'json',
          headers: httpHeaders,
        }
      )
    );
    console.log(resp);

    //delete patient
  }

  //
  getAllPatients() {
    const url = `${this.baseUrl}/patient`;
    this.patients = this.http.get(`${url}`);
    return this.patients;
  }

  public async loadPatient() {
    const url = `${this.baseUrl}/patient/6605db7aa01698d64eccd3d4`;
    const resp = await lastValueFrom(this.http.get(`${url}`));
    if (resp) {
      this.patient.set(resp);
    }
  }
  updatePatient(obj: any) {
    // updateBook(id: any) {
    console.log(' updatePatient inside patients.service.ts----3999999');
    console.log(obj);
    // console.log(id);
    this.token = this.tokenService.getToken();
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token,
    });
    // console.log(' saveBook inside products.service.ts----2');
    // console.log(headers);
    const url = `${this.baseUrl}/patient/`;
    return this.http.put<any>(`${url}` + obj._id, obj, {
      responseType: 'json',
      headers: httpHeaders,
      // withCredentials: true,
    });
  }
}
