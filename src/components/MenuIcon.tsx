import React from 'react'
import { BsListUl } from 'react-icons/bs';
import { TbLayoutGrid } from 'react-icons/tb';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { BsCalendar4Week } from 'react-icons/bs';



const cautionsIcon=<BsListUl/>
const timesheetIcon=<AiOutlineFieldTime/>
const projetIcon=<TbLayoutGrid/>
const congesIcon=<BsCalendar4Week/>


const MenuIcon = ({icon}) => {
  return eval(icon)
}

export default MenuIcon