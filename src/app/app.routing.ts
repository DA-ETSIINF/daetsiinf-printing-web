import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './login/_guards/auth.guard';

import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { FilesComponent } from './files/files.component';
import { ProfileComponent } from './files/profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FundsComponent } from './general_components/funds/funds.component';
import { QuickPrintComponent } from './quick-print/quick-print.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { VersionsComponent } from './versions/versions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'my-files',
    component: FilesComponent
    /*canActivate: [AuthGuard]*/
  },
  {
    path: 'my-files/:id',
    component: FilesComponent
    /*canActivate: [AuthGuard]*/
  },
  {
    path: 'shared-with-me',
    component: FilesComponent
    /* canActivate: [AuthGuard] */
  },
  {
    path: 'profile',
    component: ProfileComponent
    /* canActivate: [AuthGuard] */
  },
  {
    path: 'funds',
    component: FundsComponent
    /* canActivate: [AuthGuard] */
  },
  { path: '', pathMatch: 'full', redirectTo: '/my-files' },
  { path: 'quick', pathMatch: 'full', component: QuickPrintComponent},
  { path: 'tutorial', pathMatch: 'full', component: TutorialComponent},
  { path: 'versions', pathMatch: 'full', component: VersionsComponent},
  { path: '**', component: NotFoundComponent }
];

export const ModuleRouting: ModuleWithProviders = RouterModule.forRoot(routes);
