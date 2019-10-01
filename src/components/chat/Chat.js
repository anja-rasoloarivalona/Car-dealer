import React, { Component } from 'react';
import './Chat.css';
import Input from '../formInput/FormInput';




 class Chat extends Component {


    state = {
        messages: [
            {
                from: 'Max',
                type: 'user',
                message: 'Bonjour',
                date:  new Date()
            },
            {
                from: 'Mario',
                type: 'admin',
                message: 'Salut Max',
                date:  new Date()
            },

            {
                from: 'Max',
                type: 'user',
                message: 'Ca va Max',
                date:  new Date()
            },

        ],

        messageInput: '',

        showChat: true
    }

    messageChangeHandler = (e) => {
        this.setState({ messageInput: e.target.value})
    }


    handleKeyDown(e) {

        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
        // In case you have a limitation
        // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`
      }

      keypress = e => {
        if(e.key === 'Enter'){
            e.preventDefault();
            console.log('value', e.target.value);
            this.setState({ messageInput: ''})
        }
      }

      toggleShowChat = () => {
          this.setState( prevState => ({
              showChat: !prevState.showChat
          }))
      }

    render() {
        return (
            <section className={`chat ${this.state.showChat ?'': 'hide'}`}>

                <div className="chat__bar"
                    onClick={this.toggleShowChat}>
                    Messages
                </div>

                <div className={`chat__body 
                                 ${this.state.showChat ? '' : 'hide'}`}> 

                       {

                       } 

                       
                </div>

                <div className={`chat__input 
                                ${this.state.showChat ? '' : 'hide'}`}>

                    <textarea className="textarea"
                            value={this.state.messageInput}
                            onChange={(e) => this.messageChangeHandler(e)}
                            placeholder='message'
                            onKeyDown={this.handleKeyDown}
                            onKeyPress={this.keypress}
                            />
                </div>
            </section>
        )
    }
}

export default Chat;
