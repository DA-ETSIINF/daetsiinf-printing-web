import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './general_components/header/header.component';
import { HeaderLgComponent } from './general_components/header/lg/header-lg.component';
import { HeaderSmComponent } from './general_components/header/sm/header-sm.component';
import { MenuComponent } from './general_components/header/sm/menu/menu.component';
import { DocumentsComponent } from './documents/documents.component';
import { MyDocumentsComponent } from './documents/my-documents/my-documents.component';
import { SharedDocumentsComponent } from './documents/shared-documents/shared-documents.component';
import { AsideDocumentsComponent } from './documents/aside-documents/aside-documents.component';
import { UploadBtnComponent } from './general_components/upload-btn/upload-btn.component';

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
    SharedDocumentsComponent,
    AsideDocumentsComponent,
    UploadBtnComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
