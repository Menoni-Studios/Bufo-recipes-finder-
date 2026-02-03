import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Spoonacular {
  private apiKey = environment.spoonacularApiKey; 
  private apiUrl1 = 'https://api.spoonacular.com/recipes/complexSearch';


  constructor(private http: HttpClient) {}
  
 //Method to display recipies base on the words entered.
  searchRecipes(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl1}?query=${query}&addRecipeInformation=true&apiKey=${this.apiKey}`);
  }
//Method to fetch recipe details by ID.
getRecipeDetails(id: number): Observable<any> {
    return this.http.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.apiKey}`);
  }
}
