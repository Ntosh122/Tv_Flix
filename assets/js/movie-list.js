'use strict'

import { api_key, fetchDataFromServer } from "./api.js"
import { createMovieCard } from "./movie-card.js"
import { sidebar } from "./sidebar.js"
import { search } from "./search.js"

let pageNumber = Math.floor(Math.random() *200) +1
let totalPages = 30
let currentPage = pageNumber


// collecting genre name
const genreName = window.localStorage.getItem("genreName")
const urlParam = window.localStorage.getItem("urlParam")
const pageContent = document.querySelector("[page-content]")



sidebar();


fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, function({results: movieList, total_pages}){
    totalPages = total_pages

    document.title=`${genreName} Movies - TvFlix`

    const movieListElem = document.createElement("section")
    movieListElem.classList.add("movie-list","genre-list")
    movieListElem.ariaLabel = `${genreName} Movies`


    movieListElem.innerHTML = `
    <div class="title-wrapper">
    <h1 class="heading">All ${genreName} Movies</h1>
    </div>
    <div class="grid-list">
    </div>
    
    `

    // add movie card on fetched item

    for(const movie of movieList){
        const movieCard = createMovieCard(movie)

        movieListElem.querySelector(".grid-list").appendChild(movieCard)
    }
    pageContent.appendChild(movieListElem)
   
})
search();
// load more functionality
document.querySelector("[data-load-more]").addEventListener("click", ()=>{
    if(currentPage >= totalPages){
        this.style.display = "none"
        return;
    }

    currentPage++
    this.classList.add("loading");
    fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, ({results: movieList})=>{
        this.classList.remove("loading")

        for(const movie of movieList){
            const movieCard = createMovieCard(movie)
            movieListElem.querySelector(".grid-list").appendChild(movieCard)
        }
    })
    
})