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
          <p>Capital: </p>
            <ul>
              { country.capital.map((capital) => <li key={capital}>{capital}</li>)}
            </ul>
          <p>Area: {country.area}</p>

          <h3>Langauges</h3>
          <ul>
            {
                Object.values(country.languages).map((language) => <li key={language}> {language} </li>)
            }
          </ul>
          <img src={country.flags.png} alt={`flag of ${country.name.common}`}/>
        </div>
    );
};

const App = () => {

    const [country, setCountry] = useState('');
    const [responseToInput, setResponseToInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [allCountries, setAllCountries] = useState([]);

    const handleCountryInputChange = (e) => {
        setCountry(e.target.value);

        // if the country data isn't done loading yet
        if(!allCountries.length) return;

        const searchResult = handleSearch(e.target.value);
        if(searchResult.length > 10 && !(country.length === 0) ) setResponseToInput('Too many matches, specify another filter');
        if(searchResult.length < 10) setResponseToInput('');
        
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
                <Country country={searchResult[0]}/>
            );
        };
        return (
            <p>No results</p>
        );
    };
    useEffect( () => {
        axios.get('https:restcountries.com/v3.1/all')
            .then((res)=>{
                setAllCountries(res.data);
                console.log('ready for use');
            });
    }, []);

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
