'use strict';
/* 
    It's not a big deal, it's really just one small change. Instead of:
    https://restcountries.eu/rest/v2/
    It's now:
    https://countries-api-836d.onrender.com/countries/
 */

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// Old school http requests
// Good to know, you might encounter xthis in older apps
const getCountryData = function (country) {
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v2/name/${country}`);
request.send();

request.addEventListener('load', function(){
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = `
        <article class="country">
            <img class="country__img" src="${data.flags.svg}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} mn people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
        </article>
        `;
    countriesContainer.insertAdjacentHTML('beforeEnd', html);
    countriesContainer.style.opacity = 1;
})
}

getCountryData('sweden');
getCountryData('portugal');
getCountryData('usa');

