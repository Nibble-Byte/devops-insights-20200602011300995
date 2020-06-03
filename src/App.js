import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from './components/AppHeader';
import AppContainer from './containers/AppContainer';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import './App.css';

function Map() {
	return (
		<GoogleMap
			defaultZoom={10}
			defaultCenter={{ lat: 47.444, lng: -122.176 }}
		/>
	);
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
	return (
		<div className="App">

			<AppHeader />
			<AppContainer />
			<div style={{ width: "100vw", height: "100vh" }}>
				<WrappedMap
					googleMapURL={`https://www.google.com/maps/api/js?v3/.exp&libraries=geometry,drawing,places&key=AIzaSyAAl2Dh5aawLCccxyHORTsi7uSq6vVrcDE`}
					loadingElement={<div style={{ height: "100%" }} />}
					containerElement={<div style={{ height: "100%" }} />}
					mapElement={<div style={{ height: "100%" }} />}
				/>
			</div>

		</div>
	);
}