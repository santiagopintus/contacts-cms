import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = MOCKDOCUMENTS;
  maxDocumentId: number;

  constructor() {
    this.maxDocumentId = this.getMaxId();
  }

  /* EVENTS */
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  /* -------FUNCTIONS------ */

  /* GET DOCUMENT/S */
  getDocuments() {
    return this.documents.slice();
  }
  getDocument(id: string): Document | null {
    let doc = this.documents.find((d) => d.id === id);
    return doc ? doc : null;
  }

  /* Returns the maximum id in the documents list */
  getMaxId(): number {
    let maxId = 0;

    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  /* ADD A DOCUMENT */
  addDocument(newDocument: Document): void {
    if (!newDocument) {
      return;
    }
    /* Creates new id for the document */
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    const documentsListClone = [...this.documents];
    this.documentListChangedEvent.next(documentsListClone);
  }

  /* UPDATE A DOCUMENT */
  updateDocument(document: Document) {
    if (!document) {
      return;
    }
    /* Get index of editing document */
    const i = this.documents.indexOf(document);
    if (i < 0) {
      return;
    }

    this.documents[i] = Object.assign({}, document);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  /* DELETE A DOCUMENT */
  deleteDocument(document: Document | null) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    /* Check if document exists first */
    if (pos < 0) {
      return;
    }
    /* Remove document and emit event */
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }
}
