import css from '../../styles/vars'
import React from 'react'

export default class OrderList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="OrderPreview">

            {/* styles */}
            <style jsx>{`
                @keyframes drawUp {
                    to { bottom: 0 }
                }
                .OrderPreview {
                    background: ${css.colors.ultrawhite};
                    padding: 2rem 1rem;
                    box-shadow: rgba(82,89,101,.25) 0px -2px 8px 3px;
                    position: fixed;
                    overflow: auto;
                    width: 100%;
                    left: 0;
                    z-index: 999;
                }
                @media screen and (min-width: 500px) {
                    .OrderPreview {
                        height: 60%;
                        bottom: -65%;
                        animation: drawUp ease-in .25s both;
                    }
                }
            `}</style>
        </div>
    }
}