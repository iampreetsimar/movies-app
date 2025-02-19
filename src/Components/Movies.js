import { movies } from './movies_data';
import React, { Component } from 'react'

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
        hover: '',
        page_arr: [1]
    }
  }

  render() {
    let movie = movies.results;
    return (
      <>
            {
                movie.length === 0 ? 
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> :
                    <div>
                        <h1 className='text-center'><strong>Trending</strong></h1>
                        <div className='movies-list'>
                            {
                                movie.map((m) => (
                                    <div className="card movie-card" onMouseEnter={() => this.setState({ hover : m.id })} onMouseLeave={() => this.setState({ hover : "" })}>
                                        <img src={`https://image.tmdb.org/t/p/original${m.backdrop_path}`} className="card-img-top movie-img" alt={m.title} />
                                        {/* <div className="card-body"> */}
                                        <h5 className="card-title movie-title">{m.original_title}</h5>
                                        {/* <p className="card-text movie-text">{m.overview}</p> */}
                                        <div className='btn-wrapper'> 
                                            {
                                                this.state.hover === m.id &&
                                                <a className='btn btn-primary movie-btn'>Add to Favorites</a>
                                            }
                                        </div>
                                        {/* </div> */}
                                    </div>
                                ))
                            }
                        </div>
                        <div style={{ display:'flex', justifyContent:'center' }}>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination"> 
                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                    {
                                        this.state.page_arr.map((page) => (
                                            <li class="page-item"><a class="page-link" href="#">{page}</a></li>
                                        ))
                                    }
                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>

            }
      </>
    )
  }
}
