import React, { useState } from 'react';
import { getMovies } from './services/fakeMovieService'

const MoviesHooks = () =>  {
    
    const [movies, setMovies] = useState(getMovies())

    const handleDelete = (movie) => {
         const newMovies = movies.filter(m => m._id !== movie._id)
        setMovies(newMovies)
     }


        const { length: moviesCount } = movies

        if(moviesCount === 0){
            return <p>There are no movies in the database</p>;  
        }

        return ( 
        <>
        <p>there are {moviesCount} movies in the database</p>
           <table className="table">
               <thead>
                   <tr>
                       <th>Title</th>
                       <th>Genere</th>
                       <th>Stock</th>
                       <th>Rate</th>
                       <th></th>
                   </tr>
               </thead>
               <tbody>
                   {movies.map((movie) => 
                       <tr key={movie._id}>
                       <td>{movie.title}</td>
                       <td>{movie.genre.name}</td>
                       <td>{movie.numberInStock}</td>
                       <td>{movie.dailyRentalRate}</td>
                       <td><button onClick={() => handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                   </tr> 
                   )}
               </tbody>
           </table>
           </>
         );
}
 
export default MoviesHooks;