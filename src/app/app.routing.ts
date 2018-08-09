import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { DocumentsComponent } from './documents/documents.component';
import { AppComponent } from './app.component';
import { ProfileComponent } from './documents/profile/profile.component';

const routes: Routes = [
  { path: 'my-documents', component: DocumentsComponent },
  { path: 'shared-with-me', component: DocumentsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', component: AppComponent }
];

export const ModuleRouting: ModuleWithProviders = RouterModule.forRoot(routes);
