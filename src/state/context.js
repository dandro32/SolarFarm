import React, {useState} from 'react';

export const AppContext = React.createContext({});

const random0to100 = () => {
  return Math.floor(Math.random() * 100) + 1;
};

const ESTIMOTES = [
  '07eee35579ced631c138597030f8810e',
  '5af2b87c65c56e1ed93d499a9ecaad03',
  'f88d6665368fb02e305eeda57a88f13d',
  '43db0a382491e9f8b236150acac4902e',
];

const DUMMY_SOLAR_ITEMS = ESTIMOTES.map((id) => ({
  id: `id_${id}`,
  name: `Solar Panel: ${id}`,
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
