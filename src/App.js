
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favorites from './Components/Favorites';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Router>
        <Navbar/>
        <Routes>
          {/* using exact keyword */}
          {/* <Route path='/' exact element={ <Movies /> } />
          <Route path='/favs' element={ <Favorites /> } /> */}

          {/* with rearranging routes */}
          <Route path='/favs' element={ <Favorites /> } /> 
          <Route path='/' element={ 
            <>
              {/* to add multiple components in a route */}
              <Banner />  
              <Movies />
            </> 
          } />
        </Routes>
      </Router>
  );
}

export default App;
