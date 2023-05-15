import './css/styles.css';
import {fetchCountries} from "./fetchCountries"
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

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
        refs.ulEl.innerHTML="";
        refs.divInfoEl.innerHTML="";
        return Notify.warning('Empty field. Type the country name!');
        
    }
   
    // console.log(value);

    fetchCountries(value)
        .then(res => {
            if(res.length > 1){
                renderListCountries(res)
                // Notify.info('Too many matches found. Please enter a more specific name.');
                refs.divInfoEl.textContent=""
            }else{
                renderCountryHTML(res)
                res.forEach(({name:{official}}) => {Notify.success(`${official}`)});
                refs.ulEl.textContent =""
            }
        })
        .catch(err => Notify.failure("Oops, there is no country with that name"))
}
function renderListCountries(countryList){
    const countryItemRender = countryList.map(({name:{official},flags:{svg}})=>{
        return`
        <li class="item">
            <h2 class="title">
                <img class="img" src = "${svg}" alt="${official}"/ width ="40" height ="30">${official}
            </h2>
        </li>
       `
    })
    const renderCountry = countryItemRender.join("");

    console.log(countryItemRender.length);
    if(countryItemRender.length < 10){
        refs.ulEl.insertAdjacentHTML("beforeend", renderCountry)
        console.dir()
    }else {
        Notify.info('Too many matches found. Please enter a more specific name.');
    }
}

function renderCountryHTML(country){
 
   const countryRender = country.map(({name:{official},capital,population,flags:{svg},languages})=>{
    const lang = Object.values(languages).join(", ");
        return `
            <h1 class="title">
                <img class="img" src = "${svg}" alt="${official}"/ width ="40" height ="30">${official}
            </h1>
            <p class="text">Capital: ${capital}</p>
            <p class="text">Population: ${population}</p>
            <p class="text">Languages: ${lang }</p>
            <img class="img" src = "${svg}" alt="${official}"/ width ="500" height ="350">
        `
    }).join(" ")
    refs.divInfoEl.insertAdjacentHTML("beforeend", countryRender)
}