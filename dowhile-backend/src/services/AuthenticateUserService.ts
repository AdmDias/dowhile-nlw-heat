import axios from "axios";
import { sign } from "jsonwebtoken";
import prismaClient from "../prisma";

interface AccessTokenResponse {
    access_token: string;
}

interface UserDataResponse {
    avatar_url: string;
    login: string;
    id: number;
    name: string;
}

export class AuthenticateUserService {
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token"

        const { data } = await axios.post<AccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                Accept : "application/json"
            }
        })

        //return data;
        const { data: userData } = await axios.get<UserDataResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${ data.access_token }`
            }
        })

        const { id, login, name, avatar_url } = userData;

        let userDB = await prismaClient.users.findFirst({
            where: {
                github_id: id
            }
        })

        if (!userDB) {
            userDB = await prismaClient.users.create({
                data: {
                    github_id: id,
                    login: login,
                    name: name,
                    avatar_url: avatar_url,
                }
            })
        }

        const token = sign(
            {
                userDB: {
                    id: userDB.id,
                    name: userDB.name,
                    avatar_url: userDB.avatar_url,
                }    
            },
            process.env.JWT_SECRET,
            {
                subject: userDB.id, 
                expiresIn: "1d"
            }
        )

        return { token, userDB }
    }
}