import React, { useState } from "react";
import IWaga from "../../interfaces/IWaga";

interface IEdycjaWagi {
  czyWyswietlicEdycjeWagiGetSet: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  dataGetSet: [Date, React.Dispatch<React.SetStateAction<Date>>];
  wagaGetSet: [string, React.Dispatch<React.SetStateAction<string>>];
  edytowanaWaga: [IWaga, React.Dispatch<React.SetStateAction<IWaga>>];
}

const EdycjaWagiContext = React.createContext<Partial<IEdycjaWagi>>({});

const EdycjaWagiProvider: React.FC = ({ children }) => {
  const [czyWyswietlicEdycjeWagi, setCzyWyswietlicEdycjeWagi] = useState(false);
  const [data, setData] = useState(new Date());
  const [waga, setWaga] = useState("0.0");
  const [edytowanaWaga, setEdytowanaWaga] = useState<Partial<IWaga>>({});

  return (
    <EdycjaWagiContext.Provider
      value={{
        czyWyswietlicEdycjeWagiGetSet: [czyWyswietlicEdycjeWagi, setCzyWyswietlicEdycjeWagi],
        dataGetSet: [data, setData],
        wagaGetSet: [waga, setWaga],
        edytowanaWaga: [edytowanaWaga, setEdytowanaWaga],
      }}
    >
      {children}
    </EdycjaWagiContext.Provider>
  );
};

const useEdycjaWagiWyswietl = () => {
  const context = React.useContext(EdycjaWagiContext);
  if (context === undefined) {
    throw new Error("useEdycjaWagiWyswietl must be used within a EdycjaWagiProvider");
  }
  return context.czyWyswietlicEdycjeWagiGetSet!;
};

const useEdycjaWagiData = () => {
  const context = React.useContext(EdycjaWagiContext);
  if (context === undefined) {
    throw new Error("useEdycjaWagiData must be used within a EdycjaWagiProvider");
  }
  return context.dataGetSet!;
};

const useEdycjaWagiWaga = () => {
  const context = React.useContext(EdycjaWagiContext);
  if (context === undefined) {
    throw new Error("useEdycjaWagiWaga must be used within a EdycjaWagiProvider");
  }
  return context.wagaGetSet!;
};

const useEdycjaWagiEdytowanaWaga = () => {
  const context = React.useContext(EdycjaWagiContext);
  if (context === undefined) {
    throw new Error("useEdycjaWagiEdytowanaWaga must be used within a EdycjaWagiProvider");
  }
  return context.edytowanaWaga!;
};

export { EdycjaWagiProvider, useEdycjaWagiWyswietl, useEdycjaWagiData, useEdycjaWagiWaga, useEdycjaWagiEdytowanaWaga };
