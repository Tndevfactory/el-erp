import { createSlice } from "@reduxjs/toolkit";
const sheets = [
  {
    key: 0,
    entreprise: "TAC-TIC",
    employe: "Bassem Soua",
    detail: [
      {
        id: 0,
        projet: "GIP",
        tache: "Authentification",
        typeTache: "développement",
        nbrHeures: 8,
        date:"29/10/2022"
      },
      {
        id: 1,
        projet: "MSA",
        tache: "Gestion de fichiers",
        typeTache: "Conception",
        nbrHeures: 8,
        date:"31/10/2022"
      },
      {
        id: 2,
        projet: "ERP",
        tache: "Gestion de cautions",
        typeTache: "Conception",
        nbrHeures: 3,
        date:"01/11/2022"
      },
      {
        id: 2,
        projet: "EW",
        tache: "Gestion des espace",
        typeTache: "Conception",
        nbrHeures: 5,
        date:"01/11/2022"
      },
    ],
  },
  {
    key: 1,
    entreprise: "TAC-TIC",
    employe: "Wael Machlouch",
    detail: [
      {
        id: 0,
        projet: "MSA",
        typeTache: "développement",
        tache: "Authentification",
        nbrHeures: 8,
        date:"01/11/2022"
      },
      {
        id: 1,
        projet: "EW",
        tache: "Gestion de sites",
        typeTache: "développement",
        nbrHeures: 6,
        date:"30/10/2022"
      },
      {
        id: 5,
        projet: "ERP",
        tache: "gestion de projet",
        typeTache: "développement",
        nbrHeures: 4,
        date:"02/11/2022"
      },

      {
        id: 7,
        projet: "CIOK",
        tache: "réunion",
        typeTache: "réunion",
        nbrHeures: 2,
        date:"29/10/2022"
      },
      {
        id: 3,
        projet: "ERP",
        tache: "TimeSheet",
        typeTache: "développement",
        nbrHeures: 6,
        date:"29/10/2022"
      },
      {
        id: 4,
        projet: "EW",
        tache: "Maps",
        typeTache: "développement",
        nbrHeures: 6,
        date:"02/11/2022"
      },
      // {
      //   id: 8,
      //   projet: "EW",
      //   tache: "Maps",
      //   typeTache: "développement",
      //   nbrHeures: 6,
      //   date:"30/11/2022"
      // },
      {
        id: 10,
        projet: "CIOK",
        tache: "Maps",
        typeTache: "développement",
        nbrHeures: 4,
        date:"30/12/2022"
      },
      {
        id: 2,
        projet: "ERP",
        tache: "Gestion de cautions",
        typeTache: "développement",
        nbrHeures: 2,
        date:"30/10/2022"
      },
    ],
  },
  {
    key: 2,
    entreprise: "TAC-TIC",
    employe: "Amira Riahi",
    detail: [
      {
        id: 0,
        projet: "EW",
        tache: "Authentification",
        typeTache: "test",
        nbrHeures: 8,
        date:"30/10/2022"
      },
    ],
  },
  {
    key: 3,
    employe: "Asma Manaii",
    entreprise: "Smart Skills",
    detail: [
      {
        id: 0,
        projet: "MSA",
        tache: "Cautions",
        typeTache: "other",
        nbrHeures: 8,
        date:"01/11/2022"
      },
    ],
  },
];


export interface ISheet {
    key: number;
    employe: string;
    entreprise: string;
    detail: {
      id: number;
      projet: string;
      tache: string;
      typeTache: string;
      nbrHeures: number;
      date: string;
    }[];
}

const initialState = {
  sheets: sheets,
} 
const timesheetSlice = createSlice({
    name: "timesheet",
    initialState,
    reducers: {

    },
  });
  
  export const {  } = timesheetSlice.actions;
  
  export default timesheetSlice.reducer;
