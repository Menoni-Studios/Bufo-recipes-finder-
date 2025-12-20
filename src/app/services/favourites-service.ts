import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
   private storageKey = 'favourites';
  private favourites: any[] = [];

  constructor() {
    this.loadFavourites();
  }

  private loadFavourites() {
    const data = localStorage.getItem(this.storageKey);
    this.favourites = data ? JSON.parse(data) : [];
  }

  private saveFavourites() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.favourites));
  }

  getFavourites() {
    return this.favourites;
  }

  isFavourite(id: number): boolean {
    return this.favourites.some(r => r.id === id);
  }

  addFavourite(recipe: any) {
    if (!this.isFavourite(recipe.id)) {
      this.favourites.push(recipe);
      this.saveFavourites();
    }
  }

  removeFavourite(id: number) {
    this.favourites = this.favourites.filter(r => r.id !== id);
    this.saveFavourites();
  }
}
