import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PhoneBookService } from '../../service/phone-book.service';
import { PhoneBook, PhonebookEntity } from '../../model/phone-book';

@Component({
  selector: 'app-phone-book-search',
  templateUrl: './phone-book-search.component.html',
  styleUrls: ['./phone-book-search.component.css']
})
export class PhoneBookSearchComponent implements OnInit {

  public lastName ;

  @ViewChild('input') _input: ElementRef;

  public filterOn = false;

  constructor(private _service: PhoneBookService) { }

  ngOnInit() {
  }


  filter(lastName: string) {
     if (this.lastName !== undefined && this.lastName !== '' ) {
      this._service.filter(this.lastName).subscribe((response: PhoneBook) => {
      this._service.pbFilterSource$.next(response.phonebook);
      this._input.nativeElement.value = '';
      this.filterOn = true;
     });
     }
  }
  resetFilter() {
      this._service.getAll().subscribe((response: PhoneBook) => {
      this._service.pbFilterSource$.next(response.phonebook);
      this.lastName = '';
      this.filterOn = false;
    });
  }
}
