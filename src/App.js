import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect} from 'react-redux';
import * as actions from './store/actions'


/*------------COMPONENTS---------------------*/
import Navtop from './components/navigation/navtop/Navtop';
import Navbar from './components/navigation/navbar/Navbar';
import Footer from './components/footer/Footer'


/*------------PAGES---------------------------*/
import Home from './pages/home/Home';
import Inventory from './pages/inventory/Inventory';
import Car from './pages/car/Car';
import Auth from './pages/auth/Auth';

class App extends Component {


  componentWillMount(){
    const token = localStorage.getItem('woto-token');
    const expiryDate = localStorage.getItem('woto-expiryDate');
    const connectedUserId = localStorage.getItem('woto-userId');


    if(!token || !expiryDate){
        console.log('NO TOKEN')
        return
    }


    if(new Date(expiryDate) <= new Date()){
      console.log('Token not valid anymore')
      this.props.setLoginStateToFalse()
      return 
    }

    this.props.setLoginStateToTrue(true, token, connectedUserId)
  }




  render() {
    return (
      <div className="app">
        <Navtop />
        <Navbar />

        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/inventory' component={Inventory}/>
          <Route path='/car' component={Car}/>
          <Route path='/auth' component={Auth} />
        </Switch>

        <Footer />
        
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    auth: state.auth.auth,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLoginStateToTrue: (isAuth, token, userId) => dispatch(actions.setLoginStateToTrue(isAuth, token, userId)),
    setLoginStateToFalse: () => dispatch(actions.setLoginStateToFalse())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
