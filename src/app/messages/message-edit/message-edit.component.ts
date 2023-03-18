import { Component, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.scss'],
})
export class MessageEditComponent {
  message: Message = new Message('', '', '', '');
  /* MY OWN CONTACT ID */
  sender: string = '101';

  onSendMessage() {
    this.message.sender = this.sender;
    this.messageService.addMessage(this.message);
  }
  onClear(formRef: any) {
    this.message = new Message('', '', '', '');
    formRef.resetForm();
  }

  constructor(private messageService: MessageService) {}
}
