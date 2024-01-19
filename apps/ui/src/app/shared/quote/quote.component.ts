import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'commu-quote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
})
export class QuoteComponent {
  phrase: string = 'Все, что вы можете себе вообразить, реально.';
}
