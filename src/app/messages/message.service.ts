import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];
  maxMessageId: number;
  messagesUrl: string =
    'https://wdd430-fb749-default-rtdb.firebaseio.com/messages.json';
  messageSelectedEvent = new EventEmitter<Message>();
  messageListChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) {
    this.maxMessageId = this.getMaxId();

    this.getMessagesFromServer().subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messageListChangedEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  /* FUNCTIONS */
  getMessagesFromServer() {
    return this.http.get<Message[]>(this.messagesUrl);
  }

  /* Returns the maximum id in the messages list */
  getMaxId(): number {
    let maxId = 0;

    for (const m of this.messages) {
      const currentId = parseInt(m.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  /* Store new Messages */
  storeMessages() {
    const messagesString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put(this.messagesUrl, messagesString, { headers: headers })
      .subscribe(() => {
        this.messageListChangedEvent.next([...this.messages]);
      });
  }

  getMessages() {
    return this.messages.slice();
  }
  getMessage(id: string): Message | null {
    let m = this.messages.find((d) => d.id === id);
    return m ? m : null;
  }
  addMessage(msg: Message) {
    let newMessage = { ...msg };
    newMessage.id = (this.getMaxId() + 1).toString();
    this.messages.push(newMessage);
    this.storeMessages();
  }
}
