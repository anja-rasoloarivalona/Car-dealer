import React, { Component, Fragment, memo } from 'react'
import './Home.css';
import IconSvg from '../../utilities/svg/svg';
import {HomeInventoryMemo} from './homeInventory/HomeInventory';
import HomeSearch from './homeSearch/HomeSearch';
import HomeService from './homeService/HomeService';
import Button from '../../components/button/Button';






class Home extends Component {

    state = {
        carsHomeIntro : this.props.carsHomeIntro,
        index: 0,
        initialIndex: 0,

        showIntroList: false,

        partRequested: 'inventory'
    }

    componentDidMount(){
      this.imageSlideHandler()

      console.log(this.props.history);

      
    }

    componentWillUnmount(){
        this.clearInterval(this.inter)
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
                }, 3000)
    }


    onRequestChange = i => {
        clearInterval(this.inter);
        this.setState({ index: i}, () => this.imageSlideHandler())
    }

    clearInterval = () => {
        clearInterval(this.inter)
    }

    replayInterval = () => {
       this.imageSlideHandler()
    }

    showIntroListToggler = () => {
        this.setState( prevState => ({
            showIntroList: !prevState.showIntroList
        }))
    }

    render() {

        const {carsHomeIntro} = this.state;

        return (
            <div className="home">
            
            <div className={`home__intro__list-toggler
                        ${this.state.showIntroList ? 'active': ''}`}
                 onClick={this.showIntroListToggler}>

                    <span></span>
                    <span></span>
                    <span></span>
            </div>

            <div className={`home__intro__list
                    ${this.state.showIntroList ? 'active' : ''}`}>
                <div className="home__intro__list__controller">
                    {
                        carsHomeIntro.map( (product, index) => (
                            <img key={product.general.mainImgUrl}src={product.general.mainImgUrl} alt="home image" 
                            className={`home__intro__list__controller__item
                            ${this.state.index === index ? 'active': ''}`}/>
                        ))
                    }
                </div>
            </div>

            <section className="home__intro">

                {
                    carsHomeIntro.map((product, index) => (
                        <div className={`home__intro__background 
                                        ${this.state.index === index ? 'active' : ''}
                                        ${index === 0 ? 'keyframe' : ''}`}
                              key={index}
                            >


                            <img  src={product.general.mainImgUrl} className="home__intro__background__image" alt='home intro'/>

                            <div className="home__intro__product-container"
                                onMouseEnter={this.clearInterval}
                                onMouseLeave={this.replayInterval}>

                                <div className="home__intro__product">
                                    <div className="home__intro__product__detail">
                                        <span>{product.general.brand}</span> 
                                        <span>{product.general.model}</span>
                                        <span>{product.general.year}</span>
                                    </div>
                                    <div className="home__intro__product__price">
                                        <span>{product.general.price}</span>
                                        <span>MRU</span>
                                    </div>
                                </div>
                                 
                                 <Button color="primary">
                                     Voir
                                 </Button>
                                 
                            </div>
                                 

                        </div>
                    ))
                }
            </section>

            <section className="home__router">

                <div className="home__router__nav">
                    <h1><span>WELCOME TO&nbsp;</span><span>WOTO MOTORS</span></h1>
                    <nav className="home__router__nav__list">
                        <li 
                            className={`home__router__nav__list__item ${this.state.partRequested === 'inventory' ? 'active': ''}`} 
                            onClick={() => this.setState({ partRequested: 'inventory'})}>
                                Inventory
                        </li>
                        <li className={`home__router__nav__list__item ${this.state.partRequested === 'search' ? 'active': ''}`}
                            onClick={() => this.setState({ partRequested: 'search'})}>
                                Search
                        </li>
                        <li className={`home__router__nav__list__item ${this.state.partRequested === 'contact' ? 'active': ''}`}
                            onClick={() => this.setState({ partRequested: 'contact'})}>
                                Contact
                        </li>
                    </nav>
                    <div className="home__router__nav__count">
                        <IconSvg icon="car"/>
                        <div>Available 99 cars</div>
                    </div>
                </div>

            </section>

            {
                this.state.partRequested === 'inventory' && (
                    <HomeInventoryMemo carsHomeInventory={this.props.carsHomeInventory} history={this.props.history}/>
                )
            }

            {
                this.state.partRequested === 'search' && (
                    <HomeSearch />
                )
            }

      

            <HomeService />
            
            </div>
        )
    }
}




export default Home;
