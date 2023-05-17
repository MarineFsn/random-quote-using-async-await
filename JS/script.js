//Définition des éléments:

const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote-btn");

//Fonction Async, envoyer une requete à l'API et récupérer les citations:

async function fetchQuote() {
  return fetch("https://thatsthespir.it/api")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching quote" + response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching quote:", error);
      throw error;
    });
}

//Fonction Async, générer une nouvelle citation:
async function generateQuote() {
  fetchQuote()
    .then((quoteData) => {
      displayQuote(quoteData);

      //console.log(quoteData);
    })
    .catch((error) => {
      quoteElement.textContent = "Failed to fetch quote, Please try again!";
      authorElement.textContent = "";
    });
}

//Display la citation:
function displayQuote(quoteData) {
  quoteElement.textContent = quoteData.quote;
  authorElement.textContent = quoteData.author;
  document.getElementById("quote-image").src = quoteData.photo;
}

//Ecouteur d'évenement:
newQuoteButton.addEventListener("click", generateQuote);
