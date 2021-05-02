import React from 'react';
import  './form.scss';


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

    render() {

        return (
            <main>
                <div>
                    <form onSubmit={this.clickHandler}>
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

                    <p id='method'>{this.state.method}</p>
                    <p id='url'>{this.state.url}</p>

                </div>
            </main>
        )
    }
}

export default Form;