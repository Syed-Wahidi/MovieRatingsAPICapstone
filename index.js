'use strict';


const searchURL = 'https://api.themoviedb.org/3/movie/popular';
const searchURL2 = 'https://www.omdbapi.com/';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the array, stopping at the max number of results
  for (let i = 0; i < responseJson.results.length & i<maxResults ; i++){
    
    $('#results-list').append(
      `<li>
      <h2>${responseJson.results[i].title}</h2>
      <p>${responseJson.results[i].overview}</p>
     
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};
function displayResults2(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#rating-list').empty();
  // iterate through the array, stopping at the max number of results
  for (let i = 0; i < responseJson["Ratings"].length  ; i++){
    
    $('#rating-list').append(
      `<li>
      <h2>${responseJson["Ratings"][i]["Source"]}</h2>
      <h2>${responseJson["Ratings"][i]["Value"]}</h2>
      
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};
function getMovies(maxResults=10) {
  const params = {
    //stateCode: query,
    page: maxResults,
    api_key : "667cbaed1ae53ee48bfecbafa932beab"
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

 
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults));
   
}
function getRatings(searchResults) {
  const params = {
    //stateCode: query,
    t: searchResults,
    apikey : "e1ae2afc"
  };
  const queryString = formatQueryParams(params)
  const url2 = searchURL2 + '?' + queryString;

  console.log(url2);

 
  fetch(url2)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults2(responseJson));
  
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
   // const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    const searchResults = $('#js-searchResults').val();
    getMovies( maxResults);
    getRatings(searchResults);
  });
}

$(watchForm);