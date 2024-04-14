import { Component, Input } from '@angular/core';
import { Book } from '../app.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent {
  @Input() book!: Book;
}
