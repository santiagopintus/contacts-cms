import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message = new Message('', '', '', '');
  messageSender: string = '';

  constructor(private contactService: ContactService) {}
  ngOnInit(): void {
    this.getMessageSender();
    // Listen to the contacts loaded event
    this.contactService.contactListChangedEvent.subscribe(() => {
      this.getMessageSender();
    });
  }

  // Get the contact for this message
  getMessageSender() {
    this.messageSender =
      this.contactService.getContact(this.message.sender)?.name || 'Unknown';
  }
}
