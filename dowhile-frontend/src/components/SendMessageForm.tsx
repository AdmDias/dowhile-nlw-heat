import { SignOut } from "phosphor-react";
import { FormEvent, useContext, useState } from "react";
import { GithubLogo } from "../assets/GithubLogo";
import { AuthContext } from "../contexts/auth";
import { api } from "../services/api";

export function SendMessageForm() {
    const { user, handleSignOut } = useContext(AuthContext)

    const [message, setMessage] = useState('')

    async function handleSendMessage(event : FormEvent) {
        event.preventDefault()

        if (!message.trim()) {
            return;
        }

        await api.post('message', { message })

        alert("Message send successfully!")
    }

    return (
        <div className="flex flex-col items-center self-center text-center relative bg-gray-800 p-6">
            <button 
                onClick={handleSignOut}
                className="absolute top-6 right-6 cursor-pointer bg-transparent border-0 text-gray-200 hover:brightness-90"
            >
                <SignOut size={32} />
            </button>

            <header className="flex flex-col items-center pt-6">
                <div className="w-fit h-fit p-[2px] bg-gradient rounded-full leading-[0px]">
                    <img 
                        src={ user?.avatar_url } 
                        alt={ user?.name } 
                        className="w-24 h-24 border-4 border-gray-700 rounded-full"
                    />
                </div>
                <strong className="mt-4 text-2xl">
                    {user?.name}
                </strong>
                <span className="flex items-center mt-2 text-gray-200 gap-2">
                    <GithubLogo size={16} color={"#C4C4CC"} />
                    {user?.login}
                </span>
            </header>

            <form  
                onSubmit={handleSendMessage}
                className="flex flex-col self-stretch mt-10 bg-[#202024]"
            >
                <label 
                    htmlFor="message"
                    className="bg-gray-600 text-left py-[18px] px-6 font-bold"
                >
                    Mensagem
                </label>
                <textarea
                    id="message"
                    className="h-40 text-gray-100 text-base bg-transparent border-0 p-6 resize-none focus:outline-0 placeholder:text-gray-300"
                    name="message"
                    placeholder="Qual sua expectativa para o evento?"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />

                <button
                    type="submit"
                    className="flex items-center justify-center self-end cursor-pointer border-0 bg-[#FF008E] m-6 py-0 px-8 h-10 text-white text-sm font-bold uppercase no-underline hover:brightness-90"
                >
                    Enviar mensagem
                </button>
            </form>
        </div>
    )
}