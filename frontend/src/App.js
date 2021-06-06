import './App.css';
import Header from './Components/Header';
import {BrowserRouter as Router} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {baseUrl} from './config';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
      if(localStorage.getItem("LOGIN_ID") == 'no'){
      }else{
        var id = localStorage.getItem("LOGIN_ID");
        dispatch({type: "LOGIN_TRUE"});
        dispatch({type: "LOGGEDIN",payload: id });
        axios.post(baseUrl+'getUser',{id}).then((res)=>{
            if(res.data.data[0].admin){
              dispatch({type: "ADMIN"});
          }
        });
      }
  }, [])
 
  return (
    <Router>
        <div>
            <Header/>
        </div>
    </Router>
  );
}

export default App;
