import { Component, OnInit } from '@angular/core';
import { PhoneBookService } from '../../service/phone-book.service';
import { PhoneBook, PhonebookEntity } from '../../model/phone-book';


@Component({
  selector: 'app-phone-book-list',
  templateUrl: './phone-book-list.component.html',
  styleUrls: ['./phone-book-list.component.css']
})
export class PhoneBookListComponent implements OnInit {

  public records: PhonebookEntity[];

  constructor(private _service: PhoneBookService) { }

  ngOnInit() {
    this.filter();
    this.addNew();
  }

  loadData() {
    this._service.getAll().subscribe(data => { this.records = data.phonebook;
    });
  }
  delete(pb: PhonebookEntity) {
    if (window.confirm('You want to delete item ?')) {
    this._service.delete(pb).subscribe(() =>  this.loadData());
    }
  }
  filter() {
    this._service.pbFilterSource$.subscribe(response =>  this.records = response);
  }
  addNew() {
    this._service.pbAddNewSource$.subscribe(() => this.loadData());
  }
}
