import React from 'react'

const Loading = ({visible}) => (visible
    ? <div className="loading">
            <div className="balls">
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
            </div>
        </div>
    : null)

export default Loading