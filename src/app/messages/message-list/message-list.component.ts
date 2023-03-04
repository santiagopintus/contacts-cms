import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent {
  @Output() selectedMessageEvent: EventEmitter<Message> =
    new EventEmitter<Message>();

  messages: Message[] = [];

  onSelected(message: Message): void {
    this.messageService.messageSelectedEvent.emit(message);
  }

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.messageService.messageListChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }
}
