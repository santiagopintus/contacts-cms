import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  contactsUrl: string = 'http://localhost:3000/contacts';
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {
    this.getContactsFromServer().subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  /* FUNCTIONS */
  getContactsFromServer() {
    return this.http.get<Contact[]>(this.contactsUrl);
  }

  //Getting all contacts
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  //Getting one contact
  getContact(id: string): Contact | null {
    let contact = this.contacts.find((c) => c.id === id);
    return contact || null;
  }
  getIndex(contact: Contact): number {
    /* Looks the index of the contact to update */
    const i = this.contacts.findIndex((c) => c.id === contact.id);
    /* Checks if it exists */
    if (i < 0) {
      throw Error(`Contact ${contact.name} not found`);
    }
    return i;
  }

  /* ADD A CONTACT */
  addContact(newContact: Contact): void {
    if (!newContact) {
      return;
    }
    newContact.id = '';
    console.log(newContact);
    this.http.post(this.contactsUrl, newContact).subscribe((data: any) => {
      let contact = data.contact;
      if (contact) {
        this.contacts.push(contact);
        this.contactListChangedEvent.next([...this.contacts]);
      }
    });
  }

  /* UPDATE A CONTACT */
  updateContact(contact: Contact) {
    /* Checks if contacts is defined */
    if (!contact) {
      return;
    }
    /* Looks the index of the contact to update */
    const i = this.getIndex(contact);
    if (i < 0) return;
    /* Sends the updated contact to the server */
    /* Update the contact in the array and in the DB */
    this.http
      .put(`${this.contactsUrl}/${contact.id}`, contact)
      .subscribe(() => {
        this.contacts[i] = { ...contact };
        this.contactListChangedEvent.next([...this.contacts]);
      });
  }

  /* DELETE A CONTACT */
  deleteContact(contact: Contact | null) {
    if (!contact) {
      return;
    }
    const i = this.getIndex(contact);
    if (i < 0) return;
    /* Remove contact and update DB */
    /* Sends a delete request for the contact to the server */
    console.log(contact.id);
    this.http.delete(`${this.contactsUrl}/${contact.id}`).subscribe(() => {
      /* Remove contact and emit event */
      this.contacts.splice(i, 1);
      this.contactListChangedEvent.next([...this.contacts]);
    });
  }
}
