import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent {
  contact: Contact | null = new Contact('0', '', '', '', '', null);
  // Inject the ContactService, Router, and ActivatedRoute services
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Subscribe to the active route and get the id of the selected contact (if in edit mode)
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.contact = this.contactService.getContact(params['id']);
      }
    });
  }
}
