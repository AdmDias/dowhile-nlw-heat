import { useContext } from "react";
import { GithubLogo } from "../assets/GithubLogo";
import { AuthContext } from "../contexts/auth";

export function LoginBox() {
    const { signInUrl } = useContext(AuthContext)

    return (
        <div className="flex flex-col justify-end items-center w-full h-[100vh] pb-[123px] bg-loginImage bg-cover bg-no-repeat bg-center">
            <strong className="text-3xl text-center">Entre e compartilhe sua mensagem</strong>
            <a href={signInUrl} className="flex items-center justify-center gap-3 bg-yellow-400 mt-8 py-0 px-10 h-14 text-gray-900 text-sm font-bold uppercase no-underline hover:brightness-90">
                <GithubLogo size={24} color={null} />
                Entrar com Github
            </a>
        </div>
    )
}