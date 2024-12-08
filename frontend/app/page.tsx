"use client";
import { Ads } from "@/components/Ads";
import { Post } from "@/components/Post";
import { useGetPosts } from "@/roupi/posts";
import { ChatIcon } from "@/components/shared/Icons";
import Logo from "@/public/static/logo.png"
import Image from "next/image";
import useWebSocket from "@/roupi/messages";
import { useStateContext } from "@/context/contextProvider";
import { useRef, useState, useEffect } from "react";

const Posts = () => {
  const { posts } = useGetPosts();
  console.log(posts)
  return (
    <div className="block space-y-10">
      {posts.map((post) => (
        <Post
          key={post.id}
          description={post.description}
          date={post.created_at}
          image={post.media}
          is_video={post.is_video}
        />
      ))}
    </div>
  );
};

interface MessageProps {
  profileImage: any;
  message: string;
  createdAt: string; // Should ideally be an ISO string for easy formatting
  username?: string; // Optional field for showing the sender's name
}

const Message: React.FC<MessageProps> = ({ profileImage, message, revers }) => {

  return (
    <div className={`flex ${revers ? '' : 'flex-row-reverse'} gap-x-2 items-center justify-center`}>
    <Image
      width={200}
      height={200}
        src={profileImage}
        alt="Profile"
        className="w-8 h-8 border border-purple-300  border-2 rounded-full object-cover"
        />
    <div className={`flex items-start ${revers ? 'bg-blue-600 text-white' : ''} font-bold p-2 w-[200px] space-x-4 bg-white shadow rounded-lg`}>
        <p className={`text-sm ${revers ? 'text-white' : 'text-gray-600'}`}>{message}</p>
    </div>
    </div>
  );
};

const Chat = ()=> {
  const {profile} = useStateContext()
  const msgRef = useRef()
  const chatRef = useRef()
  const chatOpenRef = useRef()
  const [messages, setMessage] = useState<[]>([]) 
  const {sendMessage} = useWebSocket(`wss://dashboard-web-copy-production.up.railway.app/ws/chat/${profile.id}/`, {
    onMessage: (newMessage: object) => setMessage((messages) => [...messages, newMessage]),
    onMessages: (oldMessages: []) => setMessage((messages) =>[...oldMessages, ...messages])  
  })
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);
  const handleSendMessage = () => {
    if (msgRef?.current?.value){
      sendMessage({
        sender: profile.id,
        msg: msgRef.current.value
      })
      msgRef.current.value = ''
    }
  } 
  return(<div className="fixed flex items-center justify-center rounded-full p-2 bg-blue-500 w-14 h-14 right-20 bottom-20 z-[1000]">
          <label className="cursor-pointer" htmlFor="chat">
            <ChatIcon/>
          </label>
          <input ref={chatOpenRef} type="checkbox" className="peer/chat hidden" name="chat" id="chat" />
          <div className="fixed p-2 items-cetner justify-between peer-checked/chat:block hidden bottom-[150px] right-[30px] z-[20000] border bg-gray-100 rounded-md h-[300px] w-[250px]">
          <div className="h-full flex flex-col justify-between">
            <div ref={chatRef} className="hover:overflow-y-auto overflow-y-hidden pb-2 space-y-2 h-full">
          {messages?.map((message)=>(
          <Message 
            message={message.message}
            revers={message.sender_id ? false : true  }
            profileImage={message.sender_id ? profile.image : Logo  } 
          />
          ))}
            </div>
          <div className="flex px-2 gap-2 pt-2">
            <input ref={msgRef} type="text"  className="w-full px-2 rounded-md"/>
            <button onClick={handleSendMessage} className="py-1 px-2 bg-blue-500 text-white font-bold rounded-md">Send</button>
          </div>
            </div>
          </div>
          </div>)
}

export default function Home() {
  const {profile} = useStateContext()
  return (
    <>
      <main>
        <Ads />
        <section className="py-4 px-16">
          <Posts />
        </section>
      </main>
      {profile.id && <Chat/>}
    </>
  );
}
