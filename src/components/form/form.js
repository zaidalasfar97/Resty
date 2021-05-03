import React from 'react';
import './form.scss';
const superagent = require('superagent');


class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            method: '',
            url: '',
        };
    }

    clickHandler = (e) => {
        e.preventDefault();
        this.setState({
            method: e.target.method.value,
            url: e.target.url.value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.url.value);
        console.log(e.target.method.value);
        this.setState({
            url: e.target.url.value,
            method: e.target.method.value,
        });
        try {
            console.log(this.state);
            const result = await superagent[e.target.method.value](
                e.target.url.value
            );
            console.log(result);
            let { headers, body } = result;
            this.props.handler(headers, body, this.state);

        } catch (error) {
            this.props.handler(null, error.message, this.state);
            console.error(error.message)
        }
    }

    render() {

        return (
            <main>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>URL</label>
                        <input id='url' name='url' type='url' required placeholder='http://api.url.here'></input>
                        <button type='submit'>GO!</button>
                        <br />

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
                <section className='divtwo'>

                    <p id='method'>{this.state.method}</p>
                    <p id='url'>{this.state.url}</p>

                </section>
            </main>
        )
    }
}

export default Form;