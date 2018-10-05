import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ModuleRouting } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './general_components/header/header.component';
import { HeaderLgComponent } from './general_components/header/lg/header-lg.component';
import { HeaderSmComponent } from './general_components/header/sm/header-sm.component';
import { MenuComponent } from './general_components/header/sm/menu/menu.component';
import { FilesComponent } from './files/files.component';
import { UploadBtnComponent } from './general_components/upload-btn/upload-btn.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { FooterComponent } from './general_components/footer/footer.component';
import { ItemComponent } from './files/item/item.component';
import { ProfileComponent } from './files/profile/profile.component';
import { AsideComponent } from './general_components/aside/aside.component';
import { QueueComponent } from './files/queue/queue.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FundsComponent } from './general_components/funds/funds.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderLgComponent,
    HeaderSmComponent,
    FilesComponent,
    MenuComponent,
    UploadBtnComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ItemComponent,
    ProfileComponent,
    AsideComponent,
    QueueComponent,
    NotFoundComponent,
    FundsComponent
  ],
  imports: [BrowserModule, ModuleRouting, HttpClientModule, FormsModule],
  providers: [MenuComponent, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
