import {createContext, useState} from 'react'
import {Plantilla} from "../Models/Plantilla";
import {Text} from "react-native";

const GlobalContext=createContext();

const GlobalProvider=({children}:Plantilla)=>{


    const [correoContext, setCorreoContext] = useState()
    const [passwordContext, setPasswordContext] = useState()


    return (
        <GlobalContext.Provider value={{correoContext, setCorreoContext,passwordContext, setPasswordContext}}>
            {children}
        </GlobalContext.Provider>
    )

}




export{GlobalProvider};

export default GlobalContext