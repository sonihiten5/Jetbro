import './App.css';
import UserCard from './components/UserCard';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function App() {

  const errorMessage = <div>
    <h1>Oops Sorry !!</h1>
    <h4>we couldn't find what you are looking for</h4>
  </div>

  let page = 1;
  const [users, setUser] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);
  const [isEnd, setEnd] = useState(false);
  const [isLoading, setLoading] = useState(false);


  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    searchItem(value);
  }

  const removeFilter = () => {
    setSearch('');
    setFilteredResults([]);
    setError(false);
  }

  const searchItem = (searchValue) => {
    const filtered = users.filter(user => {
      return user.name.toLowerCase().includes(searchValue.toLowerCase());
    })
    if (filtered.length === 0) {
      setError(true);
    }
    else {
      setError(false);
      setFilteredResults(filtered);
    }
  }

  async function fetchData() {
    console.log("fetch")
    setLoading(true);
    const isJson = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    if (isJson.status === 200) {
      const data = isJson ? await isJson.json() : null;
      setUser(prev => [...prev, ...data.results]);
      setEnd(false);
      page += 1;
    }
    else {
      setEnd(true);
    }
    setLoading(false);
  }


  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight === scrollHeight) {
      fetchData();
    }
  };


  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
  }, []);



  return (
    <div className="App">
      <div className="search-content">
        <div className="search-box">
          <FaSearch className='fa-icon'></FaSearch>
          <input type="text" className='search-field' value={search} placeholder='search..' onChange={handleChange} />
          {search && <button class="close-icon" onClick={removeFilter} ></button>}
        </div>
      </div>

      {isLoading &&
        <div className="error">
          <div className="loader"></div>
        </div>
      }

      <div className="wrapper">

        {!error && filteredResults ? filteredResults.map((user, index) =>
          <UserCard key={index}
            name={user.name}
            firstSeen={user.origin.name}
            lastSeen={user.location.name}
            species={user.species}
            src={user.image}
            status={user.status}
          />
        )
          : errorMessage
        }

        {search.length === 0 &&
          users.map((user, index) =>
            <UserCard key={index}
              name={user.name}
              firstSeen={user.origin.name}
              lastSeen={user.location.name}
              species={user.species}
              src={user.image}
              status={user.status}
            />
          )
        }

      </div>
      {isEnd && <div className='error'><h2>No more data found !</h2></div>}
    </div>
  );
}

export default App;
