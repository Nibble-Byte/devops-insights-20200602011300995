import React, { useRef, useState } from 'react';
import fetch from 'isomorphic-unfetch'
import { Marker } from 'react-google-maps';

import Map from '../components/Map';
import ZipResponse from '../components/ZipResponse';
import Zip from '../components/Zip';

// import * as ibmdb from 'ibm_db';

// const ibmdb = require('ibm_db');

// const connStr = `DSN=dashdb-txn-sbox-yp-dal09-04.services.dal.bluemix.net;UID=tzh98377;PWD=4f0l-r0qtrj8l8s5`

// ibmdb.open(connStr, function(err, conn) {
//      //...
// });


var ibm = require('ibm-cos-sdk');
var util = require('util');

var config = {
    endpoint: 's3.au-syd.cloud-object-storage.appdomain.cloud',
    apiKeyId: 'Vi2B5HNZfUq7b5sNwVKxZQcubaD2FodxT41U3BmjLi8B',    
    serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/af144da82cb544af93c55c819c4304be:ffa161a1-108e-4569-9c6d-d4692f2258ff::',
};

// {
//     "apikey": "Vi2B5HNZfUq7b5sNwVKxZQcubaD2FodxT41U3BmjLi8B",
//     "endpoints": "https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints",
//     "iam_apikey_description": "Auto-generated for key f709ef42-baa2-4943-b2f2-0be560bd59d4",
//     "iam_apikey_name": "Service credentials-1",
//     "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Writer",
//     "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/af144da82cb544af93c55c819c4304be::serviceid:ServiceId-7a96d934-ab4c-4c7b-8a39-1caf10f5aca0",
//     "resource_instance_id": "crn:v1:bluemix:public:cloud-object-storage:global:a/af144da82cb544af93c55c819c4304be:ffa161a1-108e-4569-9c6d-d4692f2258ff::"
//   }

var cos = new ibm.S3(config);

function doCreateBucket() {
    console.log('Creating bucket');
    return cos.createBucket({
        Bucket: 'my-bucket',
        CreateBucketConfiguration: {
          LocationConstraint: 'us-standard'
        },
    }).promise();
}

function doCreateObject() {
    console.log('Creating object');
    return cos.putObject({
        Bucket: 'my-bucket',
        Key: 'foo',
        Body: 'bar'
    }).promise();
}

function doDeleteObject() {
    console.log('Deleting object');
    return cos.deleteObject({
        Bucket: 'my-bucket',
        Key: 'foo'
    }).promise();
}

function doDeleteBucket() {
    console.log('Deleting bucket');
    return cos.deleteBucket({
        Bucket: 'my-bucket'
    }).promise();
}

doCreateBucket()
    .then(doCreateObject)
    .then(doDeleteObject)
    .then(doDeleteBucket)
    .then(function() {
        console.log('Finished!');
    })
    .catch(function(err) {
        console.error('An error occurred:');
        console.error(util.inspect(err));
    });














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
            callApi(`https://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric&zip=${input},us`);
        } else {
            callApi(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=6b7b471967dd0851d0010cdecf28f829&units=metric`);
        }
    }

    // Handles all the interaction with the weather api
    const callApi = async (url, panTo) => {
        const res = await fetch(url);
        const json = await res.json();
        const responseData = handleApiResult(json);
        setResponseData(responseData);

        // Make the map focus on the targeted location
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
                    height: '80vh',
                    width: '80vw',
                }}>
                    <Map
                        innerRef={mapRef}
                        googleMapURL={`https://www.google.com/maps/api/js?v3/.exp&libraries=geometry,drawing,places&key=AIzaSyCDENbbAdPMe0m-BnR9qatcVlX0mshY1j8`}
                        loadingElement={<div style={{ height: "100%" }} />}
                        containerElement={<div style={{ height: "100%" }} />}
                        mapElement={<div style={{ height: "100%" }} />}
                        onClick={(event) => {
                            const lat = event.latLng.lat();
                            const lng = event.latLng.lng();

                            // Call the api for the clicked on latitude/longitude
                            callApi(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=6b7b471967dd0851d0010cdecf28f829&units=metric`);
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
