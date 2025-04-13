

// TODO:
/**
* 1.- bring the json data to the javscript server
* 2.- show the parsed cards to the front end
* 3.- create a quick form that you can add a new movie.
* 4.- create header and footer for better accessibility and sidebar.
* 5.- create a search bar to filter the movies(this should be on the header).
* 6.- a sidebar with filter options.

*/

// parser (parse the collected data to an array of objects.)

let movie_cards = []
let json_data = []

async function init() {
    // fetching json data from the data.json local file
    // await first, before moving to the next step.
    await fetch('data.json')
    .then((response) => response.json())
    .then((json) => (json_data = json));

    for (let i = 0; i < json_data.length; i++) {
        // creating an object for each movie card
        // and pushing it to the movie_cards array
        let movie_card = {
            title: json_data[i].title,
            cover_photo: json_data[i].cover_photo,
            synopsis: json_data[i].synopsis,
            year: json_data[i].year,
            genres: json_data[i].genres,
            actors: json_data[i].actors
        }
        //pushing the new created movie card object
        //to our list of movie cards.
        movie_cards.push(movie_card);
    }
    //checking for one movie card.
    console.log(movie_cards[0]);
}

// This function adds cards the page to display the data in the array
function showCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");
  
    for (let i = 0; i < titles.length; i++) {
      let title = titles[i];
  
      // This part of the code doesn't scale very well! After you add your
      // own data, you'll need to do something totally different here.
      let imageURL = "";
      if (i == 0) {
        imageURL = FRESH_PRINCE_URL;
      } else if (i == 1) {
        imageURL = CURB_POSTER_URL;
      } else if (i == 2) {
        imageURL = EAST_LOS_HIGH_POSTER_URL;
      }
  
      const nextCard = templateCard.cloneNode(true); // Copy the template card
      editCardContent(nextCard, title, imageURL); // Edit title and image
      cardContainer.appendChild(nextCard); // Add new card to the container
    }
  }

// dummy method, we will have to clean it.
function removeLastCard() {
    // titles.pop(); // Remove last item in titles array
    // showCards(); // Call showCards again to refresh
    console.log("Button Clicked YEET!");
    console.log(json_data)
  }


//   initializing methods
init();
  