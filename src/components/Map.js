import React from 'react'
import { compose, withProps, lifecycle } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps'
import { withCheckout } from '../hoc'
import { bindToThis } from '../constants'
import { ETALabel, View } from '.'

const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox")
const mapStyles = require('../../styles/map.json')

const defaultCoordinates = {lat: 6.431070800000001, lng: 3.413754899999958}

const MapElement = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBPRVkaNQhmcgwt1DpKOYuP16wbdw7c_CE&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%`, width: '100%' }} />,
        containerElement: <div style={{ height: `100%`, width: '100%' }} />,
        mapElement: <div style={{ height: `100%`, width: '100%' }} />,
    }),
    lifecycle({
        loadDirections(lat, lng) {
            if (lat == defaultCoordinates.lat && lng == defaultCoordinates.lng) return
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: new google.maps.LatLng(defaultCoordinates.lat, defaultCoordinates.lng),
                destination: new google.maps.LatLng(lat, lng),
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    if (result.routes[0]) {
                        // all of this nesting ugliness is based on the result object structure
                        let {legs} = result.routes[0]
                        if (legs[0]) {
                            this.props.actionHandler('map.destination.meta', {
                                distance: legs[0].distance.text,
                                duration: legs[0].duration.text,
                                end_address: legs[0].end_address
                            })
                        }
                    }
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        },
        componentWillMount() {
            const refs = {}

            this.setState({
                bounds: null,
                directions: null,
                center: {
                    lat: this.props.center && this.props.center.lat || defaultCoordinates.lat,
                    lng: this.props.center && this.props.center.lng || defaultCoordinates.lng
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

                    // show directions
                    this.loadDirections(nextCenter.lat(), nextCenter.lng())

                    // save new coordinates
                    this.props.actionHandler && this.props.actionHandler('map.center', { lat: nextCenter.lat(), lng: nextCenter.lng() })
                    // refs.map.fitBounds(bounds);
                },
            })
        },
        componentDidMount() {
            // initial directions drawing
            this.loadDirections(this.state.center.lat, this.state.center.lng)
        }
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={15}
        defaultCenter={props.center}
        onBoundsChanged={props.onBoundsChanged}
        defaultOptions={{ styles: mapStyles }} >
        <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged} >
            <input
                type="text"
                placeholder={props.lastLocation||"Where are you located?"}
                // onChange={e => props.actionHandler('map.searchbox.update', e.target)}
                defaultValue={props.lastLocation}
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    marginTop: `10px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipsis`,
                    left: `10px`,
                }} />
        </SearchBox>
        {props.directions && <DirectionsRenderer directions={props.directions} />}
        {props.markers.map((marker, index) =>
            null // <Marker key={index} position={marker.position} />
        )}
    </GoogleMap>
)

export default class Map extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = { showETA: false }
        
        // bind
        bindToThis(this, 'actionHandler')
    }
    componentDidMount() {}
    actionHandler(type, data) {
        switch (type) {
            case 'map.destination.meta':
                this.setState({ showETA: !!data })
                break;
        }
        this.props.actionHandler(type, data)
    }
    render() {
        const {duration, distance, etaAddy, actionHandler} = this.props
        const ETAProps = {duration, distance, etaAddy, actionHandler}
        return withCheckout(
            <View>
                <MapElement {...this.props} actionHandler={this.actionHandler} />
                <ETALabel
                    shown={this.state.showETA}
                    {...ETAProps} />
            </View>,
            {
                page_title: 'SmoothieExpress: Checkout',
                section_name: 'location',
                section_header: 'Checkout',
                actionHandler: this.actionHandler,
            }
        )
    }
}