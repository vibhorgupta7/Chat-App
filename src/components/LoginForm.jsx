import { useState } from 'react';
import axios from 'axios';
const projectID = 'b616663e-0543-4e1f-b8db-60571caf9f5d';


const LoginForm = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');                      // setting error as empty string

   const handleSubmit = async (e) => {                          // Note we write try & catch which will have some asyncronous code, and if we write async code we need to specify that in front of your object
     e.preventDefault();

     // We write username & password, now chatengine will check and return the messages
     // if it returns, it means credentials are right
     // else wrong credentials

     const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };    // object which we have created that has things that need to be checked

     try {
       await axios.get('https://api.chatengine.io/chats', { headers: authObject });         // using axios to get a get request from chatengine and sending it authObject to see if its right

       localStorage.setItem('username', username);              // making a local stoage, setting item user & pass so that whenever we come back to the page we dont have to login in 
       localStorage.setItem('password', password);

       window.location.reload();                                // this will reload the page
       setError('');
     } catch (err) {
       setError('Oops, incorrect credentials.');
     }
   };

   return (
     <div className="wrapper">
       <div className="form">
         <h1 className="title">Chat Application</h1>
         <form onSubmit={handleSubmit}>
           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
           <div align="center">
             <button type="submit" className="button">
               <span>Start chatting</span>
             </button>
           </div>
           <h2 className="error">{error}</h2>
         </form>
       </div>
     </div>

   );
};


export default LoginForm;