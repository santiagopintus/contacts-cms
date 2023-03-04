import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';
@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): any {
    return term
      ? contacts.filter((c) =>
          c.name.toLowerCase().includes(term.toLowerCase())
        )
      : contacts;
  }
}
