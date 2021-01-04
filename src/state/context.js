import React, {useState} from 'react';

export const AppContext = React.createContext({});

const random0to100 = () => {
  return Math.floor(Math.random() * 100) + 1;
};

const DUMMY_SOLAR_ITEMS = [...Array(30).keys()].map((nr) => ({
  id: `id_${nr}`,
  name: `Solar Panel: ${nr}`,
  distance: (Math.random() * 10).toFixed(1),
  details: {
    time: `${(Math.random() * 10).toFixed(0)} years`,
    producer: 'Tesla',
    status: Math.random() > 0.5 ? 'Active' : 'Inactive',
    lastYearActivity: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          data: [
            random0to100(),
            random0to100(),
            random0to100(),
            random0to100(),
            random0to100(),
            random0to100(),
          ],
          // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: ['Last year activity'],
    },
    productivity: {
      labels: ['Day', 'Night'],
      data: [Math.random(), Math.random()],
    },
    voltage: [random0to100(), random0to100(), random0to100(), random0to100()],
  },
}));

const AppContextProvider = ({children}) => {
  const items = DUMMY_SOLAR_ITEMS;

  const loadDetails = (id) => {
    return items.find((item) => item.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        loadDetails,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
