import React from "react";
import { BsListUl } from "react-icons/bs";
import { TbLayoutGrid } from "react-icons/tb";
import { AiOutlineFieldTime, AiOutlineCar } from "react-icons/ai";
import { BsCalendar4Week } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";
import { MdOutlineContentPaste } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

const icons = {
  cautionsIcon: <BsListUl />,
  timesheetIcon: <AiOutlineFieldTime />,
  projetIcon: <TbLayoutGrid />,
  congesIcon: <BsCalendar4Week />,
  gestionContrats: <MdOutlineContentPaste />,
  gestionClients: <RiUserSettingsLine />,
  gestionVehicules: <AiOutlineCar />,
  gestionLivraison:<TbTruckDelivery/>
};

const MenuIcon = ({ icon }) => {
  return icons[icon]
};

export default MenuIcon;
