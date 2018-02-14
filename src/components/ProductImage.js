import React from 'react'

export default class ProductImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { image: '' }
    }
    componentWillMount() {
        this.fetchImage()
    }
    fetchImage() {
        if (!this.props.src) return
        new Promise((resolve, reject) => {
            let img = new Image()
            img.onload = function() {
                resolve(this.src)
            }
            img.src = this.props.src
        }).then(data => (console.log(`loaded: ${data}`), this.setState({ image: data })))
    }
    render() {
        return <div className="img">
            {/* style */}
            <style jsx>{`
                .img {
                    height: 100%;
                    background: url(${this.state.image}) no-repeat center;
                    background-size: cover;
                    position: relative;
                    transition: 4s ease-in;
                }
            `}</style>
        </div>
    }
}