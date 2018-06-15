import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhoneBook, PhonebookEntity } from '../model/phone-book';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PhoneBookService {

   pbFilterSource$: BehaviorSubject<any> = new BehaviorSubject([]);
   pbAddNewSource$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _http: HttpClient) { }

  updatePb(pbe: PhonebookEntity) {
    this.pbAddNewSource$.next(pbe);
  }
  getAll() {
    return this._http.get('/api/list') as Observable<PhoneBook>;
  }
  delete(pbe: PhonebookEntity) {
    return this._http.delete('/api/delete/' + pbe.id);
  }
  addNew(pbe: PhonebookEntity) {
    return this._http.post('api/insert', pbe);
  }
  filter(lastName: string) {
    return this._http.get('/api/list/' + lastName) as Observable<PhoneBook>;
  }
}
