// We dont need to import react because its latest version
import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';


const ChatFeed = (props) => {

    const { chats, activeChat, userName, messages } = props;            // storing properties chats, activeChat, userName, messages from props into chats, activeChat, userName, messages
    
    const chat = chats && chats[activeChat]                             //  it reads as 'if chats exist then store activeChats from chats in const chat 

    const renderReadReceipts = (message,isMyMessage) => {              
        return chat.people.map((person,index) => person.last_read === message.id && (   // will iterate over all persons and see hwo have seen the message and then put thier image below the message
            <div 
                key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage? 'right' : 'left',
                    backgroundImage: `url(${person?.person?.avatar})`}
                }
            />
        ))
    }
    
    const renderMessage = () => {                                       //New functional component for generating messages
        const keys = Object.keys(messages);                             // this will give all the messages a unique key 

        return keys.map((key,index) => {
            const message = messages[key];                              // Iterating and getting all messages
            const lastMessageKey = index ===0 ? null : keys[index-1];   // Finding the last message key, if index==0 the it will return null else it will return the last key in Keys i.e is the last message key
            const isMyMessage = userName === message.sender.username;   // Checks if it is message of username 
        
            return(                                                     // Returning a div that is the message
                                                                        //giving a key to each message eg msg_1
                <div key={`msg_${index}`} style={{ width:'100%'}}>     
                        <div className="message-block">
                            {
                                isMyMessage 
                                ? <MyMessage message={message}/>        // Sending message in var message as props
                                : <TheirMessage message={message} lastMessage={messages[lastMessageKey]}/>  //Sending message in var message as props & last message in var lastMessage
                            }
                        </div>
                        <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px'}}>
                            {renderReadReceipts(message,isMyMessage)}
                        </div>
                </div>
            );
        })
    }

    if(!chat) return "Loading...";                                              // If no chat the show loading 
    return(
        <div className='chat-feed'>
            <div className='chat-title-container'>
                <div className='chat-title'> {chat.title} </div>
                <div className='chat-subtitle'>
                    {chat.people.map((person) => ` ${person.person.username}`)}     
                </div>
            </div>
            {renderMessage()}  
            <div style={{height:'100px'}}/>
            <div className='message-form-container'>
                <MessageForm {...props} chatId={activeChat} />
            </div>
        </div>
    );
}

export default ChatFeed;