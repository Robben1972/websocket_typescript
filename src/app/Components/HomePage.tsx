import Image from "next/image"
import elon from "@/app/Components/images/elon.jpg"
import elon2 from "@/app/Components/images/elon2.jpg"
import amazon from "@/app/Components/images/amozon.jpg"
import jeff from "@/app/Components/images/jeff.jpg"
import like from "@/app/Components/images/like.svg"
import send from "@/app/Components/images/send.svg"
import notify from "@/app/Components/images/notify.jpg"
import john from "@/app/Components/images/john.jpg"
import { useEffect, useState } from "react"
import { Socket } from "socket.io-client"
import { log } from "console"


const DB = [
    {
        userName: 'Jeff',
        fullNmae: 'Jeff Bezos',
        profileImage: jeff,
        reelsImage: amazon
    },
    {
        userName: 'Elon',
        fullNmae: 'Elon Musk',
        profileImage: elon,
        reelsImage: elon2
    },
]

type homePagePropsType = {
    socket: Socket,
    name: string,
}

export default function HomePage({socket, name}: homePagePropsType){
    const [showModel, sendModel] = useState(false)
    const [message, setMessage] = useState<{sender: string, message: string}[]>([])
    const modalHandler = () => {
        sendModel((prev) =>!prev);
    }

    const likeAndShareHandler = (receiver: string, message: string) => {
        socket.emit('notify', {sender: name, receiver: receiver, message: message})
    };

    useEffect(() => {
        if(socket){
            socket.on('notification', (payload) => {
                // setMessage((prev) => [...prev, payload])
                console.log(payload);
                
            })
        }
    }, [socket])
    
    return (
        <div className="border-2 rounded-lg shadow-lg w-80 p-4 bg-white">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-lg font-semibold text-gray-700">Live Notification</h1>
                <div className="relative">
                    <Image 
                        onClick={modalHandler} 
                        src={notify} 
                        alt="notification icon" 
                        width={100} 
                        height={100} 
                        className="w-8 cursor-pointer hover:scale-105 transition-transform duration-200"
                    />
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2 border-2 border-white">{message.length}</span>
                </div>
            </div>
            <div className="border-2 flex flex-col gap-16">
            {DB.map((user, i) => (
                <div key={i}>
                    <div className="flex items-center gap-3">
                        <Image width={50} height={50} src={user.profileImage} alt="profile image" className="rounded-full size=11"/>
                        <h6>{user.fullNmae}</h6>
                    </div>
                    <div>
                        <Image width={400} height={300} src={user.reelsImage} alt="reels image" className="object-cover"/>
                    </div>
                    <div className="flex gap-2">
              <Image onClick={() => likeAndShareHandler(user.userName, 'liked your post')} src={like} alt="icon" width={50} height={50} />
              <Image onClick={() => likeAndShareHandler(user.userName, 'shared your post')} src={send} alt="icon" width={50} height={50} />
            </div>
                </div>
            ), )}
            </div>
            
            {showModel && (
                <div className="border-t mt-4 pt-4 text-gray-600 text-sm">
                    <p>This is your notification modal.</p>
                </div>
            )}
        </div>
        
    );
    

}