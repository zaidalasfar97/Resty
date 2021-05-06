import React from 'react';
import './App.scss';

import Header from './components/header/header.js';
import Main from './components/main/main.js';
import Footer from './components/footer/footer.js';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Main />
        <Footer />

      </>
    );
  }
}

export default App;