import React, { Component } from 'react';
import { movies } from './movies_data';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
        genres : [],
        curr_genre : "All Genres"
    }
  }
  
  render() {
    const movie = movies.results;
    let genre_ids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

    let temp_genres = [];
    temp_genres.push("All Genres");
    movie.forEach((m) => {
        let cur_genre = genre_ids[m.genre_ids[0]];
        if(!temp_genres.includes(cur_genre)) {
            temp_genres.push(cur_genre);
        }
    })

    console.log(temp_genres);

    return (
      <div>
        <>
            <div className='main'>
                <div className='row'>
                    <div className='col-3'>
                        <ul className="list-group favorites-genres">
                            {
                                temp_genres.map((genre) => (
                                    this.state.curr_genre === genre ? 
                                    <li className="list-group-item" style={{ background:'#3f51b5', color: 'white', fontWeight:'bold'}}>{genre}</li> : 
                                    <li className="list-group-item" style={{ background:'white', color: '#3f51b5'}}>{genre}</li>
                                ))  
                            }
                        </ul>
                    </div>
                    <div className='col-9 favorites-table'>
                       <div className='row'>
                            <input type='text' className='form-control col' placeholder="Search"></input>
                            <input type='number' className='form-control col' placeholder="Row count"></input>
                        </div>
                        <div className='row'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col">Popularity</th>
                                        <th scope="col">Ratings</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        movie.map((m) => (
                                            <tr>
                                                <td><img src={`https://image.tmdb.org/t/p/original${m.backdrop_path}`} alt={m.title} style={{ width : '5rem' }}/>{m.original_title}</td>
                                                <td>{genre_ids[m.genre_ids[0]]}</td>
                                                <td>{m.popularity}</td>
                                                <td>{m.vote_average}</td>
                                                <td><button type="button" className="btn btn-danger">Delete</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
      </div>
    )
  }
}

