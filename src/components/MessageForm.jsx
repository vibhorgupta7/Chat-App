import { useState } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine';             // sendMessage is an inbuilt function that we can call when we want to sen dthe message to chatengine
import { SendOutlined, PictureOutlined } from '@ant-design/icons';     // imporing icons for form where 

const MessageForm = (props) => {

    const [value,setValue] = useState('');                      // Intially set value as empty by using useState('')
    const { chatId, creds} = props;                             // Retriving  chatId & creds from props
    
    
    const handleSubmit = (event) => {
        event.preventDefault();                                 // this will make sure the page does not refresh once you click submit btn
        const text = value.trim();                              // triming text & removing waste white spaces
        
        if(text.length>0)
            sendMessage(creds,chatId, {text} );                // sendMessage(a,b,c) has 3 parametres, a-> creds, b->chatId, c->text u want to send
        setValue('');                                           // Resetting value of value;
    }

    const handleChange = (event) => {
        setValue(event.target.value);                           // whenever you write something in text box the value is updated
        isTyping(props,chatId);                                 // calling isTyping function and sending props
    }

    const handleUpload = (event) => {
        sendMessage(creds,chatId,{ files: event.target.files, text:''})     // event.target.value is the image and it is now being sent
    }

    return(
        <form className="message-form" onSubmit={handleSubmit}>
            <input
                className="message-input"
                placeholder="Send a message..."
                value={value}
                onChange={handleChange}
                onSubmit={handleSubmit}                 // SAME handle submit, written here as well if we press enter to submit
            />
            <label htmlFor="upload-button">
                <span className="image-button">
                    <PictureOutlined className="picture-icon"/>         
                </span>
            </label>
            <input
                type="file"
                multiple={false}
                id="upload-button"
                style={{display:'none'}}
                onChange={handleUpload}
             />
             <button type="submit" className="send-button">
                <SendOutlined className="send-icon"/>
             </button>
        </form>
    )

}

export default MessageForm;