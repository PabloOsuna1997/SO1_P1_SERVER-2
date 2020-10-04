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
