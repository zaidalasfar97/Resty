import React from 'react';
import './form.scss';
const superagent = require('superagent');


class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            method: 'GET',
            url: '',
            body: '',
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await this.setState({
            method: e.target.method.value,
            url: e.target.url.value,
            body: e.target.body.value,
        });
        this.props.handler(this.state);
    };


    render() {

        return (
            <main>
                <div className="formClass">
                    <form onSubmit={this.handleSubmit}>
                        <label>URL</label>
                        <input id='url' name='url' type='url' required placeholder='http://api.url.here'></input>
                        <button type='submit'>GO!</button>
                        <br />
                        <textarea
                            type="text"
                            name="body"
                            placeholder="Request Body"
                            rows="5"
                            cols="50"
                        />

                        <label>Get</label>
                        <input id='get' name='method' type='radio' value='get'></input>
                        <label>Post</label>
                        <input id='post' name='method' type='radio' value='post' ></input>
                        <label>Put</label>
                        <input id='put' name='method' type='radio' value='put' ></input>
                        <label>Delete</label>
                        <input id='delete' name='method' type='radio' value='delete' ></input>
                    </form>
                </div>

            </main>
        )
    }
}

export default Form;