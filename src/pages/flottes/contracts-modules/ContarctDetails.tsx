import React, { useEffect, useState, useRef } from 'react'
import {
  UploadProps,
  Button,
  Space,
  Drawer,
  Input,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Popconfirm,
  message,
  Popover,
  InputNumber,
  Upload,
  Divider,
  Typography,
} from 'antd'
import { QuestionCircleOutlined, InboxOutlined } from '@ant-design/icons'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import {
  addDuration,
  deleteCaution,
  updateCaution,
  CautionApprove
} from '@/features/caution/cautionSlice'
import {
  getOneCaution,
  closeCaution,
} from '@/features/caution/cautionSlice'

const { Dragger } = Upload
const { Option } = Select
const { Title } = Typography

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
    } else if (status === 'error') {
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files)
  },
}
function CautionDetails({ visible, setVisible, forceRefresh }) {
  var { caution } = useSelector((store: any) => store.caution)
  const dispatch = useDispatch()
  const [fields, setFields] = useState([])

  const onClose = () => {
    setVisible(false)
  }

  useEffect(() => {
    if (visible) {
      setFields([
        {
          name: ['nomProjet'],
          value: caution.Nom_Projet,
        },
        {
          name: ['demandeur'],
          value: caution.Demandeur,
        },
        {
          name: ['type'],
          value: caution.type_caution,
        },
        {
          name: ['client'],
          value: caution.Client,
        },
        {
          name: ['montant'],
          value: caution.Montant,
        },
        {
          name: ['dateD'],
          value: moment(caution.DateD, 'DD/MM/YYYY'),
        },
      ])
    }
  }, [])

  return (
    <Drawer
      title={'Détails de contrat'}
      className="CautionDetails"
      width={720}
      onClose={onClose}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }} 
    >
      
    </Drawer>
  )
}

export default CautionDetails
