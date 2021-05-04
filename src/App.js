import React from 'react';
import './App.scss';
import { If, Then } from 'react-if';
import './components/reset.scss';
import Header from './components/header/header.js';
import Footer from './components/footer/footer.js';
import Form from './components/form/form.js';
import Results from './components/results/results';
import History from './components/history/history.js';

const superagent = require('superagent');

let history = JSON.parse(localStorage.getItem('history'));

class App extends React.Component {
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

  handleForm = async (state) => {
    this.setState({ fetching: true, trigger: true });
    console.log(Date.now() / 1000);
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
      console.log('fetching....', this.state.fetching);
      this.setState({ fetching: this.state.fetching });
    }
  }
  render() {
    return (
      <>
        <Header />
        <main>
          <Form prompt="GO!" handler={this.handleForm} />
          <section id="results">
            <History props={this.state.storageArray} />
            <If condition={this.state.trigger}>
              <Then>
                <Results props={this.state} />
              </Then>
            </If>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}


export default App;
