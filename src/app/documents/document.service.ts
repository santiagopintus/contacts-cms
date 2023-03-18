import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  /* EVENTS */
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  private documentsUrl: string = 'http://localhost:3000/documents';

  constructor(private http: HttpClient) {
    this.getDocumentsFromServer().subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.documents.sort((a, b) => a.name.localeCompare(b.name));
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  /* -------FUNCTIONS------ */
  getDocumentsFromServer() {
    return this.http.get<Document[]>(this.documentsUrl);
  }
  /* GET DOCUMENT/S */
  getDocuments() {
    return this.documents.slice();
  }
  getDocument(id: string): Document | null {
    let doc = this.documents.find((d) => d.id === id);
    return doc ? doc : null;
  }
  getIndex(document: Document): number {
    /* Looks the index of the document */
    const i = this.documents.findIndex((d) => d.id === document.id);
    /* Checks if it exists */
    if (i < 0) {
      throw Error(`Document ${document.name} not found`);
    }
    return i;
  }

  /* ADD A DOCUMENT */
  addDocument(newDocument: Document): void {
    if (!newDocument) {
      return;
    }
    /* Sends the new document to the server */
    newDocument.id = '';
    this.http.post(this.documentsUrl, newDocument).subscribe((data: any) => {
      let document = data.document;
      if (document) {
        /* Updates the local documents list with the new document */
        this.documents.push(document);
        this.documentListChangedEvent.next([...this.documents]);
      }
    });
  }

  /* UPDATE A DOCUMENT */
  updateDocument(document: Document) {
    /* Checks if document is defined */
    if (!document) {
      return;
    }
    /* Looks the index of the document to update */
    const i = this.getIndex(document);
    if (i < 0) return;
    /* Sends the updated document to the server */
    this.http
      .put(`${this.documentsUrl}/${document.id}`, document)
      .subscribe(() => {
        this.documents[i] = Object.assign({}, document);
        this.documentListChangedEvent.next([...this.documents]);
      });
  }

  /* DELETE A DOCUMENT */
  deleteDocument(document: Document | null) {
    if (!document) {
      return;
    }
    const i = this.getIndex(document);
    if (i < 0) return;
    /* Sends a delete request for the document to the server */
    this.http.delete(`${this.documentsUrl}/${document.id}`).subscribe(() => {
      /* Remove document and emit event */
      this.documents.splice(i, 1);
      this.documentListChangedEvent.next([...this.documents]);
    });
  }
}
