import { useContext, useEffect, useState } from 'react'
import ChatBox from '../../components/chatBox/ChatBox'
import LeftSideBar from '../../components/leftSideBar/LeftSideBar'
import RightSideBar from '../../components/rightSideBar/RightSideBar'
import './chat.css'
import { AppContext } from '../../context/AppContext'

const Chat = () => {
  const {chatData, userData} = useContext(AppContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (chatData && userData) {
      setLoading(false)
    }
  }, [chatData, userData])

  return (
    <div className="chat">
      {
        loading
        ?
        <p className='loading'>Loading...</p>
        :
        <div className="chat-container">
        <LeftSideBar />
        <ChatBox />
        <RightSideBar />
      </div>
      }
    </div>
  )
}

export default Chat