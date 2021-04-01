import React, { useState } from 'react';
import moment from 'moment';

function dates() {
  return moment().format('MMMM Do YYYY');
}

function time() {
  return moment().format('LT');
}

function App() {
  
  const [country, setCountry] = useState('');
  const [data, setData] = useState('');

  const search = evt => {
    if (evt.key === 'Enter'){
      fetch(`https://disease.sh/v3/covid-19/countries/${country}?yesterday=true&strict=true&query`)
      .then (res => res.json())
      .then (result => {
        setData(result);  
        setCountry('');
        console.log(result);
      });
    }
  }

  function clickEvent () {
    fetch(`https://disease.sh/v3/covid-19/all`)
    .then (res => res.json())
    .then (result => {
      setData(result);  
      setCountry('');
      console.log(result);
    });
  }

  return (
    <main>
      <div className = "nav"> 
        <div className = "logo"><img alt = "COVID-19 Tracker" width = "160px" height = "50px" src = 'covid19trackerlogo.png'/></div>
        <div className = "searchBar">
          <input 
            className = "searchBox"
            placeholder = "Enter a country to view their COVID-19 statistics"
            onChange = {e => setCountry(e.target.value)}
            value = {country}
            onKeyPress = {search}
          />
          
          <button className = "btn btn-dark" onClick={clickEvent}> Global </button> 

        </div>
      </div>

       {(typeof data.country != "undefined" ) ? (
        <div className = "statBox"> 
          <div className = "flag"> <img alt = "country flag" width = "250px" height = "125px" src = {data.countryInfo.flag}/></div>
          <div className = "col card">{data.country}</div>
          <div className = "col card"> As of {dates()} at {time()}</div>
          <div className = "col card">Total cases: {data.cases}</div>
          <div className = "col card">Active cases: {data.active}</div>
          <div className = "col card">Current critical cases: {data.critical}</div>
          <div className = "col card">Total deaths: {data.deaths}</div>
          <div className = "col card">Total recovered cases: {data.recovered}</div>
          <div className = "col card">Total tests administered: {data.tests}</div>
          <div className = "col card">Daily change in cases: {data.todayCases}</div>
          <div className = "col card">Daily change in deaths: {data.todayDeaths}</div>
          <div className = "col card">Daily change in recovered cases: {data.todayRecovered}</div>
        </div>
      ) : (
          <div className = "statBox"> 
            <div className = "col card">🌎 Global Statistics 🌎</div>
            <div className = "col card"> As of {dates()} at {time()}</div>
            <div className = "col card">Total cases: {data.cases}</div>
            <div className = "col card">Active cases: {data.active}</div>
            <div className = "col card">Current critical cases: {data.critical}</div>
            <div className = "col card">Total deaths: {data.deaths}</div>
            <div className = "col card">Total recovered cases: {data.recovered}</div>
            <div className = "col card">Total tests administered: {data.tests}</div>
            <div className = "col card">Daily change in cases: {data.todayCases}</div>
            <div className = "col card">Daily change in deaths: {data.todayDeaths}</div>
            <div className = "col card">Daily change in recovered cases: {data.todayRecovered}</div>
          </div>
        )}
    </main>
  );
}

export default App;