import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import Notes from './components/Notes/Notes';
import Navbar_ from './components/Navbar/navbar';

function App() {
  const array = [0,0,0,0]
  localStorage.setItem('arrayA', JSON.stringify(array))  
  localStorage.setItem('arrayB', JSON.stringify(array))  
  const array_cpu= [0,0,0,0]
  localStorage.setItem('arrayA_cpu', JSON.stringify(array_cpu))  
  localStorage.setItem('arrayB_cpu', JSON.stringify(array_cpu)) 
  return (    
    <Router>
      <Navbar_/>
      <Switch>
        <Route exact path='/Notes/:id' component={Notes}></Route>
      </Switch>
    </Router>
  );
}

export default App;
