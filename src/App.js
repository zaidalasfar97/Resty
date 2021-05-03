import React from 'react';
import './components/reset.scss';
import Header from './components/header/header.js';
import Footer from './components/footer/footer.js';
import Form from './components/form/form.js';
import Results from './components/results/results';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      headers: {},
      response: [],
      urls: '',
      methods: '',
    };
  }
  handleForm = (headers, body, state) => {
    console.log(headers, body, state.url, state.method);
    if (headers && body) {
      this.setState({
        count: body.count || this.state.count + 1,
        headers: headers,
        response: body,
      });
    } else {
      this.setState({
        count: this.state.count + 1,
        headers: { message: 'Not Available' },
        response: body
      })
    }
  };
  render() {
    return (
      <>
        <Header />
        {/* <main> */}
        <Form prompt="GO!" handler={this.handleForm} />
        {/* <section id="results"> */}
        <Results props={this.state} />
        {/* </section> */}
        {/* </main> */}
        <Footer />
      </>
    );
  }
}


export default App;
