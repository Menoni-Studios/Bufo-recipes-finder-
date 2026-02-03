# Setup Instructions

## Prerequisites
- Node.js and npm installed
- Ionic CLI installed (`npm install -g @ionic/cli`)
- A Spoonacular API key (get one free at https://spoonacular.com/food-api)

## Installation Steps

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Bufo-Ionic-RecipeFinder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your API key:
   - Copy `src/environments/environment.example.ts` to `src/environments/environment.ts`
   - Copy `src/environments/environment.example.ts` to `src/environments/environment.prod.ts`
   - Replace `YOUR_SPOONACULAR_API_KEY_HERE` with your actual Spoonacular API key in both files

4. Run the application:
   ```bash
   ionic serve
   ```

## Important Notes
- Never commit your `environment.ts` or `environment.prod.ts` files as they contain your API key
- The `.gitignore` file is configured to exclude these files automatically
