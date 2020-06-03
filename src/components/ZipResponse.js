import React from 'react';

function ZipResponse(props) {
    if (props.responseData.error) {
        setTimeout(function() { props.clearResponse();}, 20000);
        return (
            <div className="col-sm-8">
                <div className="text-danger">{ props.responseData.message }</div>
            </div>
        );
    } else if (props.responseData.data) {
        const { data } = props.responseData;
        return (
            <div className="col-sm-8">
                <table className="table table-info table-hover">
                    <tbody>
                        <tr>
                            <td>City</td>
                            <td>{data.name}</td>
                        </tr>
                        <tr>
                            <td>Temperature</td>
                            <td>{data.main.temp}</td>
                        </tr>
                        <tr>
                            <td>Pressure</td>
                            <td>{data.main.pressure}</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td>{data.main.humidity}</td>
                        </tr>
                        <tr>
                            <td>Temperature (Min)</td>
                            <td>{data.main.temp_min}</td>
                        </tr>
                        <tr>
                            <td>Temperature (Max)</td>
                            <td>{data.main.temp_max}</td>
                        </tr>
                        <tr>
                            <td>Conditions</td>
                            <td>{data.weather[0].description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    } else {
        return null
    }
}
  
export default ZipResponse