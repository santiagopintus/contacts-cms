import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
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

  /* Returns the maximum id in the contacts list */
  getMaxId(): number {
    let maxId = 0;

    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  /* ADD A DOCUMENT */
  addContact(newContact: Contact): void {
    if (!newContact) {
      return;
    }
    /* Creates new id for the contact */
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);

    const contactsListClone = [...this.contacts];
    this.contactListChangedEvent.next(contactsListClone);
  }

  /* UPDATE A DOCUMENT */
  updateContact(contact: Contact) {
    if (!contact) {
      return;
    }
    /* Get index of editing contact */
    const i = this.contacts.indexOf(contact);
    if (i < 0) {
      return;
    }

    this.contacts[i] = Object.assign({}, contact);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  //Removing a contact
  deleteContact(contact: Contact | null) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    /* Check if contact exists first */
    if (pos < 0) {
      return;
    }
    /* Remove contact and emit event */
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
