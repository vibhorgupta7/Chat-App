// Back end is hosted by chat-engine
import { ChatEngine } from 'react-chat-engine';             // install dependencies: npm install @ant-design/icons axios react-chat-engine
import './App.css';                                         // @ant-design/icons for desingng, axios for fetching data from api, react-chat-engine because we are using is. Chat engine is an API , get it from chatengine.io
import ChatFeed from './components/ChatFeed';               // Our own customised chat feed that we are going to us
import LoginForm from './components/LoginForm';


const App = () => {
    if(!localStorage.getItem('username')) return <LoginForm />          // If no one has logged in then show login form page
    return(
        <ChatEngine 
            height="100vh"
            projectID="b616663e-0543-4e1f-b8db-60571caf9f5d"
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps) => < ChatFeed {... chatAppProps}/>}  // we are making our own chat feed by ChatFeed Component and sending all the props of ChatEngine to it. Note we are using renderChatFeed here, to modify differentthings visit chatengine.io -> customise UI
            onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
        />
    );
}

export default App;