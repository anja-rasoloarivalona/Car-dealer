import React, { Component } from 'react'
import './Car.css';

import { Gallery, GalleryImage } from "react-gesture-gallery";


class Car extends Component {

    state = {
        index: 0,
        images: [
            "https://images.unsplash.com/photo-1557958114-3d2440207108?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            "https://images.unsplash.com/photo-1557939403-1760a0e47505?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1931&q=80",
            "https://images.unsplash.com/photo-1558029062-a37889b87526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80",
            "https://images.unsplash.com/photo-1558088458-b65180740294?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1579&q=80",
            "https://images.unsplash.com/photo-1557958114-3d2440207108?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            "https://images.unsplash.com/photo-1557939403-1760a0e47505?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1931&q=80",
            "https://images.unsplash.com/photo-1558029062-a37889b87526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80",
            "https://images.unsplash.com/photo-1558088458-b65180740294?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1579&q=80"
        ]
    }

    changeGalleryImgIndex = url => {
        const { images} = this.state;
        let index = images.indexOf(`${url}`);
        this.setState({ index: index})
    }

    render() {
        return (
            <div className="car">
            <section className="car__presentation">
                <div className="car__presentation__gallery">
                    <Gallery
                        index={this.state.index}
                        onRequestChange={i => this.setState({index: i})}>

                        {this.state.images.map(img => (
                        <GalleryImage objectFit="cover" key={img} src={img} />
                        ))}

                    </Gallery>
                </div>

                <div className="car__presentation__gallery__controller">
                    {
                        this.state.images.map(i => (
                            <img src={i} alt="car" className="car__presentation__gallery__controller__img"
                                onClick={ () => this.changeGalleryImgIndex(i)}/>
                        ))
                    }

                </div>
                

            </section>
            <section className="car__presentation--right">

            </section>
        </div>
        )
    }
}


export default Car;
