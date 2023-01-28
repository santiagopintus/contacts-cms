import { Component, Input } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.scss'],
})
export class DocumentItemComponent {
  @Input() document: Document = new Document('', '', '', '', null);
}
