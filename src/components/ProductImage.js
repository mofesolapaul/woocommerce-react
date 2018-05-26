import React from 'react';

export default class ProductImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [''],
            index: 0,
        };
    }
    componentWillMount() {
        this.fetchImage();
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
                    transition: 4s ease-in;
                }
            `}</style>
        </div>;
    }
}