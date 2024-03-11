import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import Search from '../Search/Search'
import NewsCard from '../NewsCard/NewsCard'
import './Feed.css'
import { fetchFromNewsApi } from '../../redux/slices/newsApiSlice'
import { fetchFromTheGuardianApi } from '../../redux/slices/guardianSlice';
import { fetchNewsFromNyTimesAPI } from '../../redux/slices/nytimesSlice';

const Feed = () => {

  const dispatch = useDispatch();
  const news = useSelector(state => state.news);
  const guardianNews = useSelector(state => state.guardianNews);
  const nyTimesNews = useSelector(state => state.newYorkTimes);
  const [cardData, setCardData] = useState([]);
  const [domainsStrings, setDomainsString] = useState('');
  const [searchString, setSearchString] = useState('');
  const [categorySelected, setCategorySelected] = useState('');
  const [searchDates, setSearchDates] = useState({startDate: new Date(),endDate: new Date()});

  const handleSearchQuery = (searchQuery) => {
    setSearchString(searchQuery);
    dispatch(fetchFromNewsApi({domainsList: domainsStrings, searchQuery: searchQuery ? searchQuery : categorySelected + (categorySelected ? " AND "+categorySelected : ''), from: searchDates.startDate, to: searchDates.endDate}));
    if(domainsStrings.includes('nytimes.com' || !domainsStrings)){
      dispatch(fetchNewsFromNyTimesAPI({searchQuery: searchQuery ? searchQuery : categorySelected + (categorySelected ? " AND "+categorySelected : ''),pubDate: searchDates.startDate}));
    }
    if(domainsStrings.includes('theguardian.com' || !domainsStrings)){
      dispatch(fetchFromTheGuardianApi({searchQuery: searchQuery ? searchQuery : categorySelected + (categorySelected ? " AND "+categorySelected : ''),from: searchDates.startDate, to: searchDates.endDate}));
    }
  } 

  const handleSourceFilters = (filterObject) => {
    const checkedSources = filterObject.filter(domain => domain.checked)
    const domainsList = checkedSources.map(source => source.domain).join(', ');
    setDomainsString(domainsList);
    if(domainsList || categorySelected){
      dispatch(fetchFromNewsApi({domainsList: domainsList, searchQuery: searchString, from: searchDates.startDate, to: searchDates.endDate}));
    }
    if(domainsList.includes('nytimes.com' || !domainsList)){
      dispatch(fetchNewsFromNyTimesAPI({searchString: searchString ? searchString : categorySelected + (categorySelected ? " AND "+categorySelected : ''),pubDate: searchDates.startDate}));
    }
    if(domainsList.includes('theguardian.com' || !domainsList)){
      dispatch(fetchFromTheGuardianApi({searchString: searchString ? searchString : categorySelected + (categorySelected ? " AND "+categorySelected : ''),from: searchDates.startDate, to: searchDates.endDate}));
    }
  }

  const handleDates = (dateObject) => {
    setSearchDates(dateObject);
  }

  const handleCategories = (filterObject) => {
    const checkedCategories = filterObject.filter(category => category.checked);
    const categoriesList = checkedCategories.map(category => category.name).join(' AND ');
    setCategorySelected(categoriesList);
    if(categoriesList || domainsStrings){
      dispatch(fetchFromNewsApi({domainsList: domainsStrings, searchQuery: searchString ? searchString : categoriesList + (categoriesList ? " AND "+categoriesList : ''), from: searchDates.startDate, to: searchDates.endDate}));
    }
    if(domainsStrings.includes('nytimes.com' || !domainsStrings)){
      dispatch(fetchNewsFromNyTimesAPI({searchString: searchString ? searchString : categoriesList + (categoriesList ? " AND "+categoriesList : ''),pubDate: searchDates.startDate}));
    }
    if(domainsStrings.includes('theguardian.com' || !domainsStrings)){
      dispatch(fetchFromTheGuardianApi({searchString: searchString ? searchString : categoriesList + (categoriesList ? " AND "+categoriesList : ''),from: searchDates.startDate, to: searchDates.endDate}));
    }
  }

  useEffect(() => {
    setCardData([...nyTimesNews.data,...guardianNews.data, ...news.data]);
  }, [nyTimesNews.data,guardianNews.data, news.data]);

  return (
    <div>
      <div className='search-bar mx-auto'>
        <Search sendSearchQueryToFeed={handleSearchQuery} sendSourcesToFeed={handleSourceFilters} sendCategoriesToFeed={handleCategories} sendDates={handleDates}/>
      </div>
      <div className='grid-news-cards mx-auto'>
        {guardianNews.isLoading ? (<div>Loading.....</div>) : (cardData.slice(0,9).map(newCard => <NewsCard sourceName={newCard.source} title={newCard.title} headerImage={newCard.image}/>))}
      </div>
    </div>
  )
}

export default Feed