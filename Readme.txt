This is an Ionic mobile application that: 
• reads recipe data from the internet (Spoonacular.com) 
• allows a search for recipes by ingredients 
• allows viewing of full recipe details (ingredients, instructions) 
• maintains a favourite recipes list 
• allows measurement units to be shown in either US or Metric.


Building a complete Ionic/Angular recipe search and details flow using the Spoonacular API. 1-Set up the application bootstrap in  with, adding  through  so that HTTP requests could be made globally. 2-Created a dedicated service () that holds the API key and defines two endpoints: one for searching recipes () which returns the recipe and another for fetching recipe details () which provides the image, ingredients with metric measures, and step‑by‑step instructions. On the Home Page, I added an input field for ingredients and a SEARCH button that calls the service, storing results in a  array and displaying them with inside Ionic cards. Each card shows the recipe’s title, image, and id, along with a Details button that routes to a new Details Page. The Details Page uses the recipe ID to call the second API endpoint and renders the full recipe information, including the image, a list of ingredients with amounts and units, and analyzed instructions with numbered steps. Still has issues but mostly working.