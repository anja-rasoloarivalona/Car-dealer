import React, { Component, Fragment } from 'react'
import './Messages.css'
import { connect } from 'react-redux'
import openSocket from 'socket.io-client';
import {timeStampGenerator} from '../../../utilities/timeStampGenerator'
import MessagesList from './MessagesList/MessagesList'
import IconSvg from '../../../utilities/svg/svg'
import AutoSizeTextArea from '../../../components/AutosizeTextArea/AutosizetextArea'
import * as actions from '../../../store/actions'

class Messages extends Component {

    state = {
        messages: null,
        messageInput: '',
    }

    componentDidMount(){   
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

            if(this.props.newMessage > 0){
                this.props.resetNewMessageNotification()
                this.readNewMessagesHandler()
            }

            this.setState({ 
                messages: resData.messages.messages
            }, () => this.scrollToBottom())
        })
        .catch(err => {
            console.log(err)
        })

        const socket = openSocket('http://localhost:8000');
        
        socket.on('adminSentMessage', data => {  
            if(this.props.userId === data.messageData.userId){
                 this.readNewMessagesHandler();
                 this.addMessages(data.messageData)
            }
         })
    }


    readNewMessagesHandler = () => {
        let url = "http://localhost:8000/messages/" + this.props.userId;
            let timeStamp = timeStampGenerator();
                fetch( url, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        timeStamp: timeStamp,
                        userName: this.props.userName.split(' ')[0]
                    })
                })
                .then( res => {
                    if(res.status !== 200){
                        throw new Error('Failed to fetch messages')
                    }
                    return res.json()
                })
                .then( resData => {
                    console.log('resdata', resData)
                })
                .catch(err => {
                    console.log(err)
                }) 
    }

    addMessages = message => {
        let newMessages = [...this.state.messages, message]
        this.setState({ messages: newMessages}, () => this.scrollToBottom())
    }

    messageChangeHandler = value => {
       this.setState({ messageInput: value})
    }

    sendMessageHandler = () => {
        if(this.state.messageInput !== ''){
            let timeStamp = timeStampGenerator();
            let url = "http://localhost:8000/messages/user/" + this.props.userId;
            let method = "POST";
    
            fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from: this.props.userName.split(' ')[0],
                    message: this.state.messageInput,
                    timeStamp: timeStamp
                })
            })
            .then( res => {
                return res.json()
            })
            .then( resData => {
                this.addMessages(resData.data);
                this.setState({ messageInput: ''}, () => this.scrollToBottom());
            })
            .catch( err => {
                console.log(err)
            })
        }
        
    } 

    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
      }


    render() {
        const {messages, messageInput} = this.state
        let messagesList;
        if(messages && messages.length > 0){
            messagesList = (
                <MessagesList messages={messages}/>
            ) 
        } else {
            messagesList = (
                <div className="messagesContainer__body__start">Start conversation</div>
            )
        }


        return (
            <div className="messages">
                <div className="messages__body">
                        {messagesList}
                        <div ref={el => { this.messagesEnd = el; }}></div>
                </div>
                <div className="messages__sender"> 
                    <div className="messages__sender__textareaContainer">
                    <AutoSizeTextArea 
                        value={messageInput}
                        placeholder='message'
                        onChange={this.messageChangeHandler}
                        className= "messages__sender__textarea"
                    />
                    <IconSvg icon='send'
                        onClick={this.sendMessageHandler}
                        customClass='messages__sender__sender-btn'
                    />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        userName: state.auth.userName,
        newMessage: state.notification.newMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewMessageNotification: data =>  dispatch(actions.addNewMessageNotification(data)),
        resetNewMessageNotification: () => dispatch(actions.resetNewMessageNotification())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
