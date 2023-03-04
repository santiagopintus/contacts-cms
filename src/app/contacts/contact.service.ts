import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;
  contactsUrl: string =
    'https://wdd430-fb749-default-rtdb.firebaseio.com/contacts.json';
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {
    this.maxContactId = this.getMaxId();

    this.getContactsFromServer().subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
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

  /* Store new Contacts */
  storeContacts() {
    const contactsString = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put(this.contactsUrl, contactsString, { headers: headers })
      .subscribe(() => {
        this.contactListChangedEvent.next([...this.contacts]);
      });
  }

  /* ADD A CONTACT */
  addContact(newContact: Contact): void {
    if (!newContact) {
      return;
    }
    /* Creates new id for the contact */
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  /* UPDATE A CONTACT */
  updateContact(contact: Contact) {
    /* Checks if contacts is defined */
    if (!contact) {
      return;
    }
    const i = this.getIndex(contact);
    if (i < 0) return;
    /* Update the contact in the array and in the DB */
    this.contacts[i] = { ...contact };
    this.storeContacts();
  }

  /* DELETE A CONTACT */
  deleteContact(contact: Contact | null) {
    if (!contact) {
      return;
    }
    const i = this.getIndex(contact);
    if (i < 0) return;
    /* Remove contact and update DB */
    this.contacts.splice(i, 1);
    this.storeContacts();
  }
}
