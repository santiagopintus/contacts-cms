import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  maxDocumentId: number;
  /* EVENTS */
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId();

    this.getDocumentsFromServer().subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
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
    return this.http.get<Document[]>(
      'https://wdd430-fb749-default-rtdb.firebaseio.com/documents.json'
    );
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
    console.log(this.documents.find((d) => d.id === document.id));
    const i = this.documents.findIndex((d) => d.id === document.id);
    /* Checks if it exists */
    if (i < 0) {
      throw Error(`Document ${document.name} not found`);
    }
    console.log(i);
    return i;
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

  /* Store new Documents */
  storeDocuments() {
    console.log('STORING DOC');
    const documentsString = JSON.stringify(this.documents);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put(
        'https://wdd430-fb749-default-rtdb.firebaseio.com/documents.json',
        documentsString,
        { headers: headers }
      )
      .subscribe(() => {
        this.documentListChangedEvent.next([...this.documents]);
      });
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
    this.storeDocuments();
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
    this.documents[i] = Object.assign({}, document);
    this.storeDocuments();
  }

  /* DELETE A DOCUMENT */
  deleteDocument(document: Document | null) {
    if (!document) {
      return;
    }
    const i = this.getIndex(document);
    console.log(i);
    if (i < 0) return;
    /* Remove document and emit event */
    this.documents.splice(i, 1);
    this.storeDocuments();
  }
}
