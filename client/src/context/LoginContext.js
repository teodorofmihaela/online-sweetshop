import { createContext, useState } from 'react'
export const LoginContext = createContext({ 
    userName: '', 
    setUserName: () => {}, 
    setDisplayAdmin: ()=> {},
    setDisplayBucatar: ()=> {}, 
    setDisplayVanzator: ()=> {}, 
    setDisplayClient: ()=> {}
})