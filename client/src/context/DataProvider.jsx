import  React, { createContext, useState } from 'react'

export const DataContext = createContext(null)

const DataProvider = ({children}) => {

    const [user, setUser] = useState({username :'', name:''})
  return (
      <DataContext.Provider value={{
          user,
          setUser
      }}>
          {children}
      
    </DataContext.Provider>
  )
}

export default DataProvider
