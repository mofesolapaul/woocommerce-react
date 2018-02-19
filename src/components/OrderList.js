import React from 'react'
import css from '../../styles/vars'
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

            <div className="wrapper">
                <div className="summary">
                    <h4 className="summary-heading">Summary</h4>
                    <ul>
                        <li>
                            <strong className="subheading">Subtotal</strong>
                            <span className="price">N3,000</span></li>
                        <li>
                            <strong className="subheading">Total</strong>
                            <span className="price">N3,000</span></li>
                    </ul>
                </div>
                <div className="list">
                </div>
            </div>

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

                // wrapper
                @media screen and (min-width: 720px) {
                    .summary {
                        float: right;
                        width: 30%;
                        text-align: right;
                        position: relative;
                    }
                    .summary::before {
                        content: '';
                        height: 1px;
                        width: 100%;
                        background: ${css.colors.orchidash};
                        margin: auto;
                        position: absolute;
                        display: block;
                        bottom: 0;
                    }
                }
                .summary-heading {
                    text-transform: uppercase
                }
                .subheading {
                    float: left;
                }
                .summary li {
                    padding: .5rem 0
                }
            `}</style>
        </div>
    }
}