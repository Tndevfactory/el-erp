import { createSlice } from "@reduxjs/toolkit";
const vehicules = [{
  immatriculation: "123TN2587",
  marque: "FIAT",
  modele: "Panda",
  puissance_fiscale: 4,
  puissance_cylindrée: 4,
  echeance_taxe: "23/12/2022",
  echeance_assurance: "20/04/2023",
  echeance_visite: "15/03/2023",
},{
  immatriculation: "203TN2057 ",
  marque: "HYUNDAI",
  modele: "I20",
  puissance_fiscale: 5,
  puissance_cylindrée: 4,
  echeance_taxe: "15/01/2023",
  echeance_assurance: "12/02/2023",
  echeance_visite: "07/03/2023",
},{
  immatriculation: "195TN2057 ",
  marque: "KIA",
  modele: "Picanto",
  puissance_fiscale: 4,
  puissance_cylindrée: 4,
  echeance_taxe: "01/01/2023",
  echeance_assurance: "20/04/2023",
  echeance_visite: "15/03/2023",
},{
  immatriculation: "195TN2057 ",
  marque: "HYUNDAI",
  modele: "I10",
  puissance_fiscale: 4,
  puissance_cylindrée: 4,
  echeance_taxe: "15/01/2023",
  echeance_assurance: "12/02/2023",
  echeance_visite: "07/03/2023",
},{
  immatriculation: "198TN3257 ",
  marque: "Volkswagen",
  modele: "Golf 6",
  puissance_fiscale: 6,
  puissance_cylindrée: 4,
  echeance_taxe: "01/01/2023",
  echeance_assurance: "20/04/2023",
  echeance_visite: "15/03/2023",
},{
  immatriculation: "195TN2057 ",
  marque: "KIA",
  modele: "Picanto",
  puissance_fiscale: 4,
  puissance_cylindrée: 4,
  echeance_taxe: "01/01/2023",
  echeance_assurance: "20/04/2023",
  echeance_visite: "15/03/2023",
},


  ];

  export interface IVehicule {
    immatriculation: string,
    marque: string,
    modele: string,
    puissance_fiscale: number,
    puissance_cylindrée: number,
    echeance_taxe: string,
    echeance_assurance: string,
    echeance_visite: string,
  }

  const initialState = {
    vehicules: vehicules,
  };

  const flotteVehiculeSlice = createSlice({
    name: "flotteVehicule",
    initialState,
    reducers: {
    },
  });
  
  export const {
  } = flotteVehiculeSlice.actions;
  
  export default flotteVehiculeSlice.reducer;
  