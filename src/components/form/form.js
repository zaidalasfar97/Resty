import React from 'react';
import './form.scss';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            method: '',
            body: '',
        };
    }

    handleText = (event) => {
        this.setState({
            url: event.target.value,
        });
    }

    handleButton = (event) => {
        event.preventDefault();
        this.setState({
            method: event.target.value,
        });
    }

    handleSubmit = async (event) => {

        event.preventDefault();
        await this.setState({
            url: event.target.url.value,
            method: this.state.method,
            body: event.target.body.value,
        });
        this.props.handler(this.state);
    };


    render() {
        return (
            <main>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" placeholder="URL:" name="url" id="url" onClick={this.handleText} />
                        <button type="submit" id="submit" >{this.props.prompt}</button>
                    </div>
                    <br />
                    <textarea type="text" name="body" id="body" placeholder="Request body" rows="5" cols="35" />

                    <div className="but-dev">
                        <button value="GET" id="GET" defaultChecked onClick={this.handleButton}>GET</button>
                        <button value="POST" id="POST" onClick={this.handleButton}>POST</button>
                        <button value="PUT" id="PUT" onClick={this.handleButton}>PUT</button>
                        <button value="DELETE" id="DELETE" onClick={this.handleButton}>DELETE</button>
                    </div>
                </form>

            </main>
        );
    }

}

export default Form;