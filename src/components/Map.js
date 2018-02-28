import React from 'react'
import { compose, withProps, lifecycle } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { withCheckout } from '../hoc'
import { bindToThis } from '../constants'

const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox")

const MapElement = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBPRVkaNQhmcgwt1DpKOYuP16wbdw7c_CE&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%`, width: '100%' }} />,
        containerElement: <div style={{ height: `100%`, width: '100%' }} />,
        mapElement: <div style={{ height: `100%`, width: '100%' }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                bounds: null,
                center: {
                    lat: 41.9, lng: -87.624
                },
                markers: [],
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onBoundsChanged: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter(),
                    })
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const bounds = new google.maps.LatLngBounds();

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                        bounds.union(place.geometry.viewport)
                        } else {
                        bounds.extend(place.geometry.location)
                        }
                    });
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));
                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                    // refs.map.fitBounds(bounds);
                },
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={15}
        center={props.center}
        onBoundsChanged={props.onBoundsChanged} >
        {/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />} */}
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
    actionHandler(type, data) {
        this.props.actionHandler(type, data)
    }
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