import React, {useState, useEffect} from 'react';
import './App.css';
import DataTable from './components/datatable';
import { CovidStatsProps } from './interfaces/covidStatsObject';

function App() {
  const [apiData, setApiData] = useState<CovidStatsProps[]>([]);
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    const url = 'https://api.covidtracking.com/v1/us/daily.json';
    const fetchData = (url: string) => {
      fetch(url)
      .then(res => res.json())
      .then(json => setApiData(json))
    }
    fetchData(url);
  }, [])

  useEffect(() => {

  }, [filters])

  const updateFilters = (column: any, term: string) => {
    const prevFilters = {...filters};
    prevFilters[column] = term;
    setFilters(prevFilters);
  }

  return (
    <div className="app-wrapper">
      <DataTable data={apiData} updateFilters={updateFilters} />
    </div>
  );
}

export default App;
