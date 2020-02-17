import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect} from 'react-redux';
import * as actions from './store/actions'
import openSocket from 'socket.io-client';
import { Spring } from 'react-spring/renderprops'

/*------------COMPONENTS---------------------*/
import Navtop from './components/navigation/navtop/Navtop';
import Navbar from './components/navigation/navbar/Navbar';
import Footer from './components/footer/Footer'
import Chat from './components/chat/Chat';
import Loader from './components/loader/Loader'


/*------------PAGES---------------------------*/
import Home from './pages/home/Home';
import Inventory from './pages/inventory/Inventory';
import SingleCar from './pages/car/Car';
import Auth from './pages/auth/Auth';
import Account from './pages/account/Account';

/*-----------UTILITIES-----------*/
import { timeStampGenerator } from './utilities/timeStampGenerator';

class App extends Component {

  state = {
    carsHomeIntro : [],
    carsHomeInventory : [],
    loading: false,
    hideScrollBar: false
  }

  componentDidMount(){
    this.setState({ loading: true});
    this.initAppDataHandler();
    const token = localStorage.getItem('woto-token');
    const expiryDate = localStorage.getItem('woto-expiryDate');
    const userId = localStorage.getItem('woto-userId');
    //const connectionId = localStorage.getItem('woto-connectionId');

    if(!token || !expiryDate){
        console.log('NO TOKEN')
        return
    }
    if(new Date(expiryDate) <= new Date()){
      console.log('Token not valid anymore')
      this.props.setLoginStateToFalse()
      return 
    }
    let loginData = {
        isAuth: true,
        token: token,
        userId: userId,
       // connectionId: connectionId
    }
    this.props.setLoginStateToTrue(loginData);
    this.initUserFavoriteProducts(loginData.userId)
    let timeStamp = timeStampGenerator();
    this.startConnection(userId, timeStamp)
  }

  initAppDataHandler = () => {
      let url = 'http://localhost:8000/product/init';
      let method = 'GET';
      fetch( url, {
        method: method,
        headers: {
          'Content-type': 'application/json'
        },
      })
      .then( res => {
        if(res.status !== 200 && res.status !== 201){
          throw new Error('Error fetching products')
        }
        return res.json()
      })
      .then(resData => {
        this.props.initAppData(resData)
        this.setState({ 
          carsHomeIntro: resData.publicityProducts, 
          carsHomeInventory: resData.homeInventoryProducts,
          loading: false
        })
      })
      .catch(err => {
        console.log(err)
      })     
  }

  startConnection = (userId, timeStamp) => {
        fetch('http://localhost:8000/auth/start-connection',{
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
        .then( resData => {
          let socket = openSocket('http://localhost:8000', {query: `data=${userId} ${resData.connectionId}`});
          socket.connect();
          this.props.setConnectionId(resData.connectionId)
        })
        .catch(err => {
          console.log(err)
        })
  }

  logoutHandler = () => {
      this.props.setLoginStateToFalse();
      let timeStamp = timeStampGenerator()
      const userId = localStorage.getItem('woto-userId');
      const connectionId = this.props.connectionId;
      this.endConnection(userId, connectionId, timeStamp, true);
  }

  endConnection = (userId, connectionId, timeStamp, logout) => {
      fetch('http://localhost:8000/auth/end-connection',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          connectionId: connectionId,
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
        return
      })
      .then(() => {
          localStorage.removeItem('woto-connectionId');

          if(logout === true){
            localStorage.removeItem('woto-token');
            localStorage.removeItem('woto-expiryDate');
            localStorage.removeItem('woto-userId');
          }
          
      })
      .catch(err => {
        console.log(err)
      })
  }

  initUserFavoriteProducts = userId => {
    let url = 'http://localhost:8000/user/favorites/' + userId;
    fetch( url, {
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then( res => {
      if(res.status !== 200 && res.status !== 201){
        throw new Error('Error fetching products')
      }
      return res.json()
    })
    .then(resData => {
     this.props.setUserFavoriteProducts(resData.favorites)
    })
    .catch(err => {
      console.log(err)
    })

  }

  showScrollBarHandler = () => {
    this.setState({ hideScrollBar: false}, () => document.body.className = "")
  }
  hideScrollBarHandler = () => {
    this.setState({ hideScrollBar: true}, () => document.body.className="hideScrollBar")
  }


  render() {
    const { loading , hideScrollBar} = this.state

    let app;

    let chat = null
    if(this.props.auth && this.props.token && this.props.userId){
      chat = <Chat />
    }

    if(loading === true || !this.props.brandAndModelsData){
      app = <Loader />

    } else {
      app = (
        <Spring
          from={{marginTop: 1000}}
          to = {{ marginTop: 0}}
          config={{delay: 500}}>
          {props => (
              <div style={props}>
                <div className={`app`}>
                    <Navtop />
                    <Navbar logoutHandler={this.logoutHandler}/>
                    {chat}
                    <Switch>
                        <Route path='/' exact render={(props) => <Home {...props} carsHomeIntro={this.state.carsHomeIntro} carsHomeInventory={this.state.carsHomeInventory}/>}/>
                        <Route path='/inventaire' component={Inventory}/>
                        <Route path='/car/:prodId' render={(props) => <SingleCar {...props} hideScrollBar={hideScrollBar} showScrollBarHandler={this.showScrollBarHandler} hideScrollBarHandler={this.hideScrollBarHandler} /> }/>
                        <Route path='/auth' component={Auth} />
                        <Route path='/mon-compte' component={Account} />
                    </Switch>
                    
                    <Footer />      
                </div>
              </div>
            )
          }
        </Spring>
      )
    }   
    return app
  }
}


const mapStateToProps = state => {
  return {
    auth: state.auth.auth,
    token: state.auth.token,
    userId: state.auth.userId,
    connectionId: state.auth.connectionId,
    brandAndModelsData: state.product.brandAndModelsData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLoginStateToTrue: (data) => dispatch(actions.setLoginStateToTrue(data)),
    setLoginStateToFalse: () => dispatch(actions.setLoginStateToFalse()),
    setConnectionId: connectionId => dispatch(actions.setConnectionId(connectionId)),
    initAppData: data => dispatch(actions.initAppData(data)),
    setUserFavoriteProducts: products => dispatch(actions.setUserFavoriteProducts(products))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
