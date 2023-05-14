import './css/styles.css';
import {fetchCountries} from "./fetchCountries"
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchInpit: document.querySelector("#search-box"),
    ulEl: document.querySelector(".country-list"),
    divInfoEl: document.querySelector(".country-info")
}

refs.searchInpit.addEventListener("input", debounce(OnInput, DEBOUNCE_DELAY))

// console.dir(refs.searchInpit.value);
function OnInput(event){
    event.preventDefault()
    const value = event.target.value.trim();
    if(value === ""){
        return
    }
   
    console.log(value);

    fetchCountries(value).then(renderCountryHTML).catch(err => console.log(err))
}

function renderCountryHTML(country){
   const countryRender = country.map(({name:{official},capital,population,flags:{svg},languages})=>{
    const lang = Object.values(languages).join(", ");
        return `
            <h1 class="title">${official}</h1>
            <p class="text">Capital: ${capital}</p>
            <p class="text">Population: ${population}</p>
            <p class="text">Languages: ${lang }</p>
            <img class="img" src = "${svg}" alt="${official}"/ width ="500" height ="350">
        `
    }).join(" ")
    refs.divInfoEl.insertAdjacentHTML("beforeend", countryRender)
}