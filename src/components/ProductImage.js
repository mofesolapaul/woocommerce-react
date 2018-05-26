import React from 'react';
import {bindToThis} from '../constants';

export default class ProductImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [''],
            index: 0,
            autoplay: props.autoplay,
        };

        bindToThis(this, 'nextImage');
    }
    componentWillMount() {
        this.fetchImage();
    }
    componentDidMount() {
        if (this.state.autoplay) {
            setInterval(this.nextImage, 3500);
        }
    }
    fetchImage() {
        let src = this.props.src;
        if (!src) return;
        if (!Array.isArray(src)) src = [src]; // make an array

        src.forEach((m, i) => {
            new Promise((resolve, reject) => {
                let img = new Image();
                img.onload = function() {
                    resolve(this.src);
                };
                img.src = m;
            }).then(data => {
                const _imgs = [...this.state.images];
                _imgs[i] = data;
                this.setState({ images: _imgs });
            });
        }, this);
    }
    nextImage() {
        let index = this.state.index;
        const len = this.state.images.length - 1;
        index += index >= len? -len:1;
        this.setState({index});
    }
    render() {
        return <div className="img">
            {/* style */}
            <style jsx>{`
                .img {
                    visibility: ${this.props.hidden? 'collapse':'visible'}
                    height: 100%;
                    width: 100%;
                    background: url(${this.state.images[this.state.index]}) no-repeat center;
                    background-size: cover;
                    position: relative;
                    transition: transform 4s ease-in;
                }
            `}</style>
        </div>;
    }
}