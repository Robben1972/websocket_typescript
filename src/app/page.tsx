"use client"

import { log } from "console";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { io ,Socket } from "socket.io-client";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/homePage";

export default function Home() {
  const [socket, setSocket] = useState<Socket>();
  const [name, setName] = useState<string>();

  const inputNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  useEffect(() => {
    setSocket(io("http://localhost:3001"));
  },[]);

  useEffect(() => {
    socket?.on('notify', (data) => {
      console.log(data);
      
    })
  }, [socket]);

  return <div className="grid place-items-center h-dvh">
    <LoginPage inputNameHandler={inputNameHandler}/>
    <HomePage/>
  </div>
}
