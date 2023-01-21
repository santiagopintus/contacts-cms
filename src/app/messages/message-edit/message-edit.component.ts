import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.scss'],
})
export class MessageEditComponent {
  message: Message = new Message('', '', '', '');
  sender: string = 'Santiago Pintus';

  @Output() addMessageEvent = new EventEmitter<Message>();

  onSendMessage() {
    this.message.sender = this.sender;
    this.message.id = "1234567890";
    this.addMessageEvent.emit(this.message);
  }

  onClear(formRef: any) {
    this.message = new Message('', '', '', '');
    formRef.resetForm();
  }
}
