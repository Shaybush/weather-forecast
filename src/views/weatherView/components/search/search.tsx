import { useCallback, useState } from "react";
import axios from "axios";
import { ISearchModel } from "./models/search.model";
import AutoCompleteValues from "./autoCompleteValues/autoCompleteValues";
import style from "./search.module.css";
import debounce from "lodash.debounce";

interface exmaple {
  Key: string;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
}

const Search = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<ISearchModel[]>([]);
  const DEBOUNCE_TIME = 300;

  const fetch = async (value: string): Promise<void> => {
    try {
      if (value) {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_URL
          }/locations/v1/cities/autocomplete?q=${value}&apikey=${
            import.meta.env.VITE_APIKEY
          }`
        );

        const mappedSearch: ISearchModel[] = data.map((el: exmaple) => ({
          key: el.Key,
          city: el.LocalizedName,
          country: el.Country.LocalizedName,
        }));

        setResults(mappedSearch);
      } else {
        setResults([]);
        setInput("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Debounce the API call
  const debouncedFetch = useCallback(debounce(fetch, DEBOUNCE_TIME), []);

  const handleInput = (value: string): void => {
    setInput(value);
    debouncedFetch(value);
  };

  return (
    <div className={style.searchWrapper}>
      <form className="p-2">
        {/* input search */}
        <input
          type="text"
          placeholder="Search for cities"
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          className={style.inputBox}
        />
      </form>

      {/* display auto complete values */}
      {results.length ? (
        <AutoCompleteValues
          results={results}
          setInput={setInput}
          setResults={setResults}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
