import React from 'react';
import { If, Then } from 'react-if';
import '../reset.scss';
import Form from '../form/form.js';
import Results from '../results/results';
import History from '../history/history.js';

const superagent = require('superagent');

let history = JSON.parse(localStorage.getItem('history'));

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            headers: {},
            response: [],
            history: {},
            storageArray: history || [],
            // urls: [],
            // methods: [],
            trigger: false,
            fetching: false,
        };
    }

    formHandler = async (state) => {
        this.setState({ fetching: true, trigger: true });

        try {
            let reqBody = state.body;
            if (state.method === 'POST' || state.method === 'PUT') {
                const result = await superagent[state.method.toLowerCase()](
                    state.url
                ).send(reqBody);
                let { headers, body } = result;
                this.handler(headers, body, state);
            } else {

                const result = await superagent[state.method.toLowerCase()](state.url);
                let { headers, body } = result;
                this.handler(headers, body, state);
            }
        } catch (e) {
            this.handler(null, e.message, state);
            console.log(e.message);
        }
    };
    handler = (headers, body, state) => {
        if (headers && body) {
            let storageObj = {
                id: state.method + state.url,
                url: state.url,
                method: state.method,
                body: state.body,
                response: body,
                headers: headers,
            };
            this.state.storageArray.push(storageObj);

            const uniqueArr = [];
            const map = new Map();
            for (const item of this.state.storageArray) {
                if (!map.has(item.id)) {
                    map.set(item.id, true);
                    uniqueArr.push({
                        id: item.id,
                        url: item.url,
                        method: item.method,
                        body: item.body,
                        response: item.response,
                        headers: item.headers,
                    });
                }
            }

            this.setState({
                count: body.count || this.state.count + 1,
                headers: headers,
                response: body,
                storageArray: [...uniqueArr],
                fetching: false,
            });
            localStorage.setItem('history', JSON.stringify(uniqueArr));
        } else {
            this.setState({
                count: this.state.count + 1,
                headers: null,
                response: body,
                fetching: false,
            });
        }
    };

    async componentDidMount() {
        let history = JSON.parse(localStorage.getItem('history'));
        history && this.setState({ history });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.fetching !== this.state.fetching) {
            this.setState({ fetching: this.state.fetching });
        }
    }
    render() {
        return (
            <>

                <Form prompt="GO!" handler={this.formHandler} />
                <History props={this.state.storageArray} />
                <If condition={this.state.trigger}>
                    <Then>
                        <Results props={this.state} />
                    </Then>
                </If>

            </>
        );
    }
}


export default Home;