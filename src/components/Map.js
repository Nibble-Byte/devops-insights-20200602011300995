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

