import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PhoneBookListComponent } from './components/phone-book-list/phone-book-list.component';
import { PhoneBookSearchComponent } from './components/phone-book-search/phone-book-search.component';
import { PhoneBookAddNewComponent } from './components/phone-book-add-new/phone-book-add-new.component';
import { PhoneBookService } from './service/phone-book.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    PhoneBookListComponent,
    PhoneBookSearchComponent,
    PhoneBookAddNewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [
    PhoneBookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
