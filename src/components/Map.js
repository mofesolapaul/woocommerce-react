import React from 'react'
import { compose, withProps, lifecycle } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { withCheckout } from '../hoc'
import { bindToThis } from '../constants'

const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox")
const mapStyles = require('../../styles/map.json')

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
                    lat: this.props.center && this.props.center.lat || 41.9,
                    lng: this.props.center && this.props.center.lng || -87.624
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
                    const nextCenter = nextMarkers[0] && nextMarkers[0].position || this.state.center;

                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    });

                    this.props.actionHandler && this.props.actionHandler('map.center', { lat: nextCenter.lat(), lng: nextCenter.lng() })
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
        onBoundsChanged={props.onBoundsChanged}
        defaultOptions={{ styles: mapStyles }} >
        <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged} >
            <input
                type="text"
                placeholder="Where are you located?"
                onChange={e => props.actionHandler('map.searchbox.update', e.target)}
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    marginTop: `27px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }} />
        </SearchBox>
        {props.markers.map((marker, index) =>
            <Marker key={index} position={marker.position} />
        )}
    </GoogleMap>
)

export default class Map extends React.PureComponent {
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
            <MapElement center={this.props.center} actionHandler={this.props.actionHandler} />,
            {
                page_title: 'SmoothieExpress: Checkout',
                section_name: 'location',
                section_header: 'Checkout',
                actionHandler: this.actionHandler,
            }
        )
    }
}