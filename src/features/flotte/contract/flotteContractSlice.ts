import { createSlice } from "@reduxjs/toolkit";
const contracts = [
    {
      code_dossier: 92548795,
      code_client: 20220623,
      date_etablissement: "28-06-2022",
      date_fin_prevue: "28-06-2022",
      nature_echeance: "annuelle",
      derniere_reglement: "28-06-2022",
    },
    {
        code_dossier: 87959254,
        code_client: 16232022,
        date_etablissement: "28-06-2022",
        date_fin_prevue: "28-06-2022",
        nature_echeance: "annuelle",
        derniere_reglement: "28-05-2022",
      },
      {
        code_dossier: 95928754,
        code_client: 23201622,
        date_etablissement: "28-07-2022",
        date_fin_prevue: "28-06-2022",
        nature_echeance: "trimestrielle",
        derniere_reglement: "28-06-2022",
      },
      {
        code_dossier: 54959287,
        code_client: 62232012,
        date_etablissement: "28-06-2022",
        date_fin_prevue: "28-05-2022",
        nature_echeance: "mensuel",
        derniere_reglement: "28-06-2022",
      },
      {
        code_dossier: 87959254,
        code_client: 16232022,
        date_etablissement: "28-06-2022",
        date_fin_prevue: "28-06-2022",
        nature_echeance: "annuelle",
        derniere_reglement: "28-07-2022",
      },
      {
        code_dossier: 95928754,
        code_client: 23201622,
        date_etablissement: "25-06-2022",
        date_fin_prevue: "28-07-2022",
        nature_echeance: "trimestrielle",
        derniere_reglement: "28-06-2022",
      },
      {
        code_dossier: 54959287,
        code_client: 62232012,
        date_etablissement: "25-05-2022",
        date_fin_prevue: "28-06-2022",
        nature_echeance: "mensuel",
        derniere_reglement: "28-06-2022",
      },
  ];

  export interface IContract {
    code_dossier: number,
    code_client: number,
    date_etablissement: string,
    date_fin_prevue: string,
    nature_echeance: string,
    derniere_reglement: string,
  }

  const initialState = {
    contracts: contracts,
  };

  const flotteContractSlice = createSlice({
    name: "flotteContract",
    initialState,
    reducers: {
    },
  });
  
  export const {
  } = flotteContractSlice.actions;
  
  export default flotteContractSlice.reducer;
  