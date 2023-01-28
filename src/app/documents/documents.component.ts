import { Component } from '@angular/core';
import { Document } from './document.model';
@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent {
  selectedDocument: Document = new Document('', '', '', '', null);
}
