import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private generateRandomUsername(): string {
    const adjectives = [
      'Anonymous',
      'Brave',
      'Clever',
      'Eager',
      'Fierce',
      'Gentle',
      'Humble',
      'Innocent',
      'Jolly',
      'Kind',
      'Loyal',
      'Mighty',
      'Noble',
      'Optimistic',
      'Proud',
      'Quiet',
      'Resilient',
      'Strong',
      'Talented',
      'Unique',
      'Valiant',
      'Wise',
      'Xenial',
      'Young',
      'Zealous',
    ];
    const nouns = [
      'Hippopotamus',
      'Elephant',
      'Giraffe',
      'Kangaroo',
      'Lion',
      'Monkey',
      'Ostrich',
      'Penguin',
      'Raccoon',
      'Squirrel',
      'Tiger',
      'Unicorn',
      'Vulture',
      'Wolf',
      'Xerus',
      'Yak',
      'Zebra',
    ];
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
  }

  getUsername(): string {
    const username = localStorage.getItem('username');
    if (username) {
      return username;
    } else {
      const randomUsername = this.generateRandomUsername();
      localStorage.setItem('username', randomUsername);
      return randomUsername;
    }
  }
}
