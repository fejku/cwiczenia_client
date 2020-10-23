import React, {useState} from 'react';

export interface IDodajWage {
  czyWyswietlicDodawanieWagiGetSet: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  dataGetSet: [Date, React.Dispatch<React.SetStateAction<Date>>];
  wagaGetSet: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const DodajWageContext = React.createContext({} as IDodajWage);

export const DodajWageProvider: React.FC = ({ children }) => {
  const [czyWyswietlicDodawanieWagi, setCzyWyswietlicDodawanieWagi] = useState(false);
  const [data, setData] = useState(new Date());
  const [waga, setWaga] = useState("0.0");

  return (
    <DodajWageContext.Provider value={{ 
      czyWyswietlicDodawanieWagiGetSet: [czyWyswietlicDodawanieWagi, setCzyWyswietlicDodawanieWagi], 
      dataGetSet: [data, setData],
      wagaGetSet: [waga, setWaga], 
     }}
    >
      {children}
    </DodajWageContext.Provider>
  );
};