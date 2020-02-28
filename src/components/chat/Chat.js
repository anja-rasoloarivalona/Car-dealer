import React, { Component, Fragment } from 'react';
import './Chat.css';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import { timeStampGenerator } from '../../utilities/timeStampGenerator';
import IconSvg from '../../utilities/svg/svg';
import AutoSizeTextArea from '../AutosizeTextArea/AutosizetextArea';


 class Chat extends Component {
    state = {
        messages: null,
        messageInput: '',
        showChat: true,
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
            this.setState({ 
                messages: resData.messages.messages,
                name: this.props.userName
            })
        })
        .catch(err => {
            console.log(err)
        })

        const socket = openSocket('http://localhost:8000');
        socket.on('adminSentMessage', data => {    
           if(this.props.userId === data.messageData.userId && this.state.showChat === true){
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
    } 
    addMessages = message => {
        let newMessages = [...this.state.messages, message]
        this.setState({ messages: newMessages})
    }
    messageChangeHandler = value => {
        this.setState({ messageInput: value})
    }
    toggleShowChat = () => {
        let unreadMessageCounter = 0;
        this.state.messages.forEach(i => {
            if(i.read === false){
                unreadMessageCounter++
            } else return 
            })
            if(unreadMessageCounter > 0){
                this.readNewMessagesHandler()
            }
            this.setState( prevState => ({
              showChat: !prevState.showChat
            }))
    }

      

    render() {

        const { showChat, messageInput } = this.state
        return (
            <Fragment>
                <section className="chat" onClick={this.toggleShowChat}>
                    <div className="chat__icon">
                        <IconSvg icon="messenger"/>
                    </div>
                </section>
                <div className={`chat__messages ${showChat ? 'show' : ''}`}>
                    <div className="chat__messages__header">
                        <IconSvg icon="close" />
                        <span>Open conversation</span>
                    </div>

                    <div className="chat__messages__body">
                         
                    </div>
                    <div className="chat__messages__input">
                        <AutoSizeTextArea 
                            value={messageInput}
                            placeholder="Write a message"
                            onChange={this.messageChangeHandler}
                        />
                        <IconSvg icon="send"/>
                    </div>
                </div>
            </Fragment>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        userName: state.auth.userName
    }
}

export default connect(mapStateToProps)(Chat);
