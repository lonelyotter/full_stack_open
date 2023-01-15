import axios from "axios";
import { useState, useEffect } from "react";
import Countries from "./components/Countries";

function App() {
  const [searchText, setSearchText] = useState("");
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const countriesToShow = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div>
      <div>
        find countries{" "}
        <input value={searchText} onChange={handleSearchTextChange}></input>
      </div>
      <Countries countries={countriesToShow} />
    </div>
  );
}

export default App;
