import React, { Component } from 'react'
import './Car.css';
import { Gallery, GalleryImage } from "react-gesture-gallery";
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import Overview from './overview/Overview';
import Technical from './technical/Technical';
import Features from './features/Features';
import Loader from '../../components/loader/Loader';
import ProductsList from '../../components/ProductsList/ProductsList';
import Amount from '../../components/Amount/Amount';
import IconSvg from '../../utilities/svg/svg';
import { FormattedMessage } from 'react-intl'

class Car extends Component {

    constructor(props){
        super(props);
        this.state = {
            index: 0,       
            product: null,
            relatedProducts: [],
            initiatlIndex: 0,
            loading: true,
            partRequested: 'overview',
            favorite: false,
        }
        this.escFunction = this.escFunction.bind(this)
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
      this.fetchProductDetailsHandler();
      document.addEventListener("keydown", this.escFunction, false);
    }
    componentWillUnmount(){
        clearInterval(this.inter);
        document.removeEventListener("keydown", this.escFunction, false);
    }
    changeGalleryImgIndex = url => {
        const { product } = this.state;
        let index = product.imageUrls.indexOf(`${url}`);
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

        let brand, model, price, prodId, bodyType;
        if(productRequested){
            //If a requested product has been initialized in redux
            brand = productRequested.general.brand;
            model = productRequested.general.model;
            price = productRequested.general.price;
            bodyType = productRequested.general.bodyType;
            prodId = productRequested._id;

        } else {
            //If not, we use the URL search params (example : when page did mount after reloading)
            const search = this.props.location.search;
            const params = new URLSearchParams(search);
            brand =  params.get('brand');
            model =  params.get('model');
            price =  params.get('price');
            bodyType = params.get('bodyType')
            prodId = this.props.match.params.prodId         
        }

         // Fetching another product in the same page;
         if(data){
            prodId = data._id
            brand = data.general.brand;
            model = data.general.model;
            price = data.general.price;
            bodyType = data.general.bodyType
        }
      
        let url = `https://africauto.herokuapp.com/product/${prodId}?userId=${userIdFetching}&brand=${brand}&model=${model}&bodyType=${bodyType}&price=${price}`    
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
          let product = resData.product;
          let favorite;
          let userFavorites = this.props.userFavorites;
          let userFavoritesProductsIds = [];
          userFavorites.forEach(product => userFavoritesProductsIds.push(product._id))
          if(userFavoritesProductsIds.includes(product._id)){
              favorite = true
          } else {
              favorite = false
          }         
          window.scrollTo(0, 0)
          this.setState({ 
              product: resData.product, 
              relatedProducts: resData.relatedProducts,
              favorite: favorite,
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
            url = 'https://africauto.herokuapp.com/user/remove-favorite/' + this.props.userId + `?prodId=${prodId}`;
            this.props.removeUserFavoriteProduct(this.state.product)
        } else {
            url = 'https://africauto.herokuapp.com/user/add-favorite/' + this.props.userId + `?prodId=${prodId}`;
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

    escFunction(event){
        if(event.keyCode === 27 && this.props.hideScrollBar) {
          this.props.showScrollBarHandler()
        }
      }

    render() {
        let product = this.state.product
        let products = this.state.relatedProducts
        let prod;

        if(this.state.loading){
                prod = <Loader />
        } else {
            prod = (
                <div className="single-car">         

                    <div className="single-car__header">

                        <div className="single-car__header__main">

                            <div className="single-car__header__main__titleContainer">
                                <h1 className="single-car__header__main__title">{product.general.title} {product.general.year}</h1>                        
                                {this.props.userId && (
                                    <div className={`single-car__header__main__favoriteButton ${this.state.favorite ? 'active': ''}`}
                                        onClick={this.favoriteHandler}
                                    >
                                        {this.state.favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}   
                                    </div>
                                )} 
                            </div>     

                            <div className={`single-car__header__main__gallery`}>                          
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
                                <div className="single-car__header__main__gallery--fullContainer">

                                    <div className="single-car__header__main__gallery--fullContainer__closeBtn"
                                        onClick={this.props.showScrollBarHandler}>
                                        <IconSvg icon="close"/>
                                    </div>


                                    <div className="single-car__header__main__gallery--full">
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
                            <div className="single-car__header__main__gallery__controller">
                                {product.imageUrls.map(i => (
                                        <img src={i} alt="car" key={i} className="single-car__header__main__gallery__controller__img"
                                            onClick={ () => this.changeGalleryImgIndex(i)}/>
                                ))}
                            </div>
                        </div>
                        
                        <div className="single-car__header__info">
                            <div className="single-car__header__info__priceContainer">
                                <div className="single-car__header__info__price"> <Amount amount={product.general.price} showCurrency/></div>
                            </div>
                            <ul className="single-car__header__info__list">
                                    <li className="single-car__header__info__list__item">
                                        <div className="single-car__header__info__list__item__key"><FormattedMessage id="reference" defaultMessage="reference"/></div>
                                        <div className="single-car__header__info__list__item__value">{product.supplier.reference}</div>
                                    </li>
                                    <li className="single-car__header__info__list__item">
                                        <div className="single-car__header__info__list__item__key"><FormattedMessage id="brand" defaultMessage="brand"/></div>
                                        <div className="single-car__header__info__list__item__value">{product.general.brand}</div>
                                    </li>
                                    <li className="single-car__header__info__list__item">
                                        <div className="single-car__header__info__list__item__key"><FormattedMessage id="bodyType" defaultMessage="body type"/></div>
                                        <div className="single-car__header__info__list__item__value">{product.general.bodyType}</div>
                                    </li>
                                    <li className="single-car__header__info__list__item">
                                        <div className="single-car__header__info__list__item__key"><FormattedMessage id="model" defaultMessage="model"/></div>
                                        <div className="single-car__header__info__list__item__value">{product.general.model}</div>
                                    </li>
                                    <li className="single-car__header__info__list__item">
                                        <div className="single-car__header__info__list__item__key"><FormattedMessage id="year" defaultMessage="year"/></div>
                                        <div className="single-car__header__info__list__item__value">{product.general.year}</div>
                                    </li>
                                    <li className="single-car__header__info__list__item">
                                        <div className="single-car__header__info__list__item__key"><FormattedMessage id="kilometers" defaultMessage="kilometers"/></div>
                                        <div className="single-car__header__info__list__item__value">{product.general.nbKilometers} km</div>
                                    </li>
                                    <li className="single-car__header__info__list__item">
                                        <div className="single-car__header__info__list__item__key"><FormattedMessage id="YOR" defaultMessage="YOR"/></div>
                                        <div className="single-car__header__info__list__item__value">{product.general.yearOfRelease}</div>
                                    </li>
                                    <li className="single-car__header__info__list__item">
                                        <div className="single-car__header__info__list__item__key"><FormattedMessage id="fuel" defaultMessage="fuel"/></div>
                                        <div className="single-car__header__info__list__item__value">{product.general.gazol}</div>
                                    </li>
                                    <li className="single-car__header__info__list__item">
                                        <div className="single-car__header__info__list__item__key"><FormattedMessage id="gearBox" defaultMessage="gear box"/></div>
                                        <div className="single-car__header__info__list__item__value">{product.general.transmissionType}</div>
                                    </li>
                                    <li className="single-car__header__info__list__item">
                                        <div className="single-car__header__info__list__item__key"><FormattedMessage id="serialNumber" defaultMessage="serial number"/></div>
                                        <div className="single-car__header__info__list__item__value">{product.general.serialNumber}</div>
                                    </li>
                                    <li className="single-car__header__info__list__item">
                                        <div className="single-car__header__info__list__item__key"><FormattedMessage id="views" defaultMessage="views"/></div>
                                        <div className="single-car__header__info__list__item__value">{product.general.viewCounter ? product.general.viewCounter : '-' }</div>
                                    </li>
                                    <li className="single-car__header__info__list__item">
                                        <div className="single-car__header__info__list__item__key"><FormattedMessage id="followers" defaultMessage="followers"/></div>
                                        <div className="single-car__header__info__list__item__value">{product.followersCounter ? product.followersCounter : '-'}</div>
                                    </li>
                            </ul>
                        </div>

                    </div>


                    <section className="single-car__details">                 
                        <ul className="single-car__details__nav">
                            <li className={`single-car__details__nav__item
                                        ${this.state.partRequested === 'overview' ? 'active': ''}`}
                                onClick={() => this.setState({ partRequested: 'overview'})}>
                                <FormattedMessage id="overview" defaultMessage="overview"/>
                            </li>
                            <li className={`single-car__details__nav__item
                                        ${this.state.partRequested === 'technical' ? 'active': ''}`}
                                onClick={() => this.setState({ partRequested: 'technical'})}>
                                <FormattedMessage id="technical" defaultMessage="technical"/>
                            </li>
                            <li className={`single-car__details__nav__item
                                        ${this.state.partRequested === 'features' ? 'active': ''}`}
                                onClick={() => this.setState({ partRequested: 'features'})}>
                                <FormattedMessage id="features" defaultMessage="features"/>
                            </li>
                        </ul>
                        {this.state.partRequested === 'overview' && <Overview product={product}/>}

                        {this.state.partRequested === 'technical' && <Technical product={product}/>}

                        {this.state.partRequested === 'features' && <Features product={product} />}

        
                    </section>

                    <section className="single-car__related">
                        <h2 className="single-car__section__title">
                            <FormattedMessage id="similarVehicles" defaultMessage="similar vehicles"/>
                        </h2>
                        <ProductsList 
                            productsList={products}
                            fetchProductDetailsHandler={this.fetchProductDetailsHandler}
                        />
                    </section>

                    <section className="single-car__mostPopular">
                        <h2 className="single-car__section__title">
                           <FormattedMessage id="mostPopular" defaultMessage="most popular"/>
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
        userId: state.auth.userId,
        userFavorites: state.user.favorites
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
