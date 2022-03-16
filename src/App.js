import "./App.css";

import { useState, useEffect } from "react";

import InfoBox from "./InfoBox";
import Table from "./Table";
import { CardContent } from "@mui/material";
import { Card } from "@mui/material";
import { sortData } from "./sort";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  //this useEffect is done for getting all countries data from api
  // while app.js is rendered
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  // this useEffet is done for drop down to get the list of the countries
  useEffect(() => {
    const url = "https://disease.sh/v3/covid-19/countries";
    const getData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          //sorting the list of country
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          // console.log(data);
        });
    };
    getData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log(countryCode);
    setCountry(countryCode);

    const url2 =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        // All country data is being stored
        // from the country response
        setCountryInfo(data);
      });
    //
  };
  console.log(tableData);
  // console.log(" this is counrty info", countryInfo);

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1 className="app_header_title">Covid-19 Tracker 2022</h1>
          {countries.length > 0 && (
            <select onClick={onCountryChange} className="app_dropdown">
              <option value="worldwide">Worldwide</option>
              {countries.map((country) => (
                <option value={country.value}>{country.name}</option>
              ))}
            </select>
          )}
        </div>
        {/*  info*/}
        <div className="app_stats">
          <InfoBox
            title="Corona Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovery"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Death"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
      </div>
      <Card className="app_right">
        {/* table */}

        <CardContent>
          <h3> Live Cases By Countries </h3>
          <Table countriess={tableData} />
        </CardContent>

        {/* chart  */}
      </Card>
    </div>
  );
}

export default App;
