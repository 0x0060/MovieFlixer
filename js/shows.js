const API_KEY = '';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

const SEARCH_API = `${BASE_URL}/search/tv?api_key=${API_KEY}&include_adult=true&language=en-US&page=1&query=`;
const DISCOVER_API = `${BASE_URL}/discover/tv?api_key=${API_KEY}&include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`;

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
        console.error('Error fetching TV shows:', error);
    }
}

function displayMovies(tvShows) {
    moviesContainer.innerHTML = '';

    tvShows.forEach(tvShow => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card', 'fade-in-on-scroll');

        const tvShowImage = document.createElement('img');
        tvShowImage.src = tvShow.poster_path ? IMG_PATH + tvShow.poster_path : 'https://via.placeholder.com/200x300';
        tvShowImage.alt = tvShow.name;

        const tvShowInfo = document.createElement('div');
        tvShowInfo.classList.add('movie-info');
        tvShowInfo.innerHTML = `
            <h3>${tvShow.name}</h3>`;

        const playButton = document.createElement('button');
        playButton.classList.add('play-button');
        playButton.textContent = 'PLAY';
        playButton.onclick = () => playTVShow(tvShow.id);

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
                    <strong>${tvShow.name}</strong><br>
                    <hr>
                    <strong>Rating:</strong> ${tvShow.vote_average}<br>
                                        <hr>
                    <strong>First Air Date:</strong> ${tvShow.first_air_date}<br>
                    
                    ${tvShow.overview || 'No overview available.'}
                </p>
            `;
            floatingDescription.style.left = `${leftPosition}px`;
            floatingDescription.style.top = `${cardRect.top}px`;
            floatingDescription.style.opacity = '1';
        });

        movieCard.addEventListener('mouseleave', () => {
            floatingDescription.style.opacity = '0';
        });

        movieCard.appendChild(tvShowImage);
        movieCard.appendChild(tvShowInfo);
        movieCard.appendChild(playButton);
        moviesContainer.appendChild(movieCard);
    });

    observeFadeInElements();
}

function playTVShow(tvShowId) {
    const streamingUrl = `https://multiembed.mov/?video_id=${tvShowId}&tmdb=1`;
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
