import React, { Component } from 'react';
import axios from 'axios/index';

import Message from './Message';

class Chatbot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    async df_text_query(text) {
        let says = {
            speaks: 'me',
            msg: {
                text : {
                    text: text
                }
            }
        };
        this.setState({messages: [...this.state.messages, says]});
        const res = await axios.post('/api/df_text_query', {text})

        for(let msg of res.data.fulfillmentText) {
            says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]});
        }
    }

    async df_event_query(event) {
        const res = await axios.post('/api/df_event_query', {event})

        if (res && res.data && res.data.fulfillmentText) {
            this.setState({ messages: [...this.state.messages, {
                speaks: 'bot',
                msg: res.data.fulfillmentText
            }]});
        }
    }

    componentDidMount() {
        this.df_event_query('welcome');
    }

    renderMessages(stateMessages) {
        console.log(stateMessages)
        if (stateMessages) {
            return stateMessages.map((message, i) => {
                return <Message key={i} speaks={message.speaks} text={message.msg} />
            });
        } else {
            return null;
        }
    }

     render () {
         return (
             <div style= {{ height: 400, width: 400, float: 'right'}}>
                 <div id="chatbot" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                     <h2>Chatbot</h2>
                     {this.renderMessages(this.state.messages)}
                    <input type="text" />
                 </div>
             </div>
         )
     }
}


export default Chatbot;