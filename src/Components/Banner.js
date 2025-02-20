import React, { Component } from 'react';
import { movies } from './movies_data';

export default class Banner extends Component {
  render() {
    let movie = movies.results[0];
    console.log(movie);
    return (
        <>
            {
                movie === '' ? 
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> :
                    <div className="card banner-card">
                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top banner-img" alt={movie.title} />
                        {/* <div className="card-body"> */}
                        <h1 className="card-title banner-title">{movie.original_title}</h1>
                        <p className="card-text banner-text">{movie.overview}</p>
                        {/* </div> */}
                    </div>
            }
        </>
    )
  }
}
