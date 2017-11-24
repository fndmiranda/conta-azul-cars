import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() data: any;
  @Input() router: any;

  constructor() { }

  range(number: number) {
    const items: number[] = [];
    for (let i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  ngOnInit() {
  }

}
