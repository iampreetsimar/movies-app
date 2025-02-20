import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
        <div style={{ display:'flex', background:'white', padding:'0.5rem'}}>
            <Link to='/' style={{ textDecoration: 'none' }}><h1>Movies App</h1></Link>
            <Link to='/favs' style={{ textDecoration: 'none' }}><h2 style={{ marginLeft:'3rem', marginTop:'0.4rem' }}>Favorites</h2></Link> 
        </div>
    )
  }
}
