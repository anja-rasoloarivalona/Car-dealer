import React from 'react'

const ChatMessages = props => {

    let messages = props.messages;
    let chatMessageGap, currentSenderType;
    let displayedDate = ""


    let date = messages[0].timeStamp;
    let shortDate = date.slice(0, 5);
    currentSenderType = messages[0].senderType;


    let messagesList = messages.map( (message, index, array) => {
        let currentData = array[index].timeStamp.slice(0, 5)

        if(index === 0){
            //display first date
            displayedDate = date
        }
    })
    return (
        <div>
            
        </div>
    )
}

export default  ChatMessages
