import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { MyDocumentsComponent } from './documents/my-documents/my-documents.component';
import { SharedDocumentsComponent } from './documents/shared-documents/shared-documents.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'my-documents', component: MyDocumentsComponent },
  { path: 'shared-with-me', component: SharedDocumentsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: AppComponent }
];

export const ModuleRouting: ModuleWithProviders = RouterModule.forRoot(routes);
