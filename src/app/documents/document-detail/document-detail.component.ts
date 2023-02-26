import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from 'src/app/wind-ref.service';
@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
})
export class DocumentDetailComponent implements OnInit {
  @Input() document: Document | null = new Document('', '', '', '', null);
  nativeWindow: any;
  // document: Document;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private winRef: WindRefService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nativeWindow = this.winRef.getNativeWindow();
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.document = this.documentService.getDocument(id);
    });
  }

  onView() {
    const url = this.document?.url;
    this.nativeWindow.open(url);
  }
  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}
