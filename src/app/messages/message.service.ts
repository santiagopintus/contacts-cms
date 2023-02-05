import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = MOCKMESSAGES;
  messageSelectedEvent = new EventEmitter<Message>();
  messageChangedEvent = new EventEmitter<Message[]>();

  getMessages() {
    return this.messages.slice();
  }
  getMessage(id: string): Message | null {
    let m = this.messages.find((d) => d.id === id);
    return m ? m : null;
  }
  addMessage(msg: Message) {
    let newMessage = { ...msg };
    this.messages.push(newMessage);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
