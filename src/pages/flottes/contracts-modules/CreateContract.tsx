import React, { useState } from "react";
import {
  Button,
  Space,
  Drawer,
  Input,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  InputNumber,
  Upload,
  UploadProps,
  Radio
} from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addCaution } from "../../../features/caution/cautionSlice";

function CautionForm({ visible, setVisible, forceRefresh }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();


  const onClose = () => {
    setVisible(false);
  };
  const handleSubmit = (values) => {
    dispatch(
      addCaution({
        id: Math.random(),
        Nom_Projet: values.name,
        Demandeur: values.Demandeur,
        type_caution: values.type,
        DateD: moment(values.dateTime._d).format("DD/MM/YYYY"),
        Client: values.client,
        Montant: values.montant,
        ligne:values.ligne,
        Frais_mois: 20,
        Durée: values.Durée,
        Etat_main_levée: "En attente",
        Observation: values.Observation,
      })
    );
    forceRefresh(Math.random());
    setVisible(false);
    console.log(values)
  };
  return (
    <Drawer
      title="Nouveau contrat"
      width={720}
      className="CautionForm"
      onClose={onClose}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >

    </Drawer>
  );
}

export default CautionForm;
