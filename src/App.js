import React from 'react';
import {BrowserRouter as Router,Redirect, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import History from './Components/History';

const ProtectedRoute = ({component:Component, ...restProps}) =>{
    return(
      <Route
      {...restProps}
      render = {
          (props)=>{
            if(localStorage.getItem('Authorisation')=== null || localStorage.getItem('Authorisation')=== undefined){
              return <Redirect to={`/signin`}/>
            }
            else{
              return(
                <>
                   <Component {...props}/>
                </>
              )
            }
          }        
      }
      />
    )
}

function App() {
  return (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/signup" component={Signup}/>
            <ProtectedRoute exact path="/dash" component={Dashboard}/>
            <ProtectedRoute exact path="/history" component={History}/>
        </Switch>              
    </Router>
  );
}

export default App;
