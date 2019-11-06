import React, { Component } from 'react'
import './Car.css';
import { Gallery, GalleryImage } from "react-gesture-gallery";

import { connect } from 'react-redux'
import * as actions from '../../store/actions'


import Overview from './overview/Overview';
import Technical from './technical/Technical';
import Features from './features/Features';
import Cta from './cta/Cta'

import Loader from '../../components/loader/Loader';
import ProductCard from '../../components/ProductCard/ProductCard';

class Car extends Component {

    state = {
        index: 0,       
        product: null,
        relatedProducts: [],
        initiatlIndex: 0,
        loading: true,
        partRequested: 'overview',

        favorite: false
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
      //  this.imageSlideHandler()
      this.fetchProductDetailsHandler()
    }

 

    componentWillUnmount(){
        clearInterval(this.inter)
    }
    

    changeGalleryImgIndex = url => {
        const { images} = this.state;
        let index = images.indexOf(`${url}`);
        this.setState({ index: index})
    }

    fetchProductDetailsHandler = data => {
        let {productId, made, model, price, userId} = this.props;
        let prodId;

        let userIdFetching;
        if(userId === null){
            userIdFetching = 'not connected'
        } else {
            userIdFetching = userId
        }

        if(!productId){
            prodId = this.props.match.params.prodId
        } else {
            prodId = productId
        }

        if(data){
            prodId = data.productId
        }

        let url = `http://localhost:8000/product/${prodId}?made=${made}&model=${model}&price=${price}&userId=${userIdFetching}`
    
        fetch( url, {
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
          console.log('caaars', resData);

          window.scrollTo(0, 0)
          this.setState({ 
              product: resData.product, 
              relatedProducts: resData.relatedProducts,
              favorite: resData.favorite,
              loading: false})
      })
      .catch(err => {
        console.log(err)
      })
    }

    favoriteHandler = () => {
        let productId = this.props.productId
        let prodId;
        if(!productId){
            prodId = this.props.match.params.prodId
        } else {
            prodId = productId
        }

        let url = 'http://localhost:8000/user/add-favorite/' + this.props.userId + `?prodId=${prodId}`;
       
        if(this.state.favorite){
            url = 'http://localhost:8000/user/remove-favorite/' + this.props.userId + `?prodId=${prodId}`;
        }
        
        let method = 'POST'

        fetch(url, {
            headers: {
                'Content-type': 'application/json'
              },
            method: method
        })
        .then( res => {
            if(res.status !== 200 && res.status !== 201){
                throw new Error('Error handling favorites product')
              }
      
              return res.json()
        })
        .then(resData => {
            this.setState(prevState => ({
                ...prevState,
                favorite: !prevState.favorite
            }))
            console.log('Favvvorit', resData)
        })
        .catch( err => {
            console.log(err)
        })
    }

    requestProductDetails = data => {
        this.props.setProductRequestedData(data)
        this.fetchProductDetailsHandler(data)
    }

    render() {

        let product = this.state.product
        let products = this.state.relatedProducts

        let prod;

        if(this.state.loading){
                prod = <Loader />
        } else {
            prod = (
                <div className="car">
                
                    <section className="car__presentation">
                        <div className="car__presentation__titleContainer">
                            <h1 className="car__presentation__title">{product.general[0].title}</h1>
                           
                           
                           {
                               this.props.userId && (
                                    <div className={`car__presentation__favoriteButton
                                                    ${this.state.favorite ? 'active': ''}`}
                                        onClick={this.favoriteHandler}>
                                          {this.state.favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}   
                                            </div>
                               )
                           } 
                        </div>
                        
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

                
  
                    </section>
                    
                    <Cta product={product}/>

                    <section className="car__related">
                        <h2 className="car__section__title">
                            Les clients ayant consulté ce modèle ont également regardé
                        </h2>
                            <ul className="car__related__list">
                                {
                                    products.map(product => (
                                        <ProductCard 
                                        key= {product._id}
                                        _id = {product._id}
                                        mainImgUrl={product.general[0].mainImgUrl}
                                        made={product.general[0].made}
                                        model={product.general[0].model}
                                        year={product.general[0].year}
                                        price={product.general[0].price}
                                        nbKilometers={product.general[0].nbKilometers}
                                        gazol={product.general[0].gazol}
                                        transmissionType={product.general[0].transmissionType}
                                        requestProductDetails={this.requestProductDetails}
                                    />
                                    ))
                                }
                            </ul>
                    </section>

                    <section className="car__mostPopular">
                                <h2 className="car__section__title">
                                    Les modèles les plus populaires
                                </h2>
                    </section>
            </div>
            )
        }
        return prod
    }
}

const mapStateToProps = state => {
    return {
        productId: state.product.productRequestedId,
        made: state.product.madeRequested,
        model: state.product.modelRequested,
        price: state.product.priceRequested,
        mostPopularProducts: state.product.mostPopularProducts,

        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProductRequestedData : data =>  dispatch(actions.setProductRequestedData(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Car);
