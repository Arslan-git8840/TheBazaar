
'use client';
import { createContext, useState, useContext } from 'react';

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [cartsItems, setCartsItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [noOfCartItems, setNoOfCartItems] = useState(0);

  const value = {
    cartsItems,
    setCartsItems,
    userId,
    setUserId,
    noOfCartItems,
    setNoOfCartItems
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export const useEContext = () => useContext(Context);
