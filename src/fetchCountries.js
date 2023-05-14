const URL = "https://restcountries.com/v3.1/name/";
export const fetchCountries = (country) => {
    return fetch(`${URL}${country}`).then(res => res.json())
}
