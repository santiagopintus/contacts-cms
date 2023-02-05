import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = MOCKDOCUMENTS;
  documentSelectedEvent = new EventEmitter<Document>();
  
  getDocuments() {
    return this.documents.slice();
  }
  getDocument(id: string): Document | null {
    let doc = this.documents.find((d) => d.id === id);
    return doc ? doc : null;
  }
}
