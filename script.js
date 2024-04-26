const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const mainEl = document.querySelector("main");
const formEl = document.querySelector("form");
const searchEl = document.querySelector(".search");

//initially get favorite movies
getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  respData = await resp.json();
  console.log(respData);
  showMovies(respData.results);
 }

function showMovies(movies){
  //clear main
  mainEl.innerHTML = ``;
  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img src="${IMGPATH + movie.poster_path}" alt="">
    <div class="movie-info">
        <h3>${movie.title}</h3>
        <span class="${getClassByRate(movie.vote_average)}">${
      movie.vote_average
    }</span>
    </div>
    <div class="overview">
    ${movie.overview}
    </div>
    `;
    mainEl.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchEl.value;
 if (searchTerm){
getMovies(SEARCHAPI + searchTerm);
 search.value = '';
 }
});
