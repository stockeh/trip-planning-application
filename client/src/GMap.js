import React, {Component} from 'react';
import {compose, withProps} from 'recompose'
import {withScriptjs, withGoogleMap,
    GoogleMap, Polyline, Marker} from 'react-google-maps'

/* Map obtains and renders the map for the trip.
 * Might be an SVG or KML contained in the server response.
 */
class GMap extends Component {
    constructor(props){
        super(props);
    }

    // Create our path from the places array
    makePath(places) {
        let path = places.map(
            x => ({lat: x.latitude, lng: x.longitude})
        );
        path.push({lat: places[0].latitude, lng: places[0].longitude});
        //path.push({lat: 37.0, lng: 107.0});
        return path;
    }

    // Create our markers
    makeMarkers(places) {
        let markers = places.map(
            x => <Marker position={{lat: x.latitude, lng: x.longitude}}/>
        );
        return markers;
    }

    render() {
        const places = this.props.trip.places;
        return (
            <GoogleMap
                defaultCenter={{lat: 0, lng: 0}}
                defaultZoom={2}
            >
                <Polyline path={this.makePath(places)}
                          options={{strokeColor: 'DeepSkyBlue'}}
                />
                {this.makeMarkers(places)}
            </GoogleMap>
        );
    }
}

// This uses a complicated feature of React called Higher Order Components, the recompose library
//  makes this more succinct. HOC's can be thought of as wrappers for functions.
// More information on HOC's can be found https://reactjs.org/docs/higher-order-components.html
// Information on recompose can be found https://github.com/acdlite/recompose
// IMPORTANT: lastly to use this file, I urge you to create an API key and paste it here(1)
//  Visit https://developers.google.com/maps/documentation/javascript/get-api-key and press Get A Key.
// Notice this (2) is the name of the above component.
const TripMap = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?' +
        'key=AIzaSyC44m7b-fRQF3KaecZ3NhW1rZGHik6KQCg' + // (1) should be key=<your API key>
        '&v=3.exp' +
        '&libraries=geometry,drawing,places',
        loadingElement: <div />,
        containerElement: <div/>,
        mapElement: <div style={{ height: `30%` }} />
    }),
    withScriptjs,
    withGoogleMap,
)(GMap);  // (2)

export default TripMap;