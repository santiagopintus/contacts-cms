import { Component, Input } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  @Input() selectedContact: Contact = new Contact('0', '', '', '', '', null);
}
