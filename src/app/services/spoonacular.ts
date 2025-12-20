import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Spoonacular {
  private apiKey = '70759a4f7911402abcc53d3c51d3b759'; 
  private apiUrl1 = 'https://api.spoonacular.com/recipes/complexSearch';


  constructor(private http: HttpClient) {}

  //I keep it simple, make it work first.
  //I do not have to use Sync, because Observables are asynchronous by design — they don’t block the UI.
 //Method to display recipies base on the words entered.
  searchRecipes(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl1}?query=${query}&apiKey=${this.apiKey}`);
  }
//Method to fetch recipe details by ID.
getRecipeDetails(id: number): Observable<any> {
    return this.http.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.apiKey}`);
  }
}
