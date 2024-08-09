import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const ChatInput = ({ user, clickedUser, getUserMessages, getClickedUsersMessages }) => {
  const [textArea, setTextArea] = useState("")
  const userId = user?.user_id
  const clickedUserId = clickedUser?.user_id

  const addMessage = async () => {
      const message = {
          timestamp: new Date().toISOString(),
          from_userId: userId,
          to_userId: clickedUserId,
          message: textArea
      }

      try {
          await axios.post('http://localhost:8000/message', { message })
          getUserMessages()
          getClickedUsersMessages()
          setTextArea("")
      } catch (error) {
          console.log(error)
      }
  }


  return (
      <div className="chat-input w-4/5 justify-center gap-5 fixed -mt-3">
          <textarea className='border-2 w-full h-full rounded-md' value={textArea} 
           placeholder="Type your message..."
          onChange={(e) => setTextArea(e.target.value)}/>
          <button className="secondary-button" onClick={addMessage}>Submit</button>
      </div>
  )
}
export default ChatInput

