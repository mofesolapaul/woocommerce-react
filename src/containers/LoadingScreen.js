import React from 'react'
import css from '../../styles/vars'
import {Loading} from '../components'

export default class LoadingScreen extends React.Component {
    render() {
        return !this.props.show? null:<div className="LoadingScreen flex">
            <Loading visible />

            {/* styles */}
            <style jsx>{`
                .LoadingScreen {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    top: 0;
                    left: 0;
                    background: rgba(210,216,225,.5);
                }
            `}</style>
        </div>
    }
}