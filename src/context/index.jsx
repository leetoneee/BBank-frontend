import { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {

    const [showBalance, setShowBalance] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        fetch("https://reqres.in/api/users/2")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setUserData(res.data);
            })
    }, []);

    return <GlobalContext.Provider value={{
        userData,
        showBalance,
        setShowBalance,
    }}>{children}
    </GlobalContext.Provider>
}

