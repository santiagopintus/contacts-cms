import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent {
  @Output() selectedContactEvent: EventEmitter<Contact> =
    new EventEmitter<Contact>();

  onSelected(contact: Contact): void {
    this.contactService.contactSelectedEvent.emit(contact);
  }

  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }
}
