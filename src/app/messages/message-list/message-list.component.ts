import { Component, Input } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent {
  @Input() newMessage: Message = new Message('', '', '', '');
  messages: Message[] = [
    {
      id: 'message',
      subject: 'Grades updated',
      msgText: 'I have already updated the grades',
      sender: 'James Bond',
    },
    {
      id: 'message',
      subject: 'Announcement',
      msgText: 'Welcome to the course',
      sender: 'Professor Bond',
    },
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
