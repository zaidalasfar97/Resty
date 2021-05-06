import React from 'react';
import './history.scss';

function History({ props }) {
    return (

        <table className="historyClass">
            <thead>
                <tr>
                    <th>Method</th>
                    <th>URL</th>
                </tr>
            </thead>
            <tbody>
                {props.map((val, i) => {
                    return (
                        <tr key={i + val.methot + val.url} onClick={historyHandler} >
                            <th className="th" id={`his${val.method}`}>{val.method}</th>
                            <td>{val.url}</td>
                            <td style={{ display: 'none' }}>{val.body}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>

    );
}

async function historyHandler(e) {

    let method = e.currentTarget.childNodes[0].innerHTML;
    let url = e.currentTarget.childNodes[1].innerHTML;
    let body = e.currentTarget.childNodes[2].innerHTML;

    const input = document.getElementById(`url`);
    input.value = url;

    const selected = document.getElementById(`${method}`);
    await selected.click();

    const text = document.getElementById('body');
    text.value = body;

    const submit = document.getElementById('submit');
    await submit.click();
}

export default History;
