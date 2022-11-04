import './css/styles.css';
import { fetchCountries } from './fetchCountries';
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
}

// function onError() { 
//     Notiflix.Notify.failure('Oops, there is no country with that name.'); 
// }
