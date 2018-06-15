import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PhoneBookService } from '../../service/phone-book.service';
import { PhoneBook, PhonebookEntity } from '../../model/phone-book';

@Component({
  selector: 'app-phone-book-add-new',
  templateUrl: './phone-book-add-new.component.html',
  styleUrls: ['./phone-book-add-new.component.css']
})
export class PhoneBookAddNewComponent implements OnInit {

  public pb: PhonebookEntity;

  constructor(private _service: PhoneBookService) { }

  ngOnInit() {
    this.pb = {
      firstName: '',
      lastName: '',
      number: '',
    };
  }
  reset() {
    this.pb = {
      firstName: '',
      lastName: '',
      number: '',
    };
  }
  add() {
    this._service.updatePb(this.pb);
    this._service.addNew(this.pb).subscribe(() =>  this.reset());
  }
}
