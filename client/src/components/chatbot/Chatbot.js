import React, { Component } from 'react';
import axios from 'axios/index';

import Message from './Message';

class Chatbot extends Component {
    messagesEnd;
    constructor(props) {
        super(props);
        
        this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
        
        this.state = {
            messages: []
        }
    }

    async df_text_query(text) {
        let says = {
            speaks: 'me',
            msg: text
        };
        this.setState({messages: [...this.state.messages, says]});
        const res = await axios.post('/api/df_text_query', {text})


        if (res && res.data && res.data.fulfillmentText) {
            this.setState({ messages: [...this.state.messages, {
                speaks:'bot',
                msg: res.data.fulfillmentText
            }]})
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

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavious: "smooth"})
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

    handleInputKeyPress(e) {
        console.log(e)
        if (e.key === 'Enter'){
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }

     render () {
         return (
             <div style= {{ height: 400, width: 400, float: 'right'}}>
                 <div id="chatbot" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                     <h2>Chatbot</h2>
                     {this.renderMessages(this.state.messages)}
                     <div ref={(el) => { this.messagesEnd = el;}} 
                          style={{ float: "left", clear: "both"}}>

                     </div>
                    <input type="text" onKeyPress={this.handleInputKeyPress} />
                 </div>
             </div>
         )
     }
}


export default Chatbot;