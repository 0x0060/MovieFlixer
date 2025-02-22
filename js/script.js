const API_KEY = '';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

const SEARCH_API = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;
const DISCOVER_API = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;

const moviesContainer = document.getElementById('movies-container');
const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const floatingDescription = document.getElementById('floating-description');

async function fetchMovies(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function displayMovies(movies) {
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card', 'fade-in-on-scroll');

        const movieImage = document.createElement('img');
        movieImage.src = movie.poster_path ? IMG_PATH + movie.poster_path : 'https://via.placeholder.com/200x300';
        movieImage.alt = movie.title;

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie-info');
        movieInfo.innerHTML = `
            <h3>${movie.title}</h3>
        `;

        const playButton = document.createElement('button');
        playButton.classList.add('play-button');
        playButton.textContent = 'PLAY';
        playButton.onclick = () => playMovie(movie.id);

        movieCard.addEventListener('mouseenter', () => {
            const cardRect = movieCard.getBoundingClientRect();
            const descriptionWidth = 300;
            const viewportWidth = window.innerWidth;

            let leftPosition = cardRect.right + 10;
            if (leftPosition + descriptionWidth > viewportWidth) {
                leftPosition = cardRect.left - descriptionWidth - 10;
            }

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
            floatingDescription.style.left = `${leftPosition}px`;
            floatingDescription.style.top = `${cardRect.top}px`;
            floatingDescription.style.opacity = '1';
        });

        movieCard.addEventListener('mouseleave', () => {
            floatingDescription.style.opacity = '0';
        });

        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieInfo);
        movieCard.appendChild(playButton);
        moviesContainer.appendChild(movieCard);
    });

    observeFadeInElements();
}

function playMovie(movieId) {
    const streamingUrl = `https://multiembed.mov/?video_id=${movieId}&tmdb=1&api_key=6b4357c41d9c606e4d7ebe2f4a8850ea`;
    window.open(streamingUrl, '_blank');
}

searchButton.addEventListener('click', () => {
    const searchTerm = searchBar.value.trim();
    if (searchTerm) {
        fetchMovies(SEARCH_API + encodeURIComponent(searchTerm));
    } else {
        fetchMovies(DISCOVER_API);
    }
});

fetchMovies(DISCOVER_API);

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

    fadeInElements.forEach(element => {
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    searchBar.value = '';
    observeFadeInElements();
});

searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const searchTerm = searchBar.value.trim();
        if (searchTerm) {
            fetchMovies(SEARCH_API + encodeURIComponent(searchTerm));
        } else {
            fetchMovies(DISCOVER_API);
        }
    }
});
