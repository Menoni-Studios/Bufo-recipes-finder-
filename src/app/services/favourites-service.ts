// Import Angular's Injectable so this class can be injected as a service.
import { Injectable } from '@angular/core';
//Import Storage module so data can be storage persistently in the browser.
import {Storage} from '@ionic/storage-angular';


// @Injectable tells Angular this class can be provided and injected into components.
// 'providedIn: root' means Angular will create a single, shared instance of this service
// available throughout the entire app (singleton service).
@Injectable({
  providedIn: 'root',
})
export class FavouritesService {

  // Key used to store/retrieve favourites in browser localStorage
  private storageKey = 'favourites';
  // Internal array holding the list of favourite recipes
  private favourites: any[] = [];

  // Constructor runs when the service is first created.
  // It loads any previously saved favourites from localStorage.
  constructor(private storage: Storage) {
    this.init();
  }

// Initialize Ionic Storage
//Load favourites asynchronously using await this.storage.get(...)
  async init() {
    await this.storage.create();
    const data = await this.storage.get(this.storageKey);
    this.favourites = data || [];
  }
//Saving favourites using Ionic Storage
private async saveFavourites() {
    await this.storage.set(this.storageKey, this.favourites);
  }
//Geting favourites.
  getFavourites(): any[] {
    return this.favourites;
  }

//Checking if a recipe is already in favourites.
  isFavourite(id: number): boolean {
    return this.favourites.some(r => r.id === id);
  }
  
//Adding a recipe to favourites.  
  async addFavourite(recipe: any) {
    if (!this.isFavourite(recipe.id)) {
      this.favourites.push(recipe);
      await this.saveFavourites();
    }
  }

  //Remove a recipe from favourites.
    async removeFavourite(id: number) {
    this.favourites = this.favourites.filter(r => r.id !== id);
    await this.saveFavourites();
  }
}
