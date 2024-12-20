import { Component, inject, Input, OnInit } from '@angular/core';
import { TextBuilderService } from '../../services/text-builder.service';
import { CommonModule } from '@angular/common';
import { RouteHelperService } from '../../services/route-helper.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
  @Input() current!: number;
  @Input() route!: string;
  @Input() last!: number;

  pagesToDisplay!: number[];

  routeHelper = inject(RouteHelperService);

  ngOnInit(): void {
    this.getPagesToDisplay();
  }

  getPagesToDisplay(): void {
    const range = 2;
    
    const startPage = Math.max(1, this.current - range);
    const endPage = Math.min(this.last, this.current + range);
    
    this.pagesToDisplay = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pagesToDisplay.push(i);
    }
  }
}
