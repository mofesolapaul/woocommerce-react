import React from 'react'

export default class OrderList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="OrderPreview">

            {/* styles */}
            <style jsx>{`
                .OrderPreview {
                    background: ${css.colors.ultrawhite};
                    padding: 2rem 1rem;
                    box-shadow: rgba(82,89,101,.25) 0px -2px 5px;
                    position: fixed;
                    bottom: 0;
                    overflow: auto;
                }
                @media screen and (min-width: 500px) {
                    height: 50%;
                    bottom: 55%;
                }
            `}</style>
        </div>
    }
}