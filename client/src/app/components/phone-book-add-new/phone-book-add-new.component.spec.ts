import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneBookAddNewComponent } from './phone-book-add-new.component';

describe('PhoneBookAddNewComponent', () => {
  let component: PhoneBookAddNewComponent;
  let fixture: ComponentFixture<PhoneBookAddNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneBookAddNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneBookAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
