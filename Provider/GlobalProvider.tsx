import {createContext, useState} from 'react'
import {Plantilla} from "../Models/Plantilla";
export interface IGlobalContext {
    idContext: any;
    setIdContext: (id: any) => void;
    correoContext: any;
    setCorreoContext: (correo: any) => void;
    passwordContext: any;
    setPasswordContext: (password: any) => void;
}
import {Text} from "react-native";

export const GlobalContext = createContext<IGlobalContext | null>(null);

const GlobalProvider = ({children}:Plantilla) => {


    const [idContext, setIdContext] = useState()
    const [correoContext, setCorreoContext] = useState()
    const [passwordContext, setPasswordContext] = useState()


    return (
        <GlobalContext.Provider value={{correoContext, setCorreoContext,passwordContext, setPasswordContext, idContext,setIdContext}}>
            {children}
        </GlobalContext.Provider>
    )

}




export default GlobalProvider;