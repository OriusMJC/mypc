import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db as database } from "src/firebase/client";
import { getDatabase, ref, set, child, get, onValue } from "firebase/database";
import { useSelector } from 'react-redux';


function ChatCreated() {
  
  let {from, to} = useParams()
  let user = useSelector((state:any) => state.userDetails)

  let navigate = useNavigate()

	const starCountRef = ref(database, `chat/`);

  useEffect(() => {
    get(starCountRef).then(snapshot => {
      const data = snapshot.val()
      if(!data) {
        set(ref(database, `chat/${0}`), {
          users: [from, to],
          messages: [""],
        });
        navigate(`/chat/${from}/${to}`, {state: [{chat: {users: [from, to], messages: [""],}, chatId: 0}]})
      } else {
        let chatId
        let chat = data.filter((e, i) => {
          if(e.users.includes(from) && e.users.includes(to)) {
            chatId = i
            return e
          }
        })
        if(chat.length) {
          navigate(`/chat/${from}/${to}`, {state: chat})
        } else {
          set(ref(database, `chat/${data.length}`), {
            users: [from, to],
            messages: [""],
          });
          navigate(`/chat/${from}/${to}`, {state: [{chat: {users: [from, to], messages: [""],}, chatId: data.length}]})
        }
      }
  
    })
  }, [])



  return (
    <div></div>
  )
}

export default ChatCreated