import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { DefaultComponent } from './layout/default/default.component';
import { MasterComponent } from './layout/master/master.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { LandingComponent } from './pages/website/landing/landing.component';
import { CategoryProduuctsComponent } from './pages/website/category-produucts/category-produucts.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { CustomerComponent } from './pages/admin/customer/customer.component';
import { ViewDoctorComponent } from './pages/admin/doctor/view-doctor/view-doctor.component';
import { PatientComponent } from './pages/admin/patient/patient.component';
import { ViewPatientComponent } from './pages/admin/patient/view-patient/view-patient.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { roleGuard } from './guards/role.guard';
import { TreeCheckboxDemoComponent } from './pages/admin/tests/tree-checkbox-demo/tree-checkbox-demo.component';
import { MultipleCheckBoxComponent } from './pages/admin/test2/multiple-check-box/multiple-check-box.component';

export const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    canActivate: [guestGuard],
    children: [{ path: '', component: LandingComponent }],
  },
  {
    path: '',
    component: MasterComponent,
    canActivate: [guestGuard],
    children: [{ path: 'register', component: RegisterPageComponent }],
  },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [guestGuard],
    children: [{ path: 'forgotPassword', component: ForgotPasswordComponent }],
  },

  {
    // path: '',
    path: '',
    component: DefaultComponent,
    canActivate: [guestGuard],
    children: [{ path: 'login', component: LoginPageComponent }],
  },
  {
    // path: '',
    path: '',
    component: DefaultComponent,
    // canActivate: [guestGuard],
    children: [{ path: 'test', component: TreeCheckboxDemoComponent }],
  },
  {
    // path: '',
    path: '',
    component: DefaultComponent,
    canActivate: [guestGuard],
    children: [{ path: 'test2', component: MultipleCheckBoxComponent }],
  },

  {
    // path: '',
    path: '',
    component: DefaultComponent,
    canActivate: [guestGuard],
    children: [{ path: 'products/:id', component: CategoryProduuctsComponent }],
  },
  // {
  //   path: '',
  //   component: MasterComponent,
  //   canActivate: [authGuard],
  //   children: [{ path: 'home', component: HomeComponent }],
  // },
  // {
  //   path: 'dashboard',
  //   canActivate: [authGuard],
  //   component: DashboardComponent,
  // },

  {
    path: '',
    component: MasterComponent,
    canActivate: [authGuard],
    children: [{ path: 'products', component: ProductsComponent }],
    // data: {
    //   role: 'ADMIN',
    // },
  },

  // {
  //   path: '',
  //   component: MasterComponent,
  //   canActivate: [authGuard],
  //   children: [{ path: 'categories', component: CategoriesComponent }],
  // },

  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        canActivate: [authGuard],
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        canActivate: [authGuard],
        path: 'customers',
        component: CustomerComponent,
        // data: {
        //   // role: 'ADMIN',
        //   role: ['ADMIN', 'USER'],
        // },
      },
      {
        canActivate: [authGuard],
        path: 'customers/:id',
        component: ViewDoctorComponent,
      },
      {
        canActivate: [authGuard],
        path: 'patients',
        component: PatientComponent,
        // data: {
        //   role: 'USER',
        // },
      },
      {
        canActivate: [authGuard],
        path: 'patients/:id',
        component: ViewPatientComponent,
      },
    ],
  },
];
