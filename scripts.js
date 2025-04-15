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
let json_data = [];
let filters = [];

/***
 * website methods
 */

// This function adds cards the page to display the data in the array
function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  //select the .card element structure from html
  const templateCard = document.querySelector(".card");

  console.log("calling showCards method");
  //   movie_cards.length
  for (let i = 0; i < 10; i++) {
    let id = movie_cards[i].id;
    let card = movie_cards[i];
    console.log(card);
    let title = card.title;
    let imageURL = card.cover_image_url;
    let releaseYear = card.year;
    let genres = card.genres;
    let mainActors = card.main_actors;
    let director = card.director;
    console.log("printing the title: ", title);
    console.log("printing the image url: ", imageURL);

    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard,id, title, imageURL, releaseYear, 
        genres, mainActors, director); // Edit title and image on the cloned template card
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

// edit the title and image of the card that is
// going to be displayed.
function editCardContent(card, id, newTitle, newImageURL, newReleaseYear, newGenres, newMainActors, newDirector) {
    //set the display for the card
    card.style.display = "block";
    // set the id for the card, 
    // for fetching the right data when interacting in the front-end site
    card.id = id; 

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
    newGenres.forEach((genre,i )=> {
        //creating our new genre element for front-end
        const newGenre = document.createElement("span");
        newGenre.className="card-text";
        newGenre.textContent = (genre+(i == newGenres.length-1? " " : ", "));
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
  showCards();
});

function filterCards(){
  // we will filter the cards based on the 
  //selected genre.
  //we will iterate each card, where we will 
  // check their genres. 
  // if a card doesn't have the genres, we will set that to invisible.
  
  //otherwise, we just skip that card.
}

function sortCardsAlphabetically(){
  // sort cards alphabetically,
  // if by title or by director.
}

function sortCardsByYear(){
  // sort the cards by year
}

function searchData(){
  console.log("searching for data");
  // when the keyboard is pressed.
  //we will filter out the data.
  //first we set the state to search.
  //on the search state, just use the temporary array 
  // that is filtered, based on the search input.
  //otherwise, if the search state is empty; go back to the original data. 
}

function addNewCard(){
  console.log("adding new card");
  // todo get the information from the form
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
  let video_url = form.elements["video_url"];

  
  // create the new card from the data inputed in the form.
  movie_cards.push({
    id: movie_cards.length,
    title: title.value,
    cover_image_url: cover_image_url.value,
    director: director.value,
    year: year.value,
    genres: [genre1.value, genre2.value, genre3.value], 
    main_actors: [actor1.value, actor2.value],
    video_url: video_url.value,
  })
  showCards(); 

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
  video_url.value = "";
  
}

function removeLastCard() {
  movie_cards.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
}
