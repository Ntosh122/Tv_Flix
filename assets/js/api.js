'use strict'

const api_key = 'a38e2578ceb20163fb6d9f3a46b1c994'
const imageBaseUrl = 'http://image.tmdb.org/t/p/';

// Fetch data from a server using url  & passes the result in JSON data to a callback function

const fetchDataFromServer = function(url, callback, optionalParam){
    fetch(url)
    .then(response => response.json())
    .then(data=>callback(data, optionalParam))
}

export{
    imageBaseUrl, api_key, fetchDataFromServer
};
