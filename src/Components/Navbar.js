import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
        <div style={{ display:'flex', background:'DarkGoldenRod', padding:'0.5rem'}}>
            <h1>Movies App</h1>
            <h2 style={{ marginLeft:'3rem', marginTop:'0.4rem' }}>Favorites</h2>
        </div>
    )
  }
}
