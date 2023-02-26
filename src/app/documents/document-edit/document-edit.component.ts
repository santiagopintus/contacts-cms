import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss'],
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document = new Document('', '', '', '', null);
  document: Document = new Document('', '', '', '', null);
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        const doc = this.documentService.getDocument(id);
        if (doc) {
          this.originalDocument = doc;
        }

        if (this.originalDocument) {
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      } else {
        this.editMode = false;
        this.document = new Document('', '', '', '', null);
      }
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const values = form.value;
    const newDocument = new Document(
      this.originalDocument.id,
      values['name'],
      values['description'],
      values['url'],
      values['children']
    );
    if (this.editMode) {
      this.documentService.updateDocument(
        Object.assign(this.originalDocument, newDocument)
      );
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
