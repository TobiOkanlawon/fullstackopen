import {useState, useEffect} from 'react';
import axios from 'axios';

const Search = ({country, handleCountryInputChange, responseToInput}) => {
    return (
        <div>
          <p>find countries: 
            <input
              value={country}
              onChange={handleCountryInputChange} />
            
          </p>
          {responseToInput}
        </div>
    );
};

const Countries = ({countries}) => {
    return (
        <div>
          <ul>
            {countries.map( ({name}) => <li key={name.common}>{name.common}</li> )}
          </ul>
        </div>
    );
};

const Country = ({country}) => {
    return (
        <div>
          {console.log(country)}
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>

          <h3>Langauges</h3>
          <ul>
            {country.languages.map((language) => <li key={language.name}> {language.name} </li>)}
              </ul>
        </div>
    );
};

const App = () => {

    const [country, setCountry] = useState('');
    const [responseToInput, setResponseToInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [allCountries, setAllCountries] = useState([
        {name: {common: 'Nigeria'}}, {name: {common: 'Niger'}}, {name: {common: 'Spain'}}
    ]);

    const handleCountryInputChange = (e) => {
        setCountry(e.target.value);

        const searchResult = handleSearch(e.target.value);
        if(searchResult.length > 10) setResponseToInput('Too many matches, specify another filter');
        
        setSearchResult(searchResult);
    };

    const handleSearch = (query) => {
        if(!!allCountries){
            return allCountries.filter(
                ({name}) => name.common
                    .toLowerCase()
                    .startsWith(
                        query.toLowerCase()
                    )
            );
        }
        return false;
    };

    const renderResult = () => {
        if(searchResult.length < 10 && searchResult.length > 1 && country.length > 0){
            return (
                <Countries countries={searchResult} />
            );
        }
        else if(searchResult.length === 1) {
            return (
                <Country country={searchResult}/>
            );
        };
        return (
            <p>No results</p>
        );
    };
    // useEffect( () => {
    //     axios.get('https://restcountries.com/v3.1/all')
    //         .then((res)=>{
    //             setAllCountries(res.data);
    //         });
    // }, []);

    return (
        <div>
          <Search
            country={country}
            handleCountryInputChange={handleCountryInputChange}
            responseToInput={responseToInput}
          />
          <div>
            {renderResult()}
          </div>
        </div>
    );
};

export default App;
