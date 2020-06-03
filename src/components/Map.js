// import React, { Component } from 'react';
// import { Map, GoogleApiWrapper } from 'google-maps-react';

// const mapStyles = {
//     width: '100%',
//     height: '80%'
// };


// export class MapContainer extends Component {
//     render() {
//         return (
//             <Map
//                 google={this.props.google}
//                 zoom={8}
//                 style={mapStyles}
//                 initialCenter={{ lat: 47.444, lng: -122.176 }}
//             />
//         );
//     }
// }

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyAAl2Dh5aawLCccxyHORTsi7uSq6vVrcDE'
//   })(MapContainer);

import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "google-maps-react";

function Map() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 47.444, lng: -122.176 }}
    />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

