import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map({ children, innerRef, ...props }) {
  return (
    <GoogleMap
      ref={innerRef}
      defaultZoom={8}
      defaultCenter={{ lat: -37.787003, lng: 175.279251 }}
      {...props}
    >
      {children}
    </GoogleMap>
  );
}

export default withScriptjs(withGoogleMap(Map));
