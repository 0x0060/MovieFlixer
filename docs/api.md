# API Documentation

## TMDB API Integration

### Base Configuration
```javascript
const API_KEY = 'your_api_key';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
```

### Available Endpoints

#### Search Movies
- **Endpoint**: `/search/movie`
- **Method**: GET
- **Parameters**:
  - `api_key`: Your TMDB API key
  - `query`: Search term
- **Usage**:
```javascript
const SEARCH_API = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;
```

#### Discover Movies
- **Endpoint**: `/discover/movie`
- **Method**: GET
- **Parameters**:
  - `api_key`: Your TMDB API key
  - `sort_by`: Sorting criteria (e.g., popularity.desc)
- **Usage**:
```javascript
const DISCOVER_API = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
```

### Response Format

#### Movie Object Structure
```javascript
{
    id: number,
    title: string,
    overview: string,
    poster_path: string,
    release_date: string,
    vote_average: number
}
```

### Image URLs
Movie posters can be accessed using the following format:
```javascript
const posterUrl = IMG_PATH + movie.poster_path;
```

### Error Handling
```javascript
try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
} catch (error) {
    console.error('Error fetching movies:', error);
}
```

## Streaming Integration

### Movie Playback
```javascript
function playMovie(movieId) {
    const streamingUrl = `https://multiembed.mov/?video_id=${movieId}&tmdb=1`;
    window.open(streamingUrl, '_blank');
}
```
