import React from 'react';
import { If, Then } from 'react-if';
import ReactJson from 'react-json-view';
import './historyDetals.scss';

class HistoryDetals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: JSON.parse(localStorage.getItem('history')) || [],
            result: [],
            trigger: false,
            data: [],
        };
    }
    clickHandler = async (data) => {
        await this.setState({ result: data, trigger: true });
        localStorage.setItem('data', JSON.stringify(data));
        console.log(data.response);
    };
    render() {
        return (
            <section id="historySection">
                <section id="tableSection">
                    <table>
                        <thead>
                            <tr>
                                <th>Method</th>
                                <th>URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <If condition={this.state.history.length > 0}>
                                <Then>
                                    {this.state.history.map((val, i) => {
                                        return (
                                            <tr
                                                key={i + val.methot + val.url + val.body}
                                                data-testid="url"
                                                onClick={() => { this.clickHandler(val) }}
                                            >
                                                <th id={`his${val.method}`}>
                                                    {val.method}
                                                </th>
                                                <td>{val.url}</td>
                                                <td style={{ display: 'none' }}>{val.body}</td>
                                            </tr>
                                        );
                                    })}
                                </Then>
                            </If>
                        </tbody>
                    </table>
                </section>
                <If condition={this.state.trigger && this.state.result}>
                    <Then>
                        <div className="divClass">
                            <h3>Details:</h3>
                            <p>
                                API: {this.state.result.url}
                            </p>
                            <p>
                                Method: {this.state.result.method}
                            </p>

                            <p>
                                BODY: {this.state.result.body}
                            </p>


                        </div>
                        <div className="results">
                            <h2>Headers:</h2>
                            <ReactJson
                                src={this.state.result.headers}
                                name="Headers"
                                iconStyle={'triangle'}
                                collapsed={false}
                                enableClipboard={false}
                                displayDataTypes={false}
                            />
                            <h2>Response:</h2>
                            <ReactJson
                                src={this.state.result.response}
                                name="Response"
                                iconStyle={'triangle'}
                                collapsed={false}
                                enableClipboard={false}
                                displayDataTypes={false}
                            />
                        </div>
                    </Then>
                </If>
            </section>
        );
    }
}

export default HistoryDetals;