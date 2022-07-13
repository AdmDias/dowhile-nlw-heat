import { useContext } from "react";
import { LoginBox } from "./components/LoginBox";
import { MessageList } from "./components/MessageList";
import { SendMessageForm } from "./components/SendMessageForm";
import { AuthContext } from "./contexts/auth";

export function App() {
  const { user } = useContext(AuthContext)

  return (
    <main className="max-w-[1200px] h-[100vh] my-0 mx-auto grid grid-cols-custom gap-x-[120px] relative">
      
      <MessageList />

      { 
        !!user ? <SendMessageForm/> : <LoginBox /> 
      }

    </main>
  )
}
