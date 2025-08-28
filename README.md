# 🎬 Movie Explorer App

A React-based movie search and discovery app that allows users to explore **Trending Movies** and search for any movie using the **TMDB API**.  
This app also integrates with **Appwrite** to keep track of search trends.

---

## 🚀 Features

- 🔍 **Search Movies**: Search any movie with real-time debounce.
- 🎯 **Trending Movies**: See the top trending movies from Appwrite stats.
- 📖 **Movie Details**: View description, rating, release year, and language inside a modal.
- ⚡ **Responsive UI**: Mobile-friendly layout using TailwindCSS.
- 📊 **Search Analytics**: Tracks searches in Appwrite Database.
- 🖼 **Fallback Poster**: Shows a default poster when no image is available.

---

## 🛠️ Technologies Used

- **React** (with Hooks & State management)
- **TailwindCSS** (for styling)
- **Appwrite** (for storing trending searches)
- **TMDB API** (for movie data)
- **React-use** (for debounce functionality)

---

## 📸 Demo Screenshots

### 🎯 Trending Movies

<img src='/public/Tranding Movies.PNG' alt='Tranding Movies'/>

### 📖 All Movies

<img src='/public/All Movies.PNG' alt='All Movies'/>

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/movie-explorer.git
   cd movie-explorer
   ```
2. **Install dependencies**

```
npm install

```

3. **Set up environment variables**
   Create a .env file in the root folder:

````VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
 ```


4. **Run the app locally**

  ```
npm run dev

  ```

5. **Open in browser**

 ```
http://localhost:5173
 ```

## 📂 Project Structure

movie-explorer/

- │── src/
- │ ├── components/
- │ │ ├── Search.jsx
- │ │ ├── Spinner.jsx
- │ │ └── MovieCards.jsx
- │ ├── App.jsx
- │ ├── appwrite.js
- │ └── index.css
- │── public/
- │ ├── movie-image.jpg
- │ └── Poster_not_available.jpg
- │── .env
- │── package.json
- │── README.md

## 🔑 API Setup

- Get a free API key from TMDB
- Set up an Appwrite project with a database & collection:

  - Collection fields:

    - searchTerm (string)

    - count (number)

    - movie_id (string)

    - poster_url (string)

## ✨ Future Improvements

- 📌 Add pagination or infinite scroll

- 📌 Add favorites/bookmarks

- 📌 Improve accessibility

- 📌 Deploy to Vercel/Netlify
