import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-anime-list-item',
  standalone: true,
  imports: [],
  templateUrl: './anime-list-item.component.html',
  styleUrl: './anime-list-item.component.scss'
})
export class AnimeListItemComponent implements OnInit {
  @Input() item: any;

  constructor() {}

  ngOnInit(): void {
    console.log(this.item)
  }
}
