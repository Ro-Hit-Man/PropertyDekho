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
        axios.get(baseUrl+'getUser?id='+id).then((res)=>{
            if(res.data.data[0].iam == "buyer"){
              dispatch({type: "BUYER"});
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
