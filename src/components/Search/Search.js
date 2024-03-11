import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Search.css'

let sources = [
  {
    name: 'Gizmodo',
    api: 'NewsApi',
    checked: false,
    domain: 'gizmodo.com'
  },
  {
    name: 'Business Insider',
    api: 'NewsApi',
    checked: false,
    domain: 'businessinsider.com'
  },
  {
    name: 'The Verge',
    api: 'NewsApi',
    checked: false,
    domain: 'theverge.com'
  },
  {
    name: 'Engadget',
    api: 'NewsApi',
    checked: false,
    domain: 'engadget.com'
  },
  {
    name: 'BBC News',
    api: 'NewsApi',
    checked: false,
    domain: 'bbc.co.uk'
  },
  {
    name: 'New York Times',
    api: 'NytimesApi',
    checked: false,
    domain: 'nytimes.com'
  },
  {
    name: 'The Guardian',
    api: 'GuardianApi',
    checked: false,
    domain: 'theguardian.com'
  },
  {
    name: 'IGN',
    api: 'NewsApi',
    checked: false,
    domain: 'ign.com'
  },
  {
    name: 'Polygon',
    api: 'NewsApi',
    checked: false,
    domain: 'polygon.com'
  }
]

const categories = [
  {
    name: 'Technology',
    checked: false
  },
  {
    name: 'Finance',
    checked: false
  },
  {
    name: 'Economy',
    checked: false
  },
  {
    name: 'Politics',
    checked: false
  },
  {
    name: 'Gaming',
    checked: false
  },
  {
    name: 'Movies',
    checked: false
  },
  {
    name: 'Music',
    checked: false
  }
]

const Search = ({ sendSearchQueryToFeed, sendSourcesToFeed, sendCategoriesToFeed, sendDates }) => {

  const [inputValue, setInputValue] = useState('');
  const [configureSourceSelection, setConfigureSourceSelection] = useState(sources);
  const [configCategorySelection, setConfigCategorySelection] = useState(categories);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  }

  const handleStartDate = (date) => {
    const value = date;
    setStartDate(value);
  }

  const handleEndDate = (date) => {
    const value = date;
    setEndDate(value);
  }

  const handleSearchQuery = () => {
    sendSearchQueryToFeed(inputValue);
  }

  const handleSourceCheck = (sourceName) => {
    setConfigureSourceSelection((prevState) => prevState.map((source) => source.name === sourceName ? {...source, ...{name: source.name, api: source.api, checked: !source.checked}} : source));
  }

  const handleCategoryCheck = (categoryName) => {
    setConfigCategorySelection((prevState) => prevState.map((category) => category.name === categoryName ? {...category, ...{name: category.name, checked: !category.checked}} : category));
  }

  useEffect(() => {
    sendSourcesToFeed(configureSourceSelection);
    sendCategoriesToFeed(configCategorySelection);
    sendDates({startDate,endDate});
  }, [configureSourceSelection,configCategorySelection]);

  return (
    <div className='mb-5'>
      <div className='d-flex justify-content-between mb-3'>
        <input type="text" id="searchInput" placeholder="Search for news..." title="Type in a name" className='search' onChange={handleInputChange} value={inputValue} />
        <button className='search-button my-auto' onClick={handleSearchQuery}>Search</button>
      </div>
      <div className='d-flex justify-content-between'>
        <div className='d-flex flex-column'>
          <h5>Sources</h5>
          {configureSourceSelection.map(source => (
            <label className="control-width d-flex">
              <input type="checkbox" checked={source.checked} onChange={() => handleSourceCheck(source.name)}/>
              <span className='mx-2'>{source.name}</span>
            </label>
          ))}
        </div>
        <div className='d-flex flex-column'>
            <label className="d-flex flex-column mb-3">
              <span>From-date</span>
              <DatePicker selected={startDate} dateFormat="yyyy-MM-dd" onChange={(date) => handleStartDate(date)}/>
            </label>
            <label className="d-flex flex-column">
              <span>to-date</span>
              <DatePicker selected={endDate} dateFormat="yyyy-MM-dd" onChange={(date) => handleEndDate(date)}/>
            </label>
        </div>
        <div>
          <h5>Categories</h5>
          {categories.map(category => (
            <label className="control-width d-flex" checked={category.checked} onChange={() => handleCategoryCheck(category.name)}>
              <input type="checkbox" />
              <span className='mx-2'>{category.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search