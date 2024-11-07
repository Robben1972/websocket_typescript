"use client"

import { log } from "console";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { io ,Socket } from "socket.io-client";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/HomePage";

export default function Home() {
  const [socket, setSocket] = useState<Socket>();
  const [name, setName] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  
  const loginHandler = () => {
    if(name){
      setIsLoggedIn(true);
    }
  }

  const inputNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  useEffect(() => {
    if(isLoggedIn){
      setSocket(io("http://localhost:3001"));
    }
  },[isLoggedIn]);

  useEffect(() => {
    socket?.on('notify', (data) => {
      console.log(data);
      
    })
  }, [socket]);

  useEffect(() => {
    if (socket){
      socket.emit('joinUser', {userName: name})
    }
  }, [socket, name])

  return (
  <div className="grid place-items-center h-dvh">
    {isLoggedIn? (<HomePage socket={socket} name={name}/>) : (<LoginPage inputNameHandler={inputNameHandler} loginHandler={loginHandler}/>)}
  </div>
  )
}
