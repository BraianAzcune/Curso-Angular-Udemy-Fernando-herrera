import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css']
})
export class CounterPageComponent {
  counter = signal(10);
  squareCounter = computed(() => this.counter() * this.counter());
  updateCounter(v: number) {
    this.counter.update(current => {
      const newV = current + v;
      if (newV < 0) return 0;
      return newV;
    });
  }
}
