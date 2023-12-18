import { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {

    const [searchQuery, setSearchQuery] = useState(null);

    return (
        <AppContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;