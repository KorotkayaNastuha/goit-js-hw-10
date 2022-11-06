import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function onInput(event) {
    event.preventDefault();
    const name = input.value.trim()
    if (name === '') {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return;
    }
    console.log(name);
    fetchCountries(name)
    .then(choiceCountry)
    .catch(onError)
    
}
function choiceCountry(countries) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    if (countries.lenght > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } if (countries.lenght >= 2 && countries.lenght <= 10) {
        const list = countries.map(({ flags, name }) => {
             return `<li class="country-list__item"><img src="${flags.svg}" alt="" width="50" height="50"></li>`
        }).join('');
      countryList.innerHTML = list;
     } if (countries.lenght === 1) {
        const markup = countries.map(({ flags, name, capital, population, languages }) => {
            return `<div><img src="${flags.svg}" alt = "${name.official}" width="70" height="50"><h2>${name.official}</h2>
            <p>Capital: ${capital}</p><p>Population: ${population}</p><p>Languages: ${Object.values(languages)}</p></div>`
        }).join('');
        countryInfo.innerHTML = markup;
        }
    }
function onError() { 
    Notiflix.Notify.failure('Oops, there is no country with that name.'); 
}
