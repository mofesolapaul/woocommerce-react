import React from 'react';
import {bindToThis} from '../constants';
import {View} from '.';

export default class ProductImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [''],
            index: 0,
            autoplay: props.autoplay,
            wheel: props.wheel,
        };

        bindToThis(this, 'nextImage');
        bindToThis(this, 'prevImage');
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
    prevImage() {
        let index = this.state.index;
        const len = this.state.images.length - 1;
        index -= index <= 0? -len:1;
        this.setState({index});
    }
    render() {
        return <View>
            <div className="img" />
            {!!this.state.wheel && <View>
                <div onClick={this.prevImage} className="pi--control pi--prev"></div>
                <div onClick={this.nextImage} className="pi--control pi--next"></div>
            </View>}

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
                .pi--control {
                    position: absolute;
                    width: 48px;
                    height: 48px;
                    top: 50%;
                    transform: translateY(-50%);
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    cursor: pointer;
                    z-index: 2;
                }
                .pi--control:hover {
                    background-size: 80%;
                }
                .pi--next {
                    right: 0;
                    background-image: url(static/img/icon-next-128.png);
                }
                .pi--prev {
                    left: 0;
                    background-image: url(static/img/icon-prev-128.png);
                }
            `}</style>
        </View>;
    }
}