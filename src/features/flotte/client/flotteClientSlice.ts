import { createSlice } from "@reduxjs/toolkit";
const clients = [
    {
      code_dossier: 92548795,
      code_client: 62202203,
      telephone: 20220623,
      designation: "Walid wechteti",
    },
    {
      code_dossier: 59248795,
      code_client: 36220220,
      telephone: 98220623,
      designation: "Safa mostafa",
    },    {
      code_dossier: 11548795,
      code_client: 74202203,
      telephone: 50220623,
      designation: "Sihem ayedi",
    },    {
      code_dossier: 13548795,
      code_client: 48202203,
      telephone: 26220623,
      designation: "Mansour ahmadi",
    },    {
      code_dossier: 12548795,
      code_client: 65802203,
      telephone: 22245523,
      designation: "Abdaziz amri",
    },
  ];

  export interface IClient {
    code_dossier?: number,
    code_client: number,
    telephone: number,
    designation: string,
  }

  const initialState = {
    clients: clients,
  };

  const flotteClientSlice = createSlice({
    name: "flotteClient",
    initialState,
    reducers: {
      addClient: (state, action) => {
        state.clients.push(action.payload);
      },
    },
  });
  
  export const {
    addClient
  } = flotteClientSlice.actions;
  
  export default flotteClientSlice.reducer;
  