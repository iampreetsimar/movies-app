// import { movies } from './movies_data';
import React, { Component } from 'react';
import axios from 'axios';
import { API_KEY } from  '../api_key';

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
        hover: '',
        page_arr: [1],
        curr_page: 1,
        movies: [],
        favs: []
    }
  }

  //  async beause we're making a async external call to fetch trending movies  
  async componentDidMount() {
    this.changeMovies();
  }

  changeMovies = async () => {
    const getMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.curr_page}`;
    const response = await axios.get(getMoviesUrl);
    let data = response.data;
    this.setState({
        movies: [...data.results]
    }, this.handleFavState)
  }

  handleNext = () => {
    let temp_arr = [];
    for(let i = 1; i <= this.state.page_arr.length + 1; i++) {
        temp_arr.push(i);
    }

    this.setState({
        page_arr : [...temp_arr],
        curr_page : this.state.curr_page + 1
    }, this.changeMovies)
    // this.changeMovies is passed as callback to setState as setState is async
    // changeMovies is invoked once state has been state
  }

  handlePrevious = () => {
    if(this.state.curr_page === 1)
        return;

    let temp_arr = [];
    for(let i = 1; i <this.state.page_arr.length; i++) {
        temp_arr.push(i);
    }

    this.setState({
        page_arr : [...temp_arr],
        curr_page : this.state.curr_page - 1
    }, this.changeMovies)
  }

  handlePage = (page_val) => {
    if(page_val !== this.state.curr_page) {
        let temp_arr = [];
        for(let i = 1; i <= page_val; i++) {
            temp_arr.push(i);
        }

        this.setState({
            curr_page : page_val,
            page_arr : [...temp_arr]
        }, this.changeMovies)
    }
  }

  handleFav = (movie) => {
    let old_favs = JSON.parse(localStorage.getItem('fav_movies') || "[]");
    if(this.state.favs.includes(movie.id)) {
        old_favs = old_favs.filter((m) => m.id !== movie.id);
    } else {
        old_favs.push(movie);
        
    }

    localStorage.setItem('fav_movies', JSON.stringify(old_favs));
    console.log(old_favs);
    this.handleFavState();
  }

  handleFavState = () => {
    console.log("handling fav state");
    let old_favs = JSON.parse(localStorage.getItem('fav_movies') || "[]");
    let temp = old_favs.map((m) => m.id);

    this.setState({
        favs : [...temp]
    })

  }
 
  render() {
    return (
      <>
            {
                this.state.movies.length === 0 ? 
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> :
                    <div>
                        <h1 className='text-center'><strong>Trending</strong></h1>
                        <div className='movies-list'>
                            {
                                this.state.movies.map((m) => (
                                    <div className="card movie-card" onMouseEnter={() => this.setState({ hover : m.id })} onMouseLeave={() => this.setState({ hover : "" })}>
                                        <img src={`https://image.tmdb.org/t/p/original${m.backdrop_path}`} className="card-img-top movie-img" alt={m.title} />
                                        {/* <div className="card-body"> */}
                                        <h5 className="card-title movie-title">{m.original_title}</h5>
                                        {/* <p className="card-text movie-text">{m.overview}</p> */}
                                        <div className='btn-wrapper'> 
                                            {
                                                this.state.hover === m.id &&
                                                <button className='btn btn-primary movie-btn' onClick={() => this.handleFav(m)}>{this.state.favs.includes(m.id) ? "Remove from " : "Add to "}Favorites</button>
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
                                    <li className="page-item"><button className="page-link" onClick={this.handlePrevious}>Previous</button></li>
                                    {
                                        this.state.page_arr.map((page) => (
                                            <li className="page-item"><button className="page-link" onClick={() => this.handlePage(page)}>{page}</button></li>
                                        ))
                                    }
                                    <li className="page-item"><button className="page-link" onClick={this.handleNext}>Next</button></li>
                                </ul>
                            </nav>
                        </div>
                    </div>

            }
      </>
    )
  }
}
