import React, { Component } from 'react'
import './Car.css';
import { Gallery, GalleryImage } from "react-gesture-gallery";
import { NavLink, Switch, Route } from 'react-router-dom'


import Overview from './overview/Overview';
import Technical from './technical/Technical';
import Features from './features/Features';
import Cta from './cta/Cta'

import Loader from '../../components/loader/Loader';

class Car extends Component {

    state = {
        index: 0,
        
        product: null,

        initiatlIndex: 0,
        loading: true,


        partRequested: 'overview'
    }

   


    imageSlideHandler = () => {
    let {index, images, initiatlIndex} =  this.state;
    this.inter = setInterval(() => {
                if(index === images.length){
                    this.setState({index: initiatlIndex}, () => {
                        clearInterval(this.inter);
                        this.imageSlideHandler();
                    })
                } else {
                    this.setState({index: index++ })
                }
            }, 2500)
    }

    componentDidMount(){

        let prodId;

        if(!this.props.prodId){
            prodId = this.props.match.params.prodId
        } else {
            prodId = this.props.prodId
        }

        let url = "http://localhost:8000/user/" + prodId
        let method = 'GET'


        
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
        this.setState({ product: resData.product, loading: false}, () => console.log(this.state.product))
      })
      .catch(err => {
        console.log(err)
      })



      //  this.imageSlideHandler()
    }

    componentWillUnmount(){
        clearInterval(this.inter)
    }
    

    changeGalleryImgIndex = url => {
        const { images} = this.state;
        let index = images.indexOf(`${url}`);
        this.setState({ index: index})
    }

    render() {

        const { product } = this.state;

        let prod;

        if(this.state.loading){
                prod = <Loader />
        } else {
            prod = (
                <div className="car">
                
                    <section className="car__presentation">
                        <h1 className="car__presentation__title">{product.general[0].title}</h1>
                        <div className="car__presentation__gallery">

                            
                                
                            <Gallery
                                index={this.state.index}
                                onRequestChange={i => this.setState({index: i})}>

                                {product.imageUrls.map(img => (
                                <GalleryImage objectFit="cover" key={img} src={img} />
                                ))}

                            </Gallery>

                                
                            
                            
                        </div>
                        <div className="car__presentation__gallery__controller">
                            {
                            
                                product.imageUrls.map(i => (
                                    <img src={i} alt="car" key={i} className="car__presentation__gallery__controller__img"
                                        onClick={ () => this.changeGalleryImgIndex(i)}/>
                                ))
                            
                        }

                        </div>
                        
                        <ul className="car__presentation__nav">
                            <li className={`car__presentation__nav__item
                                        ${this.state.partRequested === 'overview' ? 'active': ''}`}
                                onClick={() => this.setState({ partRequested: 'overview'})}>
                                Overview
                            </li>
                            <li className={`car__presentation__nav__item
                                        ${this.state.partRequested === 'technical' ? 'active': ''}`}
                                onClick={() => this.setState({ partRequested: 'technical'})}>
                                Technical
                            </li>
                            <li className={`car__presentation__nav__item
                                        ${this.state.partRequested === 'features' ? 'active': ''}`}
                                onClick={() => this.setState({ partRequested: 'features'})}>
                                Features
                            </li>
                        </ul>


                        {
                            this.state.partRequested === 'overview' && <Overview />
                        }

                        {
                            this.state.partRequested === 'technical' && <Technical product={this.state.product}/>
                        }

                        {
                            this.state.partRequested === 'features' && <Features />
                        }

                    



                        <div className="space">

                        </div>
  
                    </section>
                    
                    <Cta product={product}/>

                    
            </div>
            )
        }
        return prod
    }
}


export default Car;
