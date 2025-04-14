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
 * Predefined data from template; delete this later.
 */
const FRESH_PRINCE_URL =
  "https://upload.wikimedia.org/wikipedia/en/3/33/Fresh_Prince_S1_DVD.jpg";
const CURB_POSTER_URL =
  "https://m.media-amazon.com/images/M/MV5BZDY1ZGM4OGItMWMyNS00MDAyLWE2Y2MtZTFhMTU0MGI5ZDFlXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg";
const EAST_LOS_HIGH_POSTER_URL =
  "https://static.wikia.nocookie.net/hulu/images/6/64/East_Los_High.jpg";

// This is an array of strings (TV show titles)
let titles = [
  "Fresh Prince of Bel Air",
  "Curb Your Enthusiasm",
  "East Los High",
];

// TODO:
/**
* 2.- show the parsed cards to the front end
* 3.- create a quick form that you can add a new movie.
* 4.- create header and footer for better accessibility and sidebar.
* 5.- create a search bar to filter the movies(this should be on the header).
* 6.- a sidebar with filter options.

*/

// parser (parse the collected data to an array of objects.)

let movie_cards = [];
let json_data = [];



// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// This function adds cards the page to display the data in the array
function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  //select the .card element structure from html
  const templateCard = document.querySelector(".card");

  console.log("calling showCards method");
  //   movie_cards.length
  for (let i = 0; i < 10; i++) {
    let card = movie_cards[i];
    console.log(card)
    let title = card.title;
    let imageURL = card.cover_photo;
    console.log("printing the title: ", title);
    console.log("printing the image url: ", imageURL);

    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, title, imageURL); // Edit title and image on the cloned template card
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
  //   for (let i = 0; i < titles.length; i++) {
  //     let title = titles[i];

  //     // This part of the code doesn't scale very well! After you add your
  //     // own data, you'll need to do something totally different here.
  //     let imageURL = "";
  //     if (i == 0) {
  //       imageURL = FRESH_PRINCE_URL;
  //     } else if (i == 1) {
  //       imageURL = CURB_POSTER_URL;
  //     } else if (i == 2) {
  //       imageURL = EAST_LOS_HIGH_POSTER_URL;
  //     }

  //     const nextCard = templateCard.cloneNode(true); // Copy the template card
  //     editCardContent(nextCard, title, imageURL); // Edit title and image
  //     cardContainer.appendChild(nextCard); // Add new card to the container
  //   }
}

// edit the title and image of the card that is
// going to be displayed.

function editCardContent(card, newTitle, newImageURL) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newTitle;

  const cardImage = card.querySelector("img");
  cardImage.src = newImageURL;
  cardImage.alt = newTitle + " Poster";

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
        title: json_data[i].title,
        cover_image: json_data[i].cover_image,
        director: json_data[i].director,
        year: json_data[i].year,
        genres: json_data[i].genres,
        main_actors: json_data[i].main_actors,
      };
      //pushing the new created movie card object
      //to our list of movie cards.
      console.log("new movie card:"+movie_card);
      movie_cards.push(movie_card);
    }
    //checking for one movie card.
    console.log(movie_cards[0]);
}

// This calls the addCards() function when the page is first loaded

document.addEventListener("DOMContentLoaded", async()=>{
    await init();
    showCards();
});


function quoteAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
  );
}

// dummy method, we will have to clean it.
function removeLastCard() {
  // titles.pop(); // Remove last item in titles array
  // showCards(); // Call showCards again to refresh
  console.log("Button Clicked YEET!");
  console.log(json_data);
}

//   initializing methods
// init();
