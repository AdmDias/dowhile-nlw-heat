import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface IAuthProvider {
    children: ReactNode;
}

interface IUser {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}

interface IAuthContextData {
    user: IUser | null;
    signInUrl: string;
    handleSignOut: () => void;
}

interface IAuthResponse {
    token: string;
    userDB: IUser; 
}

export const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider(props : IAuthProvider) {
    const [user, setUser] = useState<IUser | null>(null)

    const signInUrl = 'https://github.com/login/oauth/authorize?scope=user&client_id='

    async function handleSignIn(githubCode: string){
        const response = await api.post<IAuthResponse>('authenticate', {
            code: githubCode,
        })

        const { token, userDB } = response.data;

        localStorage.setItem('@dowhile:token', token)

        setUser(userDB)
    } 

    function handleSignOut() {
        setUser(null)
        localStorage.removeItem("@dowhile:token")
    }

    useEffect(() => {
        const token = localStorage.getItem('@dowhile:token')

        if (token) {
            // O Axios permite que a partir desta linha de codigo, toda requisição
            // que seja feita, havera o token no cabeçalho da requisição automaticamente
            api.defaults.headers.common.authorization = `Bearer ${token}`

            api.get<IUser>('userProfile').then(({ data }) => {
                setUser(data)
            })
        }
    }, [])

    useEffect(() => {
        const currentURL = window.location.href
        const hasGithubCode = currentURL.includes('?code=')

        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = currentURL.split('?code=')

            window.history.pushState({}, '', urlWithoutCode)

            handleSignIn(githubCode)
        }

    }, [])

    return(
        <AuthContext.Provider value={{ signInUrl, user, handleSignOut }}>
            { props.children }
        </AuthContext.Provider>
    )
}