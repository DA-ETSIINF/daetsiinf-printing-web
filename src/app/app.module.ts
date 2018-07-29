import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModuleRouting } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './general_components/header/header.component';
import { HeaderLgComponent } from './general_components/header/lg/header-lg.component';
import { HeaderSmComponent } from './general_components/header/sm/header-sm.component';
import { MenuComponent } from './general_components/header/sm/menu/menu.component';
import { DocumentsComponent } from './documents/documents.component';
import { UploadBtnComponent } from './general_components/upload-btn/upload-btn.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { FooterComponent } from './general_components/footer/footer.component';
import { ItemComponent } from './documents/item/item.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderLgComponent,
    HeaderSmComponent,
    DocumentsComponent,
    MenuComponent,
    UploadBtnComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ItemComponent
  ],
  imports: [BrowserModule, ModuleRouting],
  providers: [MenuComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
