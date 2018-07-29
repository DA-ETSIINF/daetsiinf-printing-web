import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../models';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  showOptions = false;
  constructor() {}

  ngOnInit() {}

  toggleOptionsIcon(item, status) {
    if (!this.showOptions) {
      item.children[0].style.display = status;
    }
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }
}
