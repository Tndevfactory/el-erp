import React from 'react'
import {
  Card,
  Typography,
  Form,
  Input,
  Col,
  Row,
  Switch,
  InputNumber,
  Select,
  DatePicker
} from 'antd'
import Assurances from './Assurances'
import Entretien from './Entretien'
import ReplacementVehicle from './ReplacementVehicle'
const { Title } = Typography
const ConditionsContract = () => {
  const styleTitle: React.CSSProperties = {
    marginLeft: '10px',
  }
  const styleCard: React.CSSProperties = {
    padding: '10px',
    marginBottom: '15px',
  }
  const styleInputNumber: React.CSSProperties = {
    width: '100%',
  }
  return (
    <div>
      <Entretien/>
      <Assurances/>
      <ReplacementVehicle/>
    </div>
  )
}

export default ConditionsContract
