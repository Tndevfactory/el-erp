import React from "react";
import { BsListUl } from "react-icons/bs";
import { TbLayoutGrid } from "react-icons/tb";
import { AiOutlineFieldTime, AiOutlineCar } from "react-icons/ai";
import { BsCalendar4Week, BsCalendar3 } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";
import { MdOutlineContentPaste } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { BsFileText } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { DollarCircleOutlined } from "@ant-design/icons";
import { SlGraduation } from "react-icons/sl";
import { HiOutlineTicket } from "react-icons/hi";



const icons = {
  cautionsIcon: <BsListUl />,
  timesheetIcon: <AiOutlineFieldTime />,
  projetIcon: <TbLayoutGrid />,
  congesIcon: <BsCalendar4Week />,
  gestionContrats: <MdOutlineContentPaste />,
  gestionClients: <RiUserSettingsLine />,
  gestionVehicules: <AiOutlineCar />,
  gestionLivraison:<TbTruckDelivery/>,
  gestionFactures:<BsFileText/>,
  grhIcon:<FiUsers/>,
  financeIcon:<DollarCircleOutlined />,
  flottesIcon: <AiOutlineCar />,
  formationsIcon: <SlGraduation/>,
  ticketingIcon: <HiOutlineTicket/>,
  calendrierIcon: <BsCalendar3/>,
};

const MenuIcon = ({ icon }) => {
  return icons[icon]
};

export default MenuIcon;
