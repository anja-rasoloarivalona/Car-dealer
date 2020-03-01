import React, { Component } from 'react'
import './Account.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import Messages from './Messages/Messages'
import IconSvg from '../../utilities/svg/svg'
import ProductsList from '../../components/ProductsList/ProductsList'
import { Route, Switch, withRouter, NavLink } from 'react-router-dom'

class Account extends Component {
    state = {
        loading: true,
        scrolling: false
    }

    componentDidMount(){
        console.log(this.props.location.pathname)
        if(this.props.location.pathname !== "/my-account/messages"){
            this.setState({ scrolling: true })
        } else {
            this.setState({ scrolling: false })
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.location.pathname !== this.props.location.pathname) {
            if(this.props.location.pathname === "/my-account/messages"){
                this.setState({ scrolling: false})
            } else {
                this.setState({ scrolling: true})
            }
        }
    }
    requestProductDetails = data => {
        this.props.setProductRequestedData(data)
        this.props.history.push(`/car/${data.productId}`)
    }
    
    render() {

        let products = this.props.favorites;

        const { scrolling } = this.state

       

        return (
            <div className="account">
                  
                <div className="account__sidebar">
                        <ul className="account__sidebar__list">
                            <NavLink to="/my-account/messages" className="account__sidebar__list__item">
                                    <IconSvg icon="email"/>
                                   <span>Messages</span> 
                            </NavLink>

                            <NavLink to="/my-account/favorites" className="account__sidebar__list__item">
                                    <IconSvg icon="heart"/>
                                   <span>Favorites</span> 
                            </NavLink>
                        </ul>
                        <div className="account__sidebar__logout"
                             onClick={this.props.logoutHandler}
                        >
                            <span>Logout</span>
                        </div>
                </div>

                
                <div className={`account__currentSection ${scrolling ? "scroll" : ''}`}>
                    <Switch>
                        <Route path="/my-account/favorites"  render={(props) => <ProductsList {...props}  productsList={products}/>} />
                        <Route path='/my-account/messages' component={Messages} />
                    </Switch>
                </div>        
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        favorites: state.user.favorites
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProductRequestedData : data =>  dispatch(actions.setProductRequestedData(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Account))
