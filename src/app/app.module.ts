import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtInterceptor } from './login/_helpers/jwt.interceptor';
import { DropZoneDirective } from './files/drop-zone.directive';
import { ModuleRouting } from './app.routing';
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
import { ChangeNameComponent } from './files/change-name/change-name.component';
import { DeleteItemComponent } from './files/delete-item/delete-item.component';
import { ItemPopoverComponent } from './files/item-popover/item-popover.component';
import { QuickPrintComponent } from './quick-print/quick-print.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { VersionsComponent } from './versions/versions.component';
import { CreateFolderComponent } from './files/create-folder/create-folder.component';
import { TerminalComponent } from './terminal/terminal.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TextInputComponent } from './ui-kit/text-input/text-input.component';
import { CheckboxComponent } from './ui-kit/checkbox/checkbox.component';


import { HttpClientModule, HttpClient } from '@angular/common/http';

// translation
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ButtonComponent } from './ui-kit/button/button.component';
import { SelectComponent } from './ui-kit/select/select.component';
import { PrinterDropZoneComponent } from './files/printer-drop-zone/printer-drop-zone.component';
import { FloatingMenuComponent } from './ui-kit/floating-menu/floating-menu.component';
import { TreeComponent } from './files/tree/tree.component';
import { FileNavigationComponent } from './files/file-navigation/file-navigation.component';
import { FileNavigationLgComponent } from './files/file-navigation/file-navigation-lg/file-navigation-lg.component';
import { FileNavigationSmComponent } from './files/file-navigation/file-navigation-sm/file-navigation-sm.component';

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
    FundsComponent,
    ChangeNameComponent,
    DeleteItemComponent,
    ItemPopoverComponent,
    DropZoneDirective,
    QuickPrintComponent,
    TutorialComponent,
    VersionsComponent,
    CreateFolderComponent,
    TerminalComponent,
    NotificationsComponent,
    TextInputComponent,
    CheckboxComponent,
    ButtonComponent,
    SelectComponent,
    PrinterDropZoneComponent,
    FloatingMenuComponent,
    TreeComponent,
    FileNavigationComponent,
    FileNavigationLgComponent,
    FileNavigationSmComponent
  ],
  imports: [
    BrowserModule,
    ModuleRouting,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    MenuComponent,
    AppComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
