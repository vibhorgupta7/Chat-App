const TheirMessage = ({lastMessage, message}) => {
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username; // check is this first message by user
     
    return(
        <div className="message-row">
            {isFirstMessageByUser && (                                          // If first message to put the sender's dp beside the message
                    <div 
                        className="message-avatar"
                        style={{backgroundImage: `url(${message?.sender?.avatar})`}}     // checking if message .sender.avatar exists, if yes then put it in backgrond image
                    />
                )}
            {message?.attachments?.length > 0
                ? (
                    <img src={message.attachments[0].file}           // Accessing the image
                        alt="message-attachments"
                        className="message-image"
                        style={{marginLeft: isFirstMessageByUser? '4px' : '48px'}}/>
                )
                : (
                    <div className="message" style={{ float:'left', backgroundColor:'#CABCDC',marginLeft: isFirstMessageByUser? '4px' : '48px'}}>
                        {message.text}
                    </div>
                )
            }
        </div>
    )
}

export default TheirMessage;