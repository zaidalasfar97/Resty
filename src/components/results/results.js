import { If, Then, Else } from 'react-if';
import ReactJson from 'react-json-view';
import Loader from 'react-loader-spinner';

import './result.scss';

function Results({ props }) {
    return (
        <section className="resultClass">
            <If condition={props.fetching}>
                <Then>
                    <div id="loader">
                        <h3>Loading</h3>
                        <Loader type="BallTriangle" color="#db7093" height={150} width={150} />
                    </div>
                </Then>
                <Else>
                    <If condition={props.headers}>
                        <Then>
                            <h2>Headers</h2>
                            <ReactJson src={props.headers} name="Headers" iconStyle={'triangle'} collapsed={false} enableClipboard={false} displayDataTypes={false} />

                            <h2>Response</h2>
                            <ReactJson src={props.response} name="Response" iconStyle={'triangle'} collapsed={false} enableClipboard={false} displayDataTypes={false} />
                        </Then>
                        <Else>
                            <h3> {props.response} </h3>
                        </Else>
                    </If>
                </Else>
            </If>
        </section>
    );
}
export default Results;