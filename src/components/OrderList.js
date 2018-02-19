import css from '../../styles/vars'
import React from 'react'
import {Cart} from '../stores'

export default class OrderList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="OrderPreview">
            <h1 className="font-sourcesans">Order Preview
                <a className="close" onClick={this.props.dismissHandler}>{`\u00d7`}</a>
            </h1>

            {/* styles */}
            <style jsx>{`
                @keyframes drawUp {
                    to { bottom: 0 }
                }
                .OrderPreview {
                    background: ${css.colors.ultrawhite};
                    padding: 2rem 5%;
                    box-shadow: rgba(82,89,101,.25) 0px -2px 8px 3px;
                    position: fixed;
                    overflow: auto;
                    width: 100%;
                    left: 0;
                    z-index: 999;
                    transition: .25s ease-in-out;
                }
                @media screen and (min-width: 500px) {
                    .OrderPreview {
                        height: 60%;
                        bottom: -65%;
                        animation: drawUp ease-in .25s both;
                    }
                }
                @media screen and (max-width: 499px) {
                    .OrderPreview {
                        height: 100%;
                        bottom: -100%;
                        animation: drawUp ease-in .25s both;
                    }
                }
                .close {
                    font-weight: 100;
                    border: none;
                    opacity: .4;
                    float: right;
                    padding: 0 .5rem;
                    cursor: pointer;
                }
                .close:hover {
                    opacity: .8;
                }
            `}</style>
        </div>
    }
}