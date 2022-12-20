import { createSlice } from "@reduxjs/toolkit";
const sessions = [
  {
    id: "21154",
    designation: "Laravel",
    domaine: "Laravel v9",
    date_debut: "12/12/2022",
    date_fin: "26/12/2022",
    participation: "A distance",
    sujet: "laravel v9 pour debutant",
    horaire_debut:"09:00:00",
    horaire_fin:"16:00:00",
    participants: [
      {
        id: "01",
        label: "Wael Machlouch",
        email: "wael.machlouch@tac-tic.net",
        img: "https://xsgames.co/randomusers/avatar.php?g=male",
      },
      {
        id: "02",
        label: "Nidhal Chalbia",
        email: "nidhal.chalbia@tac-tic.net",
        img: "https://xsgames.co/randomusers/avatar.php?g=male",
      },
      {
        id: "03",
        label: "Emna Ahmadi",
        email: "emna.ahmadi@tac-tic.net",
        img: "https://xsgames.co/randomusers/avatar.php?g=female",
      },
    ],
  },
  {
    id: "4211",
    designation: "React js",
    domaine: "React v18",
    date_debut: "12/12/2022",
    date_fin: "26/12/2022",
    participation: "Présentielle",
    sujet: "React v18 pour debutant",
    horaire_debut:"10:00:00",
    horaire_fin:"15:00:00",
    participants: [
      {
        id: "01",
        label: "Wael Machlouch",
        email: "wael.machlouch@tac-tic.net",
        img: "https://xsgames.co/randomusers/avatar.php?g=male",
      },
      {
        id: "02",
        label: "Nidhal Chalbia",
        email: "nidhal.chalbia@tac-tic.net",
        img: "https://xsgames.co/randomusers/avatar.php?g=male",
      },
      {
        id: "03",
        label: "Emna Ahmadi",
        email: "emna.ahmadi@tac-tic.net",
        img: "https://xsgames.co/randomusers/avatar.php?g=female",
      },
      {
        id: "05",
        label: "Nidhal Chalbia",
        email: "nidhal.chalbia@tac-tic.net",
        img: "https://xsgames.co/randomusers/avatar.php?g=male",
      },
      {
        id: "053",
        label: "Emna Ahmadi",
        email: "emna.ahmadi@tac-tic.net",
        img: "https://xsgames.co/randomusers/avatar.php?g=female",
      },
    ],
  },
];
export interface ISession {
  id: string;
  designation: string;
  domaine: string;
  date_debut: string;
  date_fin: string;
  participation: string;
  sujet: string;
  horaire_debut:string;
  horaire_fin:string;
  participants:{
      id: string;
      label: string;
      email: string;
      img: string;
    }[]
}
const initialState = {
    sessions: sessions,
  };

const sessionSlice = createSlice({
    name: "formation",
    initialState,
    reducers: {
    },
  });

export const {} = sessionSlice.actions;

export default sessionSlice.reducer;
