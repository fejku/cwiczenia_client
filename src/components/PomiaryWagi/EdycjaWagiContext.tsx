import React, { useState } from "react";

interface IEdycjaWagi {
  czyWyswietlicEdycjeWagiGetSet: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  dataGetSet: [Date, React.Dispatch<React.SetStateAction<Date>>];
  wagaGetSet: [string, React.Dispatch<React.SetStateAction<string>>];
}

const EdycjaWagiContext = React.createContext<Partial<IEdycjaWagi>>({});

const EdycjaWagiProvider: React.FC = ({ children }) => {
  const [czyWyswietlicEdycjeWagi, setCzyWyswietlicEdycjeWagi] = useState(false);
  const [data, setData] = useState(new Date());
  const [waga, setWaga] = useState("0.0");

  return (
    <EdycjaWagiContext.Provider
      value={{
        czyWyswietlicEdycjeWagiGetSet: [czyWyswietlicEdycjeWagi, setCzyWyswietlicEdycjeWagi],
        dataGetSet: [data, setData],
        wagaGetSet: [waga, setWaga],
      }}
    >
      {children}
    </EdycjaWagiContext.Provider>
  );
};

const useEdycjaWagiWyswietl = () => {
  const context = React.useContext(EdycjaWagiContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context.czyWyswietlicEdycjeWagiGetSet!;
};

const useEdycjaWagiData = () => {
  const context = React.useContext(EdycjaWagiContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context.dataGetSet!;
};

const useEdycjaWagiWaga = () => {
  const context = React.useContext(EdycjaWagiContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context.wagaGetSet!;
};

export { EdycjaWagiProvider, useEdycjaWagiWyswietl, useEdycjaWagiData, useEdycjaWagiWaga };
