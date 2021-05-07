import './App.css';
import Header from './Components/Header';
import {BrowserRouter as Router} from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Listing from './Components/Listing';
import Details from './Components/Details';
import Home from './Components/Home';
import Profile from './Components/Profile';
// import PostProperty from './Components/PostProperty';
function App() {
 
  return (
    <Router>
        <div>
            <Header/>
        </div>
    </Router>
  );
}

export default App;
