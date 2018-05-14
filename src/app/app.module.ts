import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeaderLgComponent } from './header/lg/header-lg.component';
import { HeaderSmComponent } from './header/sm/header-sm.component';
import { MenuComponent } from './header/sm/menu/menu.component';
import { DocumentsComponent } from './documents/documents.component';
import { MyDocumentsComponent } from './documents/my-documents/my-documents.component';
import { SharedDocumentsComponent } from './documents/shared-documents/shared-documents.component';

const appRoutes: Routes = [
  { path: 'my-documents', component: MyDocumentsComponent },
  { path: 'shared-with-me', component: SharedDocumentsComponent },
  { path: '', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderLgComponent,
    HeaderSmComponent,
    DocumentsComponent,
    MenuComponent,
    MyDocumentsComponent,
    SharedDocumentsComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
