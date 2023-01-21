import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent {
  @Input() contact: Contact = new Contact('0', '', '', '', '', null);
}
