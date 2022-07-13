import { useEffect, useState } from "react"
import logo from "../assets/logo.svg"
import { api } from "../services/api"

interface Messages {
    id: string;
    text: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

export function MessageList() {
    const [messages, setMessages] = useState<Messages[]>([])

    useEffect(() => {
        api.get<Messages[]>("messages/last3messages").then((response) => {
            setMessages(response.data)
        })
    })

    return (
        <div className="flex flex-col justify-between items-start">
            <img src={logo} alt="DoWhile 2021" className="h-7 my-8 mx-0"/>

            <ul className="flex flex-1 flex-col justify-center gap-10 list-none">
                {
                    messages.map(({ id, text, user}) => {
                        return (
                            <li key={id} className="max-x-[440px] even:ml-20">
                                <p className="text-xl">
                                    { text }
                                </p>
                                <div className="flex items-center mt-4">
                                    <div className="w-fit h-fit p-[2px] bg-gradient rounded-full leading-[0px]">
                                        <img 
                                            src={ user.avatar_url } 
                                            alt={ user.name } 
                                            className="w-8 h-8 border-4 border-gray-700 rounded-full"
                                        />
                                    </div>
                                    <span className="text-base ml-3">
                                        { user.name }
                                    </span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}