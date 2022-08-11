const BASE_URL = 'https://restcountries.com/v3.1/name/';
const fields = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
    if (name) {
        return fetch(`${BASE_URL}${name}?${fields}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } throw new Error(response.status);
            }).catch(error => {
                console.error('Error:', error);
            })
    }
}
