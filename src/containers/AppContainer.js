import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch'
import ZipResponse from '../components/ZipResponse';
import Zip from '../components/Zip';

function AppContainer(props) {

    const [responseData, setResponseData] = useState('');

    const handleZipChange = async (input) => {

        var numbers = /^[0-9]+$/;
        if (input.value.match(numbers)) {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=imperial&zip=${input},us`)
            const json = await res.json()
            setResponseData(json);
        } else {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=6b7b471967dd0851d0010cdecf28f829`)
            const json = await res.json()
            setResponseData(json);
        }
        
    }

    const clearResponse = () => {
        setResponseData('');
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
        </div>
    );
}

export default AppContainer
