const debounce = require('lodash.debounce');
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    allInfo: document.querySelector('.country-info'),
}

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY))


function countrySearch(e) {
    const name = refs.input.value.trim()
    if (!name) {
        return
    }

    fetchCountries(name)
        .then(renderCountries)
        .catch((error) =>
        Notify.failure("Oops, there is no country with that name"))
}

function renderCountries(countries) {
    clearSearch()
    if (countries.length > 10) {
        clearSearch();
        Notify.info("Too many matches found. Please enter a more specific name.")
    }
    else if (countries.length >= 2 && countries.length < 10) {
        renderCountriesList(countries)
    }
    else if (countries.length === 1) {
        renderCounryInfo (countries)
    }
}

function renderCountriesList (countries) {
  const markupList = countries
        .map(({name, flags}) => {
            return `<li class="country-list__item">
            <img class="country-item__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30><p class="country-item__name">${name.official}</p>
            </li>`
        }).join('')
        refs.list.innerHTML = markupList
        refs.allInfo.innerHTML = ''
}  

function renderCounryInfo (countries) {
    const markupInfo = countries
        .map(({ name, capital, population, flags, languages }) => {
            return `
            <h2 class="country-info__name"><img class="country-item__flag" src="${flags.svg}" alt="Flag of ${name.official}" width=40>${name.official}</h2>
        <ul class="country-info__list">
        <li class="country-info__item"><p><b>Capital:</b> ${capital}</p></li>
        <li class="country-info__item"><p><b>Population:</b> ${population}</p></li>
        <li class="country-info__item"><p><b>Languages:</b> ${Object.values(languages)}</p></li> 
        </ul>`
        }).join('')
        refs.allInfo.innerHTML = markupInfo
        refs.list.innerHTML=''
}

function clearSearch() {
    refs.list.innerHTML = '';
    refs.allInfo.innerHTML = ''
}
