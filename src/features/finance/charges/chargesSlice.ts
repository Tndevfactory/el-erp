import { createSlice } from "@reduxjs/toolkit";

const charges = [
  {
    id: 1,
    titre_frais: "Déplacement taxi",
    description_frais: "taxi pour rencontrer le client ",
    montant_frais: 12.525,
    date_frais: "20-06-2022",
    file_preuve_frais: "capture_image_compteur",
    status_remboursement_frais: "En cours de traitement",
    date_remboursement_frais: "28-05-2022",
    titre_projet: "Installation serveur rs523",
    projet_id: 1,
    user_name: "Karim ben Ahmed",
    user_id: 1,
  },
  {
    id: 2,
    titre_frais: "Repas diner restaurant ",
    description_frais: "Repas diner restaurant sousse",
    montant_frais: 62.855,
    date_frais: "27-06-2022",
    file_preuve_frais: "capture_ticket de caisse",
    status_remboursement_frais: "Complement d'information",
    date_remboursement_frais: "28-05-2022",
    titre_projet: "Installation serveur rs523",
    projet_id: 1,
    user_name: "Karim ben Ahmed",
    user_id: 1,
  },
  {
    id: 3,
    titre_frais: "Séjour hotel",
    description_frais: "3 jours hotel mouradi  4 etoiles à sousse ",
    montant_frais: 312.655,
    date_frais: "28-06-2022",
    file_preuve_frais: "capture_image_compteur",
    status_remboursement_frais: "Traité",
    date_remboursement_frais: "28-05-2022",
    titre_projet: "Installation serveur rs523",
    projet_id: 1,
    user_name: "Karim ben Ahmed",
    user_id: 1,
  },

  {
    id: 4,
    titre_frais: "Divers dépenses",
    description_frais: "achat de friandises ",
    montant_frais: 8.655,
    date_frais: "29-06-2022",
    file_preuve_frais: "capture_image_friandise",
    status_remboursement_frais: "Rejeté",
    date_remboursement_frais: "28-05-2022",
    titre_projet: "Installation serveur rs523",
    projet_id: 1,
    user_name: "Karim ben Ahmed",
    user_id: 1,
  },
];

export interface ICharge {
  id: number;
  titre_frais: string;
  description_frais: string;
  montant_frais: number;
  date_frais: string;
  file_preuve_frais: string;
  status_remboursement_frais: string;
  date_remboursement_frais: string;
  titre_projet: string;
  projet_id: number;
  user_name: string;
  user_id: number;
}

const initialState = {
  charges: charges,
};

const chargeContractSlice = createSlice({
  name: "chargeContract",
  initialState,
  reducers: {},
});

export const {} = chargeContractSlice.actions;

export default chargeContractSlice.reducer;
