import Image from "next/image";
import elon from './images/photo_1_2024-11-02_14-41-45.jpg'
import elon2 from './images/photo_2_2024-11-02_14-41-52.jpg';
import jeff from './images/photo_3_2024-11-02_14-41-52.jpg';
import jeff2 from './images/photo_5_2024-11-02_14-41-52.jpg';
import notify from './images/photo_4_2024-11-02_14-41-45.jpg';

const dataBase = [
    {userName: 'Jeff',
     fullNmae: 'Jeff Bezos',
     profileImage: jeff,
     reelsImage: jeff2
    },
    {userName: 'Elon',
        fullNmae: 'Elon Musk',
        profileImage: elon,
        reelsImage: elon2
    },
]

export default function HomePage(){
    return (
    <div className="border-2 w-96 p-4">
        <div className="flex justify-between">
            <h1>Live Notificaiton</h1>
            <div className="relative">
                <Image src={notify} alt="notification image" width={100} height={100} className="w-8"/>
                <span className="bg-red-500 text-white border-2 px-2 rounded-full p-1 absolute top-[-10] right-[-15]">0</span>
                <div className="border-2">modal</div>
            </div>
        </div>
    </div>
    )
}