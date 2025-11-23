import { Component } from "@angular/core";
import { interval, map, take } from "rxjs";

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.css'],
  standalone: false,
})
export class MainCardComponent {
    cards = ['main_card', 'feeding_tracker', 'excretion_tracker', 'medication_tracker', 'inventory_tracker'];
    chosenCard: string = 'main_card';
    constructor() {}

    ngOnInit() {
        interval(4000).pipe(take(this.cards.length),
            map((index: number) => this.cards[index])).subscribe((card) => this.showCard(card))
    }

    showCard(activeCard: string) {
        this.chosenCard = activeCard;
    }
}