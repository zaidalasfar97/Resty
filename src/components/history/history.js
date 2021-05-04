import React from 'react';
import './history.scss';

function History({ props }) {
    return (
        <section id="history">
            <table>
                <thead>
                    <tr>
                        <th className="tableClass">Method</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {props.map((val, i) => {
                        return (
                            <tr
                                key={i + val.methot + val.url}
                                data-testid="url"
                                onClick={historyClick}
                            >
                                <th className="tableClass" id={`his${val.method}`}>{val.method}</th>
                                <td>{val.url}</td>
                                <td style={{ display: 'none' }}>{val.body}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
}

export default History;

function historyClick(e) {
    let method = e.currentTarget.childNodes[0].innerHTML;
    let url = e.currentTarget.childNodes[1].innerHTML;
    let body = e.currentTarget.childNodes[2].innerHTML;

    const input = document.getElementById(`url`);
    input.value = url;

    const selected = document.getElementById(`${method}`);
    selected.click();

    const text = document.getElementById('body');
    text.value = body;
}