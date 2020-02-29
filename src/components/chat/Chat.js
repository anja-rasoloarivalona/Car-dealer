import React, { Component, Fragment } from 'react';
import './Chat.css';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import { timeStampGenerator } from '../../utilities/timeStampGenerator';
import IconSvg from '../../utilities/svg/svg';
import AutoSizeTextArea from '../AutosizeTextArea/AutosizetextArea';
import MessagesList from '../../pages/account/Messages/MessagesList/MessagesList';
import * as actions from '../../store/actions'


 class Chat extends Component {
    state = {
        messages: null,
        messageInput: '',
        showChat: false,
        name: ''
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
            let messages = resData.messages.messages;
            let unreadMessageCounter = 0;
            messages.forEach(i => {
                if(i.read === false){
                    unreadMessageCounter++
                } 
            })

            if(unreadMessageCounter > 0){
                this.props.addNewMessageNotification(unreadMessageCounter)
            }
            this.setState({ 
                messages: resData.messages.messages,
                name: this.props.userName
            }, () => this.scrollToBottom())
        })
        .catch(err => {
            console.log(err)
        })
        const socket = openSocket('http://localhost:8000');
        socket.on('adminSentMessage', data => { 
           if(this.props.userId === data.messageData.userId){
            this.props.playNotificationSound()
            this.addMessages(data.messageData)
            if(this.state.showChat === true){
                this.readNewMessagesHandler();
            } else {
               this.props.addNewMessageNotification(1)
               }
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
                        userName: this.state.name
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
    sendMessageHandler = () => {

        if(this.state.messageInput.trim() !== ''){
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
                return res.json()
            })
            .then( resData => {
                this.addMessages(resData.data);
                this.setState({ messageInput: ''});
            })
            .catch( err => {
                console.log(err)
            })
        } else {
            alert('Please enter a message')
        }
        



    } 
    addMessages = message => {
        let newMessages = [...this.state.messages, message]
        this.setState({ messages: newMessages}, () => this.scrollToBottom())
    }
    messageChangeHandler = value => {
        this.setState({ messageInput: value})
    }
    toggleShowChat = () => {
        let unreadMessageCounter = 0;
        this.state.messages.forEach(i => {
            if(i.read === false){
                unreadMessageCounter++
            } 
        })

        if(this.props.newMessage > 0){
            unreadMessageCounter += this.props.newMessage
        }

        if(unreadMessageCounter > 0){
            this.readNewMessagesHandler()
            this.props.resetNewMessageNotification()
        }
        this.setState( prevState => ({
            showChat: !prevState.showChat
        }))
    }

    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }


      

    render() {

        const { showChat, messageInput, messages } = this.state;

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
            <Fragment>
                <section className="chat" onClick={this.toggleShowChat}>
                    <div className="chat__icon">
                        <IconSvg icon="messenger"/>
                    </div>
                    {!showChat && this.props.newMessage > 0 && (
                        <div className="chat__notif">
                            {this.props.newMessage}
                        </div>
                    )}
                </section>

                <div className={`chat__messages ${showChat ? 'show' : ''}`}>
                    <div className="chat__messages__header">
                        <IconSvg icon="close" onClick={this.toggleShowChat}/>
                        <span>Open conversation</span>
                    </div>

                    <div className="chat__messages__body">
                         {messagesList}
                         <div ref={el => this.messagesEnd = el}></div>
                    </div>
                    <div className="chat__messages__input">
                        <AutoSizeTextArea 
                            value={messageInput}
                            placeholder="Write a message"
                            onChange={this.messageChangeHandler}
                        />
                        <IconSvg icon="send" onClick={this.sendMessageHandler}/>
                    </div>
                </div>
            </Fragment>
            
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
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
