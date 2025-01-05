
import React, { useState } from 'react';
import '../styles.css';
import MovieCard from './MovieCard';

export default function MoviesGrid({movies,watchlist,toggle}) {

    
    const [searchterm, setSearchterm] = useState("");
    const [genre,setGenre]=useState("All Genres");
    const [rating,setRating]=useState("All");

   

    const handlesearch=(e)=>{
        setSearchterm(e.target.value);
    };

    const handlegenre=(e)=>{
        setGenre(e.target.value);
    };

    const handlerating=(e)=>{
        setRating(e.target.value);
    };

    const matchgenre=(movie,genre)=>{
        return genre==='All Genres'||movie.genre.toLowerCase() === genre.toLowerCase();
    };

    const matchsearch=(movie,searchterm)=>{
        return movie.title.toLowerCase().includes(searchterm.toLowerCase())
    };

    const matchrating=(movie,rating)=>{
        switch(rating){
            case 'All':
                return true;
            case 'Good':
                return movie.rating>=8;
            case 'OK':
                return movie.rating<8 && movie.rating>=5;
            case 'Bad':
                return movie.rating<5;
            default:
                return false;
        }
    }

    const filteredmovies=movies.filter(movie=>
        matchgenre(movie,genre) &&
         matchsearch(movie,searchterm) && matchrating(movie,rating)
    );

    return (
        <div>
            <input type='text' className='search-input' placeholder='Search' value={searchterm} onChange={handlesearch}/>

            <div className='filter-bar'>
                <div className='filter-slot'>
                    <label>Genre</label>
                    <select className='filter-dropdown' value={genre} onChange={handlegenre}>
                        <option>All Genres</option>
                        <option>Action</option>
                        <option>Drama</option>
                        <option>Fantasy</option>
                        <option>Horror</option>
                       
                    </select>
                </div>
                <div className='filter-slot'>
                    <label>Rating</label>
                    <select className='filter-dropdown' value={rating} onChange={handlerating}>
                        <option>All</option>
                        <option>Good</option>
                        <option>OK</option>
                        <option>Bad</option>
                        
                    </select>
                </div>

            </div>
            <div className='movies-grid'>
                {
                    filteredmovies.map(movie => (
                        <MovieCard movie={movie} toggle={toggle} isWatchlisted={watchlist.includes(movie.id)}></MovieCard>
                    ))
                }
            </div>
        </div>
    );
}