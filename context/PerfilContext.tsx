import React, { createContext, useContext, useState, ReactNode } from 'react'

type PerfilContextType = {
  foto: string | null
  setFoto: (uri: string | null) => void
}

const PerfilContext = createContext<PerfilContextType>({
  foto: null,
  setFoto: () => {}
})

export const PerfilProvider = ({ children }: { children: ReactNode }) => {
  const [foto, setFoto] = useState<string | null>(null)
  return (
    <PerfilContext.Provider value={{ foto, setFoto }}>
      {children}
    </PerfilContext.Provider>
  )
}


export const usePerfil = () => useContext(PerfilContext)
