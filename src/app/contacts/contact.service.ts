import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  //Getting all contacts
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  //Getting one contact
  getContact(id: string): Contact | null {
    let contact = this.contacts.find((c) => c.id === id);
    return contact ? contact : null;
  }

  //Removing a contact
  deleteContact(contact: Contact | null) {
    this.contacts = this.contacts.filter((c) => c.id !== contact?.id);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}
