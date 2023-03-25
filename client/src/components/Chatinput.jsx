import React from "react";
import { useState } from "react";

const Chatinput = ({sendMessage,loading}) => {

const [value,setValue] = useState("")     //to hold input data
 
const handleSubmit = ()=> {
    if(value === "") return;
    sendMessage({sender:"user" , message: value})
    setValue("")
  }

  return (
    <div className='w-full bg-white bg-opacity-10 max-h-40 rounded-lg px-4
    py-4 overflow-auto relative'>
    
    {loading?
      <img src="./loader.gif" className="w-8 m-auto" />:
      <>
      
      
      <textarea 
      onKeyDown={(e)=> {
        e.keyCode === 13 && e.shiftKey === false && handleSubmit();               {/* if enter is pressed value should be send to chat  13 is code of enter . to go to nxt line in same chat use shift+enter ,for this we gave e.shiftkey === false */}
      }}

      rows={1} 
      className='border-0 bg-transparent outline-none w-11/12'
      value={value}
      type="text"
      onChange={(e)=>setValue(e.target.value)}
      />
     
      <img 
       onClick={handleSubmit}
       src="./send.png"
       width={20} alt="send-button" 
       className='absolute top-4 right-3 hover:cursor-pointer
        ease-in duration-100 hover:scale-125' />
        </>
        }

    </div>
  )
}

export default Chatinput
