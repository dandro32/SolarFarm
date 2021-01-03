import React, {useState} from 'react';

export const AppContext = React.createContext({});

const DUMMY_SOLAR_ITEMS = [...Array(30).keys()].map((nr) => ({
  id: `id_${nr}`,
  name: `Solar Panel: ${nr}`,
  details: [],
}));

const AppContextProvider = ({children}) => {
  const items = DUMMY_SOLAR_ITEMS;

  return (
    <AppContext.Provider
      value={{
        items,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
