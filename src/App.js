import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect} from 'react-redux';
import * as actions from './store/actions'


/*------------COMPONENTS---------------------*/
import Navtop from './components/navigation/navtop/Navtop';
import Navbar from './components/navigation/navbar/Navbar';
import Footer from './components/footer/Footer'
import Chat from './components/chat/Chat';


/*------------PAGES---------------------------*/
import Home from './pages/home/Home';
import Inventory from './pages/inventory/Inventory';
import Car from './pages/car/Car';
import Auth from './pages/auth/Auth';

/*-----------UTILITIES-----------*/
import { timeStampGenerator } from './utilities/timeStampGenerator';

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

    this.props.setLoginStateToTrue(true, token, connectedUserId);
    
    let timeStamp = timeStampGenerator();

    this.updateLastConnection(connectedUserId, timeStamp)
  }


    updateLastConnection = (userId, timeStamp) => {
        fetch('http://localhost:8000/auth/updateLastConnection',{
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            userId: userId,
            timeStamp: timeStamp
          })
        })
        .then(res => {
          if(res.status === 401){
            throw new Error('UserId not valid')
          }

          if(res.status !== 200 && res.status !== 201){
            throw new Error('Could not update last connection')
          }

          return res.json()
        })
        .catch(err => {
          console.log(err)
        })
    }

    logoutHandler = () => {
      localStorage.removeItem('woto-token');
      localStorage.removeItem('woto-expiryDate');
      localStorage.removeItem('woto-userId');
      this.props.setLoginStateToFalse()
    }

    



  render() {
    return (
      <div className="app">
        <Navtop />
        <Navbar logoutHandler={this.logoutHandler}/>
        <Chat />

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
