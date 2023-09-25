'use strict';
/* 
It's not a big deal, it's really just one small change. Instead of:
https://restcountries.eu/rest/v2/
It's now:
https://countries-api-836d.onrender.com/countries/
*/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const baseUrl = 'https://restcountries.com/v2/';

const renderCountry = function(data, className = '') {
    const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
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
    //countriesContainer.style.opacity = 1;
}

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  //countriesContainer.style.opacity = 1;
};
///////////////////////////////////////

// Old school http requests
// Good to know, you might encounter this in older apps
/* 
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
 */
///
// Nested callbacks
/*
const getCountryAndNeighbour = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();
    
    request.addEventListener('load', function(){
        const [data] = JSON.parse(this.responseText);
        console.log(data);
        renderCountry(data);

        const [neighbur] = data.borders;

        console.log(neighbur)

        if (!neighbur) return;
    
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v2/alpha/${neighbur}`);
        request2.send();

        request2.addEventListener('load', function() {
           const data2 = JSON.parse(request2.responseText);
           console.log(data2)
           renderCountry(data2, 'neighbour')
        })

    });
}
    
getCountryAndNeighbour('sweden');


// Easaly becomes like something called "callback hell", trangel formatted code :-)
setTimeout(() => {
    console.log('1 second')
    setTimeout(() => {
        console.log('2 second')
        setTimeout(() => {
            console.log('3 second')
            setTimeout(() => {
                console.log('4 second')
                setTimeout(() => {
                    console.log('5 second')
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);
 */

// This is how we do http calls today; using promise
// let url = baseUrl + 'name/sweden';
// const request = fetch(url);
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`${baseUrl}/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// Error message helper method
// Returns Promise
const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(`${errorMessage} (${res.status})`);
    }
    return res.json();
  });
};

const getCountryData = function (country) {
  getJSON(`${baseUrl}name/${country}`, 'Country not found.')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      console.log(neighbour);
      if (!neighbour) return new Error('No neighbour found.');
      return getJSON(`${baseUrl}alpha/${neighbour}`, 'Neighbour not found.');
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong. ${err}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

/* 
const getCountryData = function (country) {
  fetch(`${baseUrl}name/${country}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Country not found.');
      }
      return res.json();
    })
    .then(data => {
      renderCountry(data[0]);
      // const neighbour = data[0].borders?.[0];
      const neighbour = 'blabla';

      return fetch(`${baseUrl}alpha/${neighbour}`);
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Neighbour not found.');
      }
      return res.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong. ${err}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
 */

btn.addEventListener('click', function () {
  getCountryData('australia');
});

//getCountryData('portugal');
//getCountryData('spain');
//getCountryData('mexico');
//getCountryData('france');
//getCountryData('denmark');
//getCountryData('finland');


