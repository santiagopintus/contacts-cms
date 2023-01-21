import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent {
  @Output() selectedContactEvent: EventEmitter<Contact> =
    new EventEmitter<Contact>();

  onSelected(contact: Contact): void {
    this.selectedContactEvent.emit(contact);
  }

  contacts: Contact[] = [
    {
      id: '1',
      name: 'R. Kent Jackson',
      email: 'jacksonk@byui.edu',
      phone: '208-123-4567',
      imageUrl: '../../assets/images/jacksonk.jpg',
      group: null,
    },
    {
      id: '2',
      name: 'Rex Barzee',
      email: 'barzeer@byui.edu',
      phone: '208-496-3768',
      imageUrl: '../../assets/images/barzeer.jpg',
      group: null,
    },
  ];
}
