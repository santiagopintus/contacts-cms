import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent: EventEmitter<Document> =
    new EventEmitter<Document>();

  onSelected(contact: Document): void {
    this.selectedDocumentEvent.emit(contact);
  }
  
  documents = [
    {
      id: 'doc1',
      name: 'Introduction to Computer Science',
      description:
        'An overview of the basic concepts and principles of computer science.',
      url: 'https://example.com/docs/intro-to-cs',
      children: null,
    },
    {
      id: 'doc2',
      name: 'Calculus I',
      description: 'A study of limits, derivatives, and integrals.',
      url: 'https://example.com/docs/calculus-1',
      children: null,
    },
    {
      id: 'doc3',
      name: 'Physics I',
      description: 'An introduction to classical mechanics and thermodynamics.',
      url: 'https://example.com/docs/physics-1',
      children: null,
    },
    {
      id: 'doc4',
      name: 'Introduction to Literature',
      description:
        'An overview of different literary genres and their elements.',
      url: 'https://example.com/docs/intro-to-lit',
      children: null,
    },
  ];
}
