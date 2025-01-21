import { Component } from '@angular/core';

@Component({
  selector: 'app-card-skeleton',
  standalone: true,
  imports: [],
  template: `
    <div class="h-56 w-full bg-gray-300 rounded-lg animate-pulse">
    </div>
  `
})
export class CardSkeletonComponent {

}
