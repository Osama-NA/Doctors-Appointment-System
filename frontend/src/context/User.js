import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if(userInfo && userInfo.token){
      localStorage.setItem('token', userInfo.token)
      localStorage.setItem('id', userInfo._id)
    }
  }, [userInfo])
  
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };