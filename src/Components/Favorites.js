import React, { Component } from 'react';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
        genres : [],
        curr_genre : "All Genres",
        movies : [],
        curr_search_text : '',
        pop_sort_flag : '',
        rat_sort_flag : '',
        page_limit : 4,
        curr_page : 1
    }
  }

  componentDidMount() {
    let genre_ids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
    let data = JSON.parse(localStorage.getItem('fav_movies') || "[]");
    let temp_genres = [];
    temp_genres.push("All Genres");
    data.forEach((m) => {
        let cur_genre = genre_ids[m.genre_ids[0]];
        if(!temp_genres.includes(cur_genre)) {
            temp_genres.push(cur_genre);
        }
    })

    this.setState({
        genres : [...temp_genres],
        movies : [...data]
    })
  }

  handleGenreChange = (genre) => {
    this.setState({
        curr_genre : genre
    })
  }

  handlePopularitySort = () => {
    let temp = this.state.movies;
    if(this.state.pop_sort_flag === '' || this.state.pop_sort_flag === 'desc') {
        // sort in asc order
        temp.sort(function(a, b) {
            return a.popularity - b.popularity;
        })

        this.setState({
            movies : [...temp],
            pop_sort_flag : 'asc'
        })
    } else  {   
        // sort in desc order as flag === 'asc
        temp.sort(function(a, b) {
            return b.popularity - a.popularity;
        })

        this.setState({
            movies : [...temp],
            pop_sort_flag : 'desc'
        })
    }
  }

  handleRatingsSort = () => {
    let temp = this.state.movies;
    if(this.state.rat_sort_flag === '' || this.state.rat_sort_flag === 'desc') {
        // sort in asc order
        temp.sort(function(a, b) {
            return a.vote_average - b.vote_average;
        })

        this.setState({
            movies : [...temp],
            rat_sort_flag : 'asc'
        })
    } else  {   
        // sort in desc order as flag === 'asc
        temp.sort(function(a, b) {
            return b.vote_average - a.vote_average;
        })

        this.setState({
            movies : [...temp],
            rat_sort_flag : 'desc'
        })
    }
  }

  handleDelete = (id) => {
    let temp = [];
    temp = this.state.movies.filter((m) => m.id !== id)
    this.setState({
        movies : [...temp]
    })
    localStorage.setItem('fav_movies', JSON.stringify(temp));
  }

  handlePageChange = (page) => {
    this.setState({
        curr_page : page
    })
  }
  
  render() {
    let genre_ids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
    let filtered_arr = [];

    if(this.state.curr_search_text === ''){
        filtered_arr = this.state.movies;
    }else {
        filtered_arr = this.state.movies.filter((m) => {
            let title = m.original_title.toLowerCase();
            return title.includes(this.state.curr_search_text.toLowerCase())
        })
    }

    // if(this.state.curr_genre === "All Genres") {
    //     filtered_arr = this.state.movies;
    // } 
    
    if(this.state.curr_genre !== "All Genres"){
        filtered_arr = this.state.movies.filter((m) => genre_ids[m.genre_ids[0]] === this.state.curr_genre);
    }

    let total_pages = Math.ceil(filtered_arr.length / this.state.page_limit);
    let pages_arr = [];
    for(let i = 1; i <= total_pages; i++) {
        pages_arr.push(i);
    }

    let startIdx = (this.state.curr_page - 1) * this.state.page_limit;
    let endIdx = startIdx + this.state.page_limit;
    filtered_arr = filtered_arr.slice(startIdx, endIdx);
    console.log(filtered_arr);

    return (
      <div>
        <>
            <div className='main'>
                <div className='row'>
                    <div className='col-lg-3 col-sm-12'>
                        <ul className="list-group favorites-genres">
                            {
                                this.state.genres.map((genre) => (
                                    this.state.curr_genre === genre ? 
                                    <li className="list-group-item" style={{ background:'#3f51b5', color: 'white', fontWeight:'bold'}}>{genre}</li> : 
                                    <li className="list-group-item" style={{ background:'white', color: '#3f51b5'}} onClick={() => this.handleGenreChange(genre)}>{genre}</li>
                                ))  
                            }
                        </ul>
                    </div>
                    <div className='col-lg-9 favorites-table col-sm-12'>
                       <div className='row'>
                            <input type='text' className='form-control col' placeholder="Search" value={this.state.curr_search_text} onChange={(e) => this.setState({ curr_search_text : e.target.value })}></input>
                            <input type='number' className='form-control col' placeholder="Row count" value={this.state.page_limit} onChange={(e) => this.setState({ page_limit : e.target.value })}></input>
                        </div>
                        <div className='row'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col">Popularity<i class="fa-solid fa-sort" onClick={this.handlePopularitySort}></i></th>
                                        <th scope="col">Ratings<i class="fa-solid fa-sort" onClick={this.handleRatingsSort}></i></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filtered_arr.map((m) => (
                                            <tr>
                                                <td><img src={`https://image.tmdb.org/t/p/original${m.backdrop_path}`} alt={m.title} style={{ width : '5rem' }}/>{m.original_title}</td>
                                                <td>{genre_ids[m.genre_ids[0]]}</td>
                                                <td>{m.popularity}</td>
                                                <td>{m.vote_average}</td>
                                                <td><button type="button" className="btn btn-danger" onClick={() => this.handleDelete(m.id)}>Delete</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                {
                                    pages_arr.map((page) => (
                                        <li className="page-item"><button className="page-link" onClick={() => this.handlePageChange(page)}>{page}</button></li>
                                    ))
                                }
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

