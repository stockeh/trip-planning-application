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

    static generateCoordinates(map) {
      let start = map.indexOf("<coordinates>") + 13;
      let end = map.indexOf("</coordinates>");
      let coordinates = map.substring(start, end);
      return coordinates.split(" ");
    }

    // Create our path from the kml map
    static makePath(map) {
      let coordinates = GMap.generateCoordinates(map);
      let path = [];
      for (let i = 0; i < coordinates.length; ++i) {
        let pair = coordinates[i].split(',');
        if (pair.length === 2) {
          path.push({
            lat: Number(pair[1]),
            lng: Number(pair[0])
          });
        }
      }
      return path;
    }

    render() {
      const map = this.props.trip.map;
      return (
        <GoogleMap
            defaultCenter={{lat: 0, lng: -20}} defaultZoom={3}>
            <Polyline path={GMap.makePath(map)}
                      options={{strokeColor: 'DeepSkyBlue'}}/>
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
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?'
        + 'key=AIzaSyC44m7b-fRQF3KaecZ3NhW1rZGHik6KQCg' // (1) should be key=<your API key>
        + '&v=3.exp' + '&libraries=geometry,drawing,places',
        loadingElement: <div />,
        containerElement: <div/>,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap,
)(GMap);  // (2)

export default TripMap;