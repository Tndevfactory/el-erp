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
