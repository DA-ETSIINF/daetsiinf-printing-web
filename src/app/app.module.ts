import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeaderLgComponent } from './header/lg/header-lg.component';
import { HeaderSmComponent } from './header/sm/header-sm.component';
import { DocumentsComponent } from './documents/documents.component';

const appRoutes: Routes = [{ path: '', component: DocumentsComponent }];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderLgComponent,
    HeaderSmComponent,
    DocumentsComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
