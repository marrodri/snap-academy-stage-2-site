/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

/**
 * Instatiating the required variables.
 */

let movie_cards = [];
let searched_movie_cards = [];
let filtered_movie_cards = [];
let sorted_movie_cards = [];
let json_data = [];
let genre_filters = [];
let isGenreFilterActive = [];
let isSearchModeActive = false;
let isModalComponentActive = false;

/***
 * Setup and update data methods
 */

function update() {
  // shows the most recent cards.
  showCards(movie_cards);
  //updating the genres based on the front-end.
  updateGenreFilters();
}

// This function adds cards the page to display the data in the array
function showCards(movie_card_list) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  //select the .card element structure from html
  const templateCard = document.querySelector(".card");

  console.log("calling showCards method");
  movie_card_list.forEach((card) => {
    let id = card.id;
    let title = card.title;
    let imageURL = card.cover_image_url;
    let releaseYear = card.year;
    let genres = card.genres;
    let mainActors = card.main_actors;
    let director = card.director;
    console.log("printing the title: ", title);
    console.log("printing the image url: ", imageURL);

    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(
      nextCard,
      id,
      title,
      imageURL,
      releaseYear,
      genres,
      mainActors,
      director
    ); // Edit title and image on the cloned template card
    cardContainer.appendChild(nextCard); // Add new card to the container
  });
}

// edit the title and image of the card that is
// going to be displayed.
function editCardContent(
  card,
  id,
  newTitle,
  newImageURL,
  newReleaseYear,
  newGenres,
  newMainActors,
  newDirector
) {
  //set the display for the card
  card.style.display = "block";
  // set the id for the card,
  // for fetching the right data when interacting in the front-end site
  card.id = id;
  card.addEventListener("click", () => {
    onClickMovieCard(id);
  });
  // set the title for the card
  const cardHeader = card.querySelector("#title");
  cardHeader.textContent = newTitle;

  //set the image in the card
  const cardImage = card.querySelector("img");
  cardImage.src = newImageURL;
  cardImage.alt = newTitle + " Poster";

  //set the release year
  const cardYear = card.querySelector("#year");
  cardYear.textContent = newReleaseYear;

  //set the director
  const cardDirector = card.querySelector("#director");
  cardDirector.textContent = newDirector;

  //set the actors
  const cardActor1 = card.querySelector("#actor1");
  cardActor1.textContent = newMainActors[0];
  const cardActor2 = card.querySelector("#actor2");
  cardActor2.textContent = newMainActors[1];

  //set the genres, if there's any genre added.
  console.log("setting the genres: ", newGenres);
  const cardGenres = card.querySelector("#genres");
  newGenres.forEach((genre, i) => {
    //creating our new genre element for front-end
    const newGenre = document.createElement("span");
    newGenre.className = "card-text";
    newGenre.textContent = genre + (i == newGenres.length - 1 ? " " : ", ");
    cardGenres.appendChild(newGenre);
  });

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", newTitle, "- html: ", card);
}

async function init() {
  // fetching json data from the data.json local file
  // await first, before moving to the next step.
  await fetch("data.json")
    .then((response) => response.json())
    .then((json) => (json_data = json));

  console.log("setting the fetched data to an array of objects");

  for (let i = 0; i < json_data.length; i++) {
    // creating an object for each movie card
    // and pushing it to the movie_cards array
    let movie_card = {
      id: i,
      title: json_data[i].title,
      cover_image_url: json_data[i].cover_image_url,
      director: json_data[i].director,
      year: json_data[i].year,
      genres: json_data[i].genres,
      main_actors: json_data[i].main_actors,
      movie_trailer_url: json_data[i].movie_trailer_url,
    };
    //pushing the new created movie card object
    //to our list of movie cards.
    console.log("new movie card:" + movie_card);
    movie_cards.push(movie_card);
  }
  //checking for one movie card.
  console.log("Finished seting up the cards\n");
}

// calling our initialization method and display cards, once the page is loaded.
document.addEventListener("DOMContentLoaded", async () => {
  await init();
  update();
});

/**
 ** modal component features
 */
function onClickMovieCard(id){
  // const 
  // const cardId = e.target;
  console.log("clicking the movie card. "+id);
  const modalContainer = document.querySelector(".modal-container");
  const movieTrailerFrame = document.querySelector("#movie-trailer-frame");
  modalContainer.style.display = "flex";
  console.log("setting the video of movie:"+movie_cards[id].title);
  console.log("url of movie:"+movie_cards[id].movie_trailer_url);
  movieTrailerFrame.src = movie_cards[id].movie_trailer_url;




  
}
function onCloseModal(){
  console.log("closing modal");
  const modalContainer = document.querySelector(".modal-container");
  const movieTrailerFrame = document.querySelector("#movie-trailer-frame");
  modalContainer.style.display = "none";
  movieTrailerFrame.src = "";

}

/***
 * Filter methods
 */

function onClickFilterButton(e) {
  filtered_movie_cards = [];
  isGenreFilterActive[e.target.id] != isGenreFilterActive[e.target.id];

  // in case the "clear filter" button is clicked,
  //go back to its original database.
  if (e.target.textContent == "Clear Filter") {
    showCards(movie_cards);
  } else {
    //otherwise, filter and display the movie cards
    // with the desired genre.
    movie_cards.forEach((card) => {
      console.log(card);
      if (card.genres.includes(e.target.textContent)) {
        filtered_movie_cards.push(card);
      }
    });
    showCards(filtered_movie_cards);
  }
}

function updateGenreFilters() {
  // getting the filter-options element from html
  const filterOptions = document.querySelector("#filter-options");
  let newGenreFilterTogglers = [];
  // getting the available genres from the movie cards
  movie_cards.forEach((card) => {
    card.genres.forEach((genre) => {
      if (!genre_filters.includes(genre)) {
        genre_filters.push(genre);
      }
    });
  });
  console.log("genres filtered setup");
  console.log(genre_filters);

  isGenreFilterActive = newGenreFilterTogglers;

  // create the filter options buttons and
  // place them on the filter-options element.
  genre_filters.forEach((genre, i) => {
    if (genre != "") {
      const newButton = document.createElement("button");
      // create button element.
      newButton.textContent = genre;
      newButton.id = i;
      newButton.addEventListener("click", (e) => {
        onClickFilterButton(e);
      });
      console.log(newButton);
      // add the genre value to the button
      filterOptions.appendChild(newButton);
      newGenreFilterTogglers.push(false);
    }
  });
  //push a "clear filter" button.
  const newButton = document.createElement("button");
  newButton.textContent = "Clear Filter";
  newButton.id = genre_filters.length;
  newButton.addEventListener("click", (e) => {
    onClickFilterButton(e);
  });
  filterOptions.appendChild(newButton);
  newGenreFilterTogglers.push(false);
  isGenreFilterActive = newGenreFilterTogglers;
}

/***
 * sorting methods
 */
function sortBy(e) {
  const sortOption = e.textContent;

  if (filtered_movie_cards.length === 0) {
    filtered_movie_cards = movie_cards;
  }
  switch (sortOption) {
    case "title (a-z)":
      filtered_movie_cards.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title (z-a)":
      filtered_movie_cards.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "director (a-z)":
      filtered_movie_cards.sort((a, b) => a.director.localeCompare(b.director));
      break;
    case "director (z-a)":
      filtered_movie_cards.sort((a, b) => b.director.localeCompare(a.director));
      break;
    case "year (oldest)":
      filtered_movie_cards.sort((a, b) => a.year - b.year);
      break;
    case "year (newest)":
      filtered_movie_cards.sort((a, b) => b.year - a.year);
      break;
    default:
      alert("Invalid order");
      console.error("Invalid order");
  }
  showCards(filtered_movie_cards);
}

/**
 * Search methods
 **/

function searchData(value) {
  // if there's an empty input,
  // display the original data.
  if (value === "") {
    showCards(movie_cards);
    isSearchModeActive = false;
  } else {
    // otherwise, iterate through the movie cards
    // that fits with the entered input.
    isSearchModeActive = true;
    searched_movie_cards = [];
    value = value.toLowerCase();
    movie_cards.forEach((card) => {
      if (
        card.title.toLowerCase().includes(value) ||
        card.director.toLowerCase().includes(value) ||
        card.main_actors[0].toLowerCase().includes(value) ||
        card.main_actors[1].toLowerCase().includes(value)
      ) {
        searched_movie_cards.push(card);
      }
    });

    showCards(searched_movie_cards);
  }
}

/***
 * Form methods
 */

function addNewCard() {
  //get the information from the form
  let form = document.getElementById("card-creator-form");

  // fetching the elements from the form
  let title = form.elements["title"];
  let cover_image_url = form.elements["cover_image_url"];

  let year = form.elements["year"];
  let director = form.elements["director"];
  let actor1 = form.elements["actor1"];
  let actor2 = form.elements["actor2"];
  let genre1 = form.elements["genre1"];
  let genre2 = form.elements["genre2"];
  let genre3 = form.elements["genre3"];
  let movie_trailer_url = form.elements["movie_trailer_url"];

  // create the new card from the data inputed in the form.
  movie_cards.push({
    id: movie_cards.length,
    title: title.value,
    cover_image_url: cover_image_url.value,
    director: director.value,
    year: year.value,
    genres: [genre1.value, genre2.value, genre3.value],
    main_actors: [actor1.value, actor2.value],
    movie_trailer_url: movie_trailer_url.value,
  });
  update();

  // clear the data from the form.
  title.value = "";
  cover_image_url.value = "";
  year.value = "";
  director.value = "";
  actor1.value = "";
  actor2.value = "";
  genre1.value = "";
  genre2.value = "";
  genre3.value = "";
  movie_trailer_url.value = "";
}

function removeLastCard() {
  movie_cards.pop(); // Remove last item in titles array
  update(); // Call update again to refresh cards and genres
}
