import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProfileComponent } from './documents/profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FundsComponent } from './general_components/funds/funds.component';

const routes: Routes = [
  { path: 'my-documents', component: DocumentsComponent },
  { path: 'shared-with-me', component: DocumentsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'funds', component: FundsComponent },
  { path: '', pathMatch: 'full', redirectTo: '/my-documents' },
  { path: '**', component: NotFoundComponent }
];

export const ModuleRouting: ModuleWithProviders = RouterModule.forRoot(routes);
