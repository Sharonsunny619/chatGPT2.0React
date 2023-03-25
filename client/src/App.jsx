import { useState } from "react";
import ChatBody from "./components/ChatBody";
import Chatinput from "./components/Chatinput";
import {useMutation} from 'react-query';    //for using react-query we must use a query-client as wrapper of whole application in main.jsx
import { fetchResponse } from './api';

function App() {
  const [chat, setChat] = useState([])

  const mutation = useMutation({               
    mutationFn: ()=> {                             
     return fetchResponse(chat);                      //returns fetch response data from api,same chat input in api.js ,it will keep track of state fn whether it is loading or contains data
    },                                                                                        // to get any kind of error msg  use onerror
    onSuccess: (data)=> setChat((prev)=> [...prev, {sender: 'ai', message: data.message.
    replace(/^\n\n/,"")}])                                                     //if any of this characters are given automatically by ai appears replace it with empty string
  })

  const sendMessage = async (message)=> {
    await Promise.resolve(setChat((prev)=>[...prev, message]))      //taking preciuos value destructing it and adds new value
    mutation.mutate();
  }
 

  return (
   <div className='bg-[#1A232E] h-screen py-6 relative sm:px-16 px-12
    text-white overflow-hidden flex flex-col justify-between align-middle'>

     {/* gradients */}

     <div className="gradient-01 z-0 absolute"></div>
     <div className="gradient-02 z-0 absolute"></div>

    {/* header */}
    <div className='uppercase font-bold text-2xl text-center mb-3'>ChatGPT2.0</div>

    {/* body */}
    <div className='h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4  self-center
     scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-transparent scrollbar-thumb-rounded-md'>
      <ChatBody chat={chat}/>
    </div>

    {/* input */}
    <div className='w-full max-w-4xl min-w-[20rem] self-center'> 
    <Chatinput sendMessage={sendMessage} loading={mutation.isLoading}/>
    </div>

   </div>
  )
}

export default App;
