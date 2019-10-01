import React, { Component } from 'react';
import './Chat.css';


import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000')




 class Chat extends Component {


    state = {
        messages: [],

        messageInput: '',

        showChat: true,

        name: 'Max'
    }

    componentDidMount(){
        if( socket !== undefined) {
            console.log('connected to socket')
        }


        let url = "http://localhost:8000/messages";
        let method = "GET";

        fetch( url, {
           headers: {
               "Content-Type": "application/json"
           },
           method: method
        })
        .then( res => {
            if(res.status !== 200){
                throw new Error('Failed to fetch messages')
            }

            return res.json()
        })
        .then( resData => {
            this.setState({ messages: resData})
        })
        .catch(err => {
            console.log(err)
        })

        socket.on('message', data => {
            this.addMessages(data)
        })
    }

    sendMessageHandler = () => {
        let url = "http://localhost:8000/messages";
        let method = "POST";

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                message: this.state.messageInput
            })
        })
        .then( res => {
            this.setState({ messageInput: ''});
        })
        .catch( err => {
            console.log(err)
        })
    } 

    addMessages = message => {
        let newMessages = [...this.state.messages, message]
        this.setState({ messages: newMessages})
    }

    messageChangeHandler = (e) => {
        this.setState({ messageInput: e.target.value})
    }


    handleKeyDown = (e) => {

        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
        // In case you have a limitation
        // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`
      }

      keypress = e => {
        if(e.key === 'Enter'){
            e.preventDefault();
            this.sendMessageHandler()   
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
                          this.state.messages.length > 0 && this.state.messages.map( message => (
                                <div>
                                        <div className="chat__message chat__message--admin">
                                            {message.message}
                                        </div>
                                </div>
                            ))
                        }

                       {/*
                           this.state.messages.map( message => {

                            if(message.type === 'user'){
                                return (
                                    <div className="user__message__container">
                                        <div></div>
                                        <div className="chat__message chat__message--user">
                                            {message.message}
                                        </div> 
                                    </div>

                                     
                                )
                            }

                            if(message.type === 'admin'){
                                return (
                                    <div>
                                        <div className="chat__message chat__message--admin">
                                            {message.message}
                                        </div>
                                    </div>
                                    

                                )
                            }
                            
                           })
                        */} 


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
