import {createContext, useState} from 'react'
import {Plantilla} from "../Models/Plantilla";
import {Text} from "react-native";

const GlobalContext=createContext();

const GlobalProvider=({children}:Plantilla)=>{


    const [idContext, setIdContext] = useState()
    const [correoContext, setCorreoContext] = useState()
    const [passwordContext, setPasswordContext] = useState()



    return (
        <GlobalContext.Provider value={{correoContext, setCorreoContext,passwordContext, setPasswordContext, idContext,setIdContext}}>
            {children}
        </GlobalContext.Provider>
    )

}




export{GlobalProvider};

export default GlobalContext