import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';

const documentRoutes: Routes = [
  { path: 'new', component: DocumentEditComponent },
  { path: ':id', component: DocumentDetailComponent },
  { path: ':id/edit', component: DocumentEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(documentRoutes)],
  exports: [RouterModule],
})
export class DocumentRoutingModule {}
