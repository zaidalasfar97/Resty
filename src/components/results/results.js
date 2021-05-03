
import React from 'react';
import ReactJson from 'react-json-view';
import './result.scss';


function Results({ props }) {
    return (
        <section id="resultSec">
            <ReactJson
                src={props.headers}
                name="Headers"
                iconStyle={'triangle'}
                collapsed={false}
                enableClipboard={false}
                displayDataTypes={false}
            />
            <ReactJson
                src={props.response}
                name="Response"
                // theme={"grayscale:inverted"}
                iconStyle={'triangle'}
                collapsed={false}
                enableClipboard={false}
                displayDataTypes={false}
            />
        </section>
    );
}

export default Results;