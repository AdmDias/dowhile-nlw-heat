import { SignOut } from "phosphor-react";
import { useContext } from "react";
import { GithubLogo } from "../assets/GithubLogo";
import { AuthContext } from "../contexts/auth";

export function SendMessageForm() {
    const { user } = useContext(AuthContext)

    return (
        <div className="flex flex-col items-center self-center text-center relative bg-gray-800 p-6">
            <button className="absolute top-6 left-6 cursor-pointer bg-transparent border-0 text-gray-200 hover:brightness-90">
                <SignOut size={32} />
            </button>

            <header>
                <div>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong>
                    {user?.name}
                </strong>
                <span>
                    <GithubLogo size={16} />
                    {user?.login}
                </span>
            </header>

            <form>
                <label htmlFor="message">
                    Mensagem
                </label>
                <textarea
                    id="message"
                    name="message"
                    placeholder="Qual sua expectativa para o evento?"
                />

                <button type="submit">
                    Enviar mensagem
                </button>
            </form>
        </div>
    )
}