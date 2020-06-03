import React, { useRef, useState } from 'react';
import fetch from 'isomorphic-unfetch'
import { Marker } from 'react-google-maps';

import Map from '../components/Map';
import ZipResponse from '../components/ZipResponse';
import Zip from '../components/Zip';

function handleApiResult(json) {
    if (json.cod === '400' || json.cod === '404') {
        return {
            error: json.message,
            data: null,
        };
    }

    if (json.cod === 200) {
        return {
            error: null,
            data: json,
        };
    }

    throw new Error('weird response from weather api');
}

function AppContainer(props) {
    const mapRef = useRef(null);
    const [responseData, setResponseData] = useState({
        error: null,
        data: null,
    });

    const handleZipChange = async (input) => {
        var numbers = /^[0-9]+$/;
        if (input.match(numbers)) {
            callApiEndpoint(`https://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric&zip=${input},us`);
        } else {
            callApiEndpoint(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=6b7b471967dd0851d0010cdecf28f829&units=metric`);
        }
    }

    const callApiEndpoint = async (url, panTo) => {
        const res = await fetch(url);
        const json = await res.json();
        const responseData = handleApiResult(json);
        setResponseData(responseData);

        if (responseData.data !== null) {
            mapRef.current.panTo({
                lat: responseData.data.coord.lat,
                lng: responseData.data.coord.lon,
            });
        }
    };

    const clearResponse = () => {
        setResponseData({
            error: null,
            data: null,
        });
    }

    return (
        <div>
            <div className="row mt-4">
                <div className="col-sm-4"></div>
                <Zip onZipChange={handleZipChange} clearResponse={clearResponse} />
                <div className="col-sm-4"></div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-2"></div>
                <ZipResponse responseData={responseData} clearResponse={clearResponse} />
                <div className="col-sm-2"></div>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{
                    height: '50vh',
                    width: '50vw',
                }}>
                    <Map
                        innerRef={mapRef}
                        googleMapURL={`https://www.google.com/maps/api/js?v3/.exp&libraries=geometry,drawing,places&key=AIzaSyAAl2Dh5aawLCccxyHORTsi7uSq6vVrcDE`}
                        loadingElement={<div style={{ height: "100%" }} />}
                        containerElement={<div style={{ height: "100%" }} />}
                        mapElement={<div style={{ height: "100%" }} />}
                        onClick={(event) => {
                            const lat = event.latLng.lat();
                            const lng = event.latLng.lng();

                            // Call api endpoint for lat/lng
                            callApiEndpoint(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=6b7b471967dd0851d0010cdecf28f829&units=metric`);
                        }}
                    >
                        {responseData.data !== null && (
                            <Marker
                                position={{
                                    lat: responseData.data.coord.lat,
                                    lng: responseData.data.coord.lon,
                                }}
                            />
                        )}
                    </Map>
                    <div className="col-sm-2"></div>
                </div>
            </div>
        </div>
    );
}

export default AppContainer
