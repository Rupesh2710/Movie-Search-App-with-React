// import logo from './logo.svg';
import './App.css';
import './styles.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesGrid from './components/MoviesGrid';
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Watchlist from './components/Watchlist';
import { useState,useEffect } from 'react';
function App() {

  const [movies, setMovies] = useState([]);
  const [watchlist,setWatchlist]=useState([]);
  useEffect(() => {
    fetch("movies.json")
        .then(resp => resp.json())
        .then(data => setMovies(data))

}, []);

  const toggle = (movieId)=>{
    setWatchlist(prev=>prev.includes(movieId)?prev.filter(id=>id!==movieId):[...prev,movieId])
  }
  return (
    <div className="App">
      <div className='container'>
        <Header/>

        <Router>
          <nav>
           <ul>
              <li>
                <Link className='navbar-bubble' to="/">Home</Link>
              </li>
              <li>
                <Link className='navbar-bubble' to="watchlist">Watchlist</Link>
              </li>
           </ul> 
          </nav>
          <Routes>
            <Route path='/' element={<MoviesGrid movies={movies} watchlist={watchlist} toggle={toggle}/>}></Route>
            <Route path='watchlist' element={<Watchlist watchlist={watchlist} movies={movies} toggle={toggle}/>}></Route>
          </Routes>
        </Router>
        
      </div>
      <Footer/>
    </div>
  );
}

export default App;
