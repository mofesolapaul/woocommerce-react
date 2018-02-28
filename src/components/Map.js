import React from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { withCheckout } from '../hoc'
import { bindToThis } from '../constants'

const MapElement = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIXQfNyJxxe61xv2bcoyBhF_K4FKuA9_Q&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%`, width: '100%' }} />,
        mapElement: <div style={{ height: `100%`, width: '100%' }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }} >
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>
)

export default class Map extends React.PureComponent {
    state = { isMarkerShown: true }
    constructor(props) {
        super(props)

        // bind
        bindToThis(this, 'actionHandler')
    }
    componentDidMount() {}
    actionHandler() {}
    render() {
        return withCheckout(
            <MapElement isMarkerShown={this.state.isMarkerShown} />,
            {
                page_title: 'SmoothieExpress: Checkout',
                section_name: 'location',
                section_header: 'Where are you?',
                actionHandler: this.actionHandler,
            }
        )
    }
}