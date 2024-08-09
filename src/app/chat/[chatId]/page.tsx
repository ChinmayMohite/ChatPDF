import React from 'react'
import { auth } from '@clerk/nextjs/server';
type Props = {
  params : {
    chatId : string;
  }
}

const ChatPage = async ({params: {chatId}}: Props) => {
  const {userId} = await auth();
  return (
    <div>ChatPage {chatId}</div>
  )
}

export default ChatPage