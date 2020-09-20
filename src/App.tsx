import React, {useState, useEffect} from 'react';
import './App.css';
import DataTable from './components/datatable';
import { CovidStatsProps } from './interfaces/covidStatsObject';

function App() {
  const [apiData, setApiData] = useState<CovidStatsProps[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [filteredApiData, setFilteredApiData] = useState<CovidStatsProps[]>([]);

  useEffect(() => {
    const url = 'https://api.covidtracking.com/v1/us/daily.json';
    const fetchData = (url: string) => {
      fetch(url)
      .then(res => res.json())
      .then(json => setApiData(json))
    }
    fetchData(url);
  }, [])

  // useEffect(() => {
  //   const url = 'https://api.covidtracking.com/v1/us/daily.json';
  //   const fetchData = (url: string) => {
  //     fetch(url)
  //     .then(res => res.json())
  //     .then(json => setApiData(json))
  //   }
  //   fetchData(url);
  // }, [])

  useEffect(() => {
    const executeFilters = () => {
      const filteredResults = 
      filters['date'] && apiData.filter(row => row.date.toString().toLowerCase().indexOf(filters['date'].toString().toLowerCase()) > -1)
      || filters['states'] && apiData.filter(row => row.states.toString().toLowerCase().indexOf(filters['states'].toString().toLowerCase()) > -1)
      || filters['positive'] && apiData.filter(row => row.positive.toString().toLowerCase().indexOf(filters['positive'].toString().toLowerCase()) > -1)
      || filters['negative'] && apiData.filter(row => row.negative.toString().toLowerCase().indexOf(filters['negative'].toString().toLowerCase()) > -1)

      setFilteredApiData(filteredResults)
    }
    executeFilters();
  }, [apiData, filters])

  const updateFilters = (column: any, term: string) => {
    const prevFilters = {...filters};
    prevFilters[column] = term;
    setFilters(prevFilters);
  }

  return (
    <div className="app-wrapper">
      <DataTable data={filteredApiData ? filteredApiData : apiData} updateFilters={updateFilters} />
    </div>
  );
}

export default App;
