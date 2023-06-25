import { createContext } from 'react'
export const LoginContext = createContext({ 
    userName: '', 
    setUserName: () => {}, 
    setDisplayAdmin: ()=> {},
    setDisplayBucatar: ()=> {}, 
    setDisplayVanzator: ()=> {}, 
    setDisplayClient: ()=> {}
})