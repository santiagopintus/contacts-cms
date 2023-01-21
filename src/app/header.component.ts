import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>();
  selectedFeature: string = "documents";

  onSelected(feature: string) {
    this.selectedFeature = feature;
    this.selectedFeatureEvent.emit(this.selectedFeature);
  }
}
