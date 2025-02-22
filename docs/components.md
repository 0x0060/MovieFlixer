# Components Documentation

## Movie Card Component

### Structure
The movie card is the primary display component for each movie entry. It consists of:

- Poster Image
- Title
- Play Button
- Floating Description (on hover)

### Implementation
```javascript
const movieCard = document.createElement('div');
movieCard.classList.add('movie-card', 'fade-in-on-scroll');
```

### Features
1. **Fade-in Animation**
   - Triggered on scroll
   - Smooth opacity transition
   - Uses Intersection Observer API

2. **Hover Description**
   - Shows detailed movie information
   - Dynamic positioning based on viewport
   - Smooth fade in/out transitions

3. **Play Button**
   - Direct streaming link
   - Click handler for movie playback

## Search Component

### Structure
- Search input field
- Search button with icon
- Real-time results update

### Features
1. **Input Handling**
   - Debounced search
   - Enter key support
   - Empty query handling

2. **Results Display**
   - Dynamic grid layout
   - Responsive design
   - Smooth transitions

## Header Component

### Structure
- Logo
- Navigation menu
- Mobile-responsive hamburger menu

### Features
1. **Navigation**
   - Home link
   - Movies section
   - External links (GitHub)

2. **Responsive Design**
   - Collapsible menu on mobile
   - Smooth transitions
   - Accessible navigation

## Floating Description Component

### Structure
```javascript
floatingDescription.innerHTML = `
    <p>
        <strong>${movie.title}</strong><br>
        <hr>
        <strong>Rating:</strong> ${movie.vote_average}<br>
        <hr>
        <strong>Release Date:</strong> ${movie.release_date}<br>
        <hr>
        ${movie.overview || 'No overview available.'}
    </p>
`;
```

### Features
1. **Dynamic Positioning**
   - Viewport-aware placement
   - Overflow handling
   - Smooth transitions

2. **Content Display**
   - Movie title
   - Rating
   - Release date
   - Overview
   - Fallback handling for missing data

## Animation System

### Fade-in Animation
```javascript
function observeFadeInElements() {
    const fadeInElements = document.querySelectorAll('.fade-in-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
}
```

### Features
1. **Scroll-based Triggers**
   - Intersection Observer implementation
   - Performance optimization
   - Smooth transitions

2. **Reusable Classes**
   - `fade-in-on-scroll`
   - `fade-in`
   - CSS transitions
