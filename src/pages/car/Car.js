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
import ProductsList from '../../components/ProductsList/ProductsList';

class Car extends Component {

    state = {
        index: 0,       
        product: null,
        relatedProducts: [],
        initiatlIndex: 0,
        loading: true,
        partRequested: 'overview',
        favorite: false,
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
        const {productRequested, userId} = this.props;
        let userIdFetching;
        if(userId === null){
            userIdFetching = 'not connected'
        } else {
            userIdFetching = userId
        }

        let brand, model, price, prodId;
        if(productRequested){
            //If a requested product has been initialized in redux
            brand = productRequested.general.brand;
            model = productRequested.general.model;
            price = productRequested.general.price;
            prodId = productRequested._id
        } else {
            //If not, we use the URL search params (example : when page did mount after reloading)
            const search = this.props.location.search;
            const params = new URLSearchParams(search);
            brand =  params.get('brand');
            model =  params.get('model');
            price =  params.get('price')  ;
            prodId = this.props.match.params.prodId         
        }

         // Fetching another product in the same page;
         if(data){
            prodId = data._id
            brand = data.general.brand;
            model = data.general.model;
            price = data.general.price
        }
      
        let url = `http://localhost:8000/product/${prodId}?userId=${userIdFetching}&brand=${brand}&model=${model}&price=${price}`    
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
        let url;     
        if(this.state.favorite){
            //the current product is already in the favorite list
            url = 'http://localhost:8000/user/remove-favorite/' + this.props.userId + `?prodId=${prodId}`;
            this.props.removeUserFavoriteProduct(this.state.product)
        } else {
            url = 'http://localhost:8000/user/add-favorite/' + this.props.userId + `?prodId=${prodId}`;
            this.props.addUserFavoriteProduct(this.state.product)
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
        })
        .catch( err => {
            console.log(err)
        })
    }

    
    requestProductDetails = data => {
        this.fetchProductDetailsHandler(data)
    }

    showFullGalleryHandler = () => {
        this.props.hideScrollBarHandler()
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
                            <h1 className="car__presentation__title">{product.general.title}</h1>                        
                           {this.props.userId && (
                                    <div className={`car__presentation__favoriteButton
                                                    ${this.state.favorite ? 'active': ''}`}
                                        onClick={this.favoriteHandler}>
                                          {this.state.favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}   
                                            </div>
                               )} 
                        </div>                           
                        <div className={`car__presentation__gallery`}>                          
                            <Gallery
                                index={this.state.index}
                                onRequestChange={i => this.setState({index: i})}>

                                {product.imageUrls.map(img => (
                                <GalleryImage objectFit="cover" key={img} src={img} 
                                              onClick={this.props.hideScrollBarHandler}
                                />
                                ))}
                            </Gallery>                                 
                        </div>                       
                        {this.props.hideScrollBar && (
                            <div className="car__presentation__gallery--fullContainer">
                                <div className="car__presentation__gallery--fullContainer__closeBtn"
                                    onClick={this.props.showScrollBarHandler}>
                                    <span>Close</span>
                                </div>
                                <div className="car__presentation__gallery--full">
                                    <Gallery
                                        index={this.state.index}
                                        onRequestChange={i => this.setState({index: i})}>
                                        {product.imageUrls.map(img => (
                                        <GalleryImage objectFit="contain" key={img} src={img} 
                                        />
                                        ))}
                                    </Gallery>
                                </div>
                            </div>                   
                        )}     
                        <div className="car__presentation__gallery__controller">
                            {product.imageUrls.map(i => (
                                    <img src={i} alt="car" key={i} className="car__presentation__gallery__controller__img"
                                        onClick={ () => this.changeGalleryImgIndex(i)}/>
                            ))}
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


                        {this.state.partRequested === 'overview' && <Overview />}

                        {this.state.partRequested === 'technical' && <Technical product={this.state.product}/>}

                        {this.state.partRequested === 'features' && <Features />}

        
                    </section>
                    
                    <Cta product={product}/>

                    <section className="car__related">
                        <h2 className="car__section__title">
                            Les clients ayant consulté ce modèle ont également regardé
                        </h2>
                        <ProductsList 
                            productsList={products}
                            fetchProductDetailsHandler={this.fetchProductDetailsHandler}
                        />
                    </section>

                    <section className="car__mostPopular">
                        <h2 className="car__section__title">
                            Les modèles les plus populaires
                        </h2>
                        <ProductsList 
                            productsList={this.props.mostPopularProducts}
                            fetchProductDetailsHandler={this.fetchProductDetailsHandler}
                        />
                    </section>
            </div>
            )
        }
        return prod
    }
}

const mapStateToProps = state => {
    return {
        productRequested: state.product.productRequested,
        mostPopularProducts: state.product.mostPopularProducts,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProductRequestedData : data =>  dispatch(actions.setProductRequestedData(data)),
        addUserFavoriteProduct: product => dispatch(actions.addUserFavoriteProduct(product)),
        removeUserFavoriteProduct: product => dispatch(actions.removeUserFavoriteProduct(product))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Car);
