import { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {

    const [showBalance, setShowBalance] = useState(false);


    return <GlobalContext.Provider value={{
        userData,
        showBalance,
        setShowBalance,
    }}>{children}
    </GlobalContext.Provider>
}

