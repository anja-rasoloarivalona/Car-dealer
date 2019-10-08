import React, { Component, Fragment, memo } from 'react'
import './Home.css';
import IconSvg from '../../utilities/svg/svg';
import { Route, Switch} from 'react-router-dom';






import HomeInventory from './homeInventory/HomeInventory';
import HomeSearch from './homeSearch/HomeSearch';


import HomeService from './homeService/HomeService';






class Home extends Component {

    state = {
        carsHomeIntro : this.props.carsHomeIntro,


        index: 0,

        initialIndex: 0,
    }

    componentDidMount(){
        console.log(this.props.carsHomeIntro);

       this.imageSlideHandler()
    }

    imageSlideHandler = () => {
        let {index, carsHomeIntro} =  this.state;

        this.inter = setInterval(() => {
                    if(index === carsHomeIntro.length){
                        console.log('clearing');
                        
                        this.setState({index: 0}, () => {
                            clearInterval(this.inter);
                            this.imageSlideHandler();
                        })

                    } else {
                        this.setState({index: index++ })
                    }
                }, 4000)
    }


    onRequestChange = i => {
        clearInterval(this.inter);
        this.setState({ index: i}, () => this.imageSlideHandler())
    }

    render() {

        const {carsHomeIntro} = this.state;

        return (
            <div className="home">

            <section className="home__intro">

                {
                    carsHomeIntro.map((product, index) => (
                        <div className={`home__intro__background 
                                        ${this.state.index === index ? 'active' : ''}
                                        ${index === 0 ? 'keyframe' : ''}`}
                              key={index}
                             style={{
                                 backgroundImage: "url(" + product.general[0].mainImgUrl +")"
                             }}>

                                 <div className={`test`}>
                                    {product.general[0].made} {product.general[0].model}
                                 </div>

                        </div>
                    ))
                }

                


            </section>

            <section className="home__router">

                <div className="home__router__nav">
                    <h1><span>WELCOME TO&nbsp;</span><span>WOTO MOTORS</span></h1>
                    <nav className="home__router__nav__list">
                        <li className="home__router__nav__list__item">Inventory</li>
                        <li className="home__router__nav__list__item">Search</li>
                        <li className="home__router__nav__list__item">Contact</li>
                    </nav>
                    <div className="home__router__nav__count">
                        <IconSvg icon="car"/>
                        <div>Available 99 cars</div>
                    </div>
                </div>

            </section>

            <Switch>
                <Route path="/" exact component={HomeInventory}/>
                <Route path="/search" component={HomeSearch}/>
            </Switch>

            <HomeService />
            
            </div>
        )
    }
}




export default Home;
