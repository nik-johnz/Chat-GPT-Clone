import './App.css';
import gptlogo from './components/chatgpt.svg'
import addbtn from './components/add-30.png'
import messageeicon from './components/message.svg'
import home from './components/home.svg'
import saved from './components/bookmark.svg'
import rocket from './components/rocket.svg'
import gptimg from './components/chatgptLogo.svg'
import { sendMsgToOpenAI } from './openai';
import { useEffect, useRef, useState } from 'react';

function App() {


  const msgEnd =useRef(null)
  const [input, setInput]= useState("")
  const [messages, setMessages]= useState([
    {
    text: "Hello! How can I assist you today? ",
    isBot: true,
  }
]);
useEffect(()=>{
  msgEnd.current.scrollIntoView()
},[messages])

  const handleSend= async() =>{
    const text =input;
    setInput('')
    setMessages([
      ...messages,
      {text,isBot:false}
    ])
    const res = await sendMsgToOpenAI(text)
    setMessages([...messages,
    {text, isBot:false},
    {text: res, isBot:true}
  ]);
   
  }

   // Define the handleNewChat function
   const handleNewChat = () => {
    // Reload the entire page
    window.location.reload();
  };


  return (
    <div className="App">

    <div className="row container">
        <div className="col-md-3  "> 
        <div className="sideBar">
        <div className=" m-5">
            <div className="upperSideTop mx-auto w-75"><img src={gptlogo} alt="logo" className="logo" /><span className='brand '>Chat GPT
            </span></div>
            <button className="midBtn mx-auto btn btn-success" onClick={handleNewChat} type='button'><img src={addbtn} alt="newchat" className="addBtn" />New Chat</button>
            <div className="justify-content-center">
              <a href='https://platform.openai.com/docs/assistants/how-it-works' target='blank' style={{textDecoration:"none"}}><button className="query" type='button'><img src={messageeicon} alt="Query" />What is Programming ?</button></a>
              <a href='https://platform.openai.com/docs/tutorials' target='blank' style={{textDecoration:"none"}}><button className="query" type='button'><img src={messageeicon} alt="Query" />How to use an API ?</button></a>

            </div>
        </div>
        <div className="list align-items-end  m-5">
            <div className="listItems"><a href='https://chat.openai.com/' target='blank' className='text-light' style={{textDecoration:"none"}}><img src={home} alt="home" className="listitemsImg" />Home</a></div>
            <div className="listItems"><a href='https://platform.openai.com/playground' className='text-light' target='blank' style={{textDecoration:"none"}}><img src={saved} alt="saved" className="listitemsImg " />Saved</a></div>
            <div className="listItems"><a href='https://platform.openai.com/account/billing/overview' target='blank' className='text-light' style={{textDecoration:"none"}}><img src={rocket} alt="pro" className="listitemsImg " />Upgrade+</a></div>
        </div>
      </div>
      </div>
        <div className="col-md-9 ">
      <div className="row mt-5" style={{justifyContent:"center", alignContent:"center",overflow:"hidden"}}>
        <div className="col-md-12 mt-5">
        <div className=" ">
        <div className="chats " >
       
       
          {messages.map((message, i)=>
               <div key={i} className={message.isBot?"chat bot p-4 mb-5 mt-5 ":"chat"}>
               <img className='chatimg' src={message.isBot?gptimg:'https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg'} alt="" />
               <p className="txt fs-4">{message.text}</p>
             </div>

          )}
          <div ref={msgEnd}></div>
        </div>
        
        </div>
      </div>
       
    <div className="row">

       
      <div className="col-md-12 ">
            
        <div className="chatFooter container">
          <div className="inp fixed-bottom w-100 p-3  justify-content-center align-items-center mx-auto">
            <input  type="text" className='text-center' placeholder='Type your Prompt Here !'  value={input} onChange={(e)=>{setInput(e.target.value)}}/> 
            <button onClick={handleSend} type="button" disabled={!input.trim()} className="btn btn-success p-4 rounded-4"><i class="fa-solid fa-paper-plane fa-2xl"></i></button>
          </div>
          <p>Chat GPT may produce inaccurate information about people, places, or facts. ChatGPT August 20 Version</p>
        </div>

        </div>
       </div>

      </div>
          </div>   
    </div>

     

    

    </div>
  );
}

export default App;