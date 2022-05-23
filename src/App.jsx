import { useState } from 'react';
import Modal from './components/Modal';
import './App.css';

const  App = ()  => {
 const [searchValue, setSearchValue] =useState('');
 const [isOpen, setIsOpen] =useState(false);
 const [data, setData] = useState({});
 const [releases, setReleases] = useState(null);
 const [repoName, setRepoName] = useState('');

const GITHUB_TOKEN = '';
const headers ={
    "Authorization": `Token ${GITHUB_TOKEN}`
}

const FetchApi = async(key) =>{
  try {
    const res = await fetch(`https://api.github.com/search/repositories?q=${key}&s=stars`, {
      "method": "GET",
      "headers": headers
    });
    const value = await res.json();

    return value;
  } catch (error) {
    console.log(error);
  }
}

const GetRelease = async (url) => {
  try {
    const res = await fetch(url.slice(0, -5), {
      "method": "GET",
      "headers": headers
    });
    const data = await res.json();
  
    return data;
  } catch (error) {
    console.log(error);
  }
}

const compare =(a, b) =>{
  return a.stargazers_count - b.stargazers_count;
}

const HandleChange = async(searchValue, e) =>{
  //e.preventDefault();
  const api = await FetchApi(searchValue);
  api.items.sort(compare).reverse().toString();
  api.items.length =10;
  setData(api);
}

const HandleRealeses = async (url, e) =>{
  const data = await GetRelease(url);
  if(data.length >= 10)  data.length =10;
  setReleases(data);
  setIsOpen(true);
}

  return (
    <div className="App">
      <div className='search'>
          <input placeholder="GitHub repos" onChange={(e) => setSearchValue(e.target.value)} type="text"/>
          <button className='' onClick={(e) => HandleChange(searchValue, e)}>Search</button>
      </div>
          <div className='App'>
          <Modal className='' onClose={() => setIsOpen(false)} open={isOpen} releases={releases} name={repoName}/>
          {
            data?.items  ?  (
              <>
              <table className='table'>
                <tbody>
                  <tr className='tr-head'>
                      <th>Id</th>
                      <th>Repo Name</th>
                      <th>Star Count</th>
                  </tr>

                  {data.items.map((el) =>(
                    <tr className='tr-body' key={el.id} onClick={()=> {
                      HandleRealeses(el.releases_url)
                      setRepoName(el.name)
                    }}
                      >
                      <th>{el.id}</th>
                      <th>{el.name}</th>
                      <th>{el.stargazers_count}</th>
                    </tr>
                  ))}
                </tbody>
              </table>

              </>

            ) : (
              <p className='info'>Search for GitHub repos</p>
            )
          }
        </div>
    </div>
  );
}

export default App;
