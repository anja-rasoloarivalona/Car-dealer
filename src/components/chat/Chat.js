import React, { Component } from 'react';
import './Chat.css';


import openSocket from 'socket.io-client';

import { connect } from 'react-redux';

import { timeStampGenerator } from '../../utilities/timeStampGenerator';






 class Chat extends Component {


    state = {
        messages: null,

        messageInput: '',

        showChat: true,

        name: ''
    }

    componentDidMount(){
        
        console.log('userId', this.props.userId)

        let url = "http://localhost:8000/messages/" + this.props.userId;
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

            this.setState({ 
                messages: resData.messages.messages,
                name: resData.messages.firstName
            })


        })
        .catch(err => {
            console.log(err)
        })


        const socket = openSocket('http://localhost:8000');

        socket.on('adminSentMessage', data => {
            /*
                data.messageData {
                    userId: userId,
                    sender: sender,
                    timeStamp: timeStamp,
                    type: type
                }      
            */
           this.addMessages(data.messageData)

        })


    



    }

    sendMessageHandler = () => {


        let timeStamp = timeStampGenerator();

        let url = "http://localhost:8000/messages/user/" + this.props.userId;
        let method = "POST";

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: this.state.name,
                message: this.state.messageInput,
                timeStamp: timeStamp
            })
        })
        .then( res => {
            console.log('sent baby');
            return res.json()

        })
        .then( resData => {


            console.log('resData', resData);


            this.addMessages(resData.data);
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
                          this.state.messages && this.state.messages.map( message => (
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

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(Chat);
