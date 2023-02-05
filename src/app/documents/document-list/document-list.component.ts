import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent: EventEmitter<Document> =
    new EventEmitter<Document>();

  documents: Document[] = [];

  onSelected(document: Document): void {
    this.documentService.documentSelectedEvent.emit(document);
  }

  constructor(private documentService: DocumentService) { }
  
  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }
}
