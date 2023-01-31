import { Descriptions, Modal } from 'antd'
import React from 'react'

const ShowEvent = ({isModalEditOpen,setIsModalEditOpen}) => {
  return (
    <Modal title="Evenement" centered open={isModalEditOpen} onOk={()=>setIsModalEditOpen(false)} cancelText="Modifier" onCancel={()=>setIsModalEditOpen(false)}>
  <Descriptions column={2} className="mt-5">
    <Descriptions.Item label="Prenom">Foulen</Descriptions.Item>
    <Descriptions.Item label="Nom">Ben Foulen</Descriptions.Item>
    <Descriptions.Item label="CIN">01253698</Descriptions.Item>
    <Descriptions.Item label="Telephone">+216 22 254 236</Descriptions.Item>
    <Descriptions.Item label="Date">15-01-2023</Descriptions.Item>
    <Descriptions.Item label="Heure">10:30</Descriptions.Item>
    <Descriptions.Item label="Remarque" span={2}>
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </Descriptions.Item>
  </Descriptions>
  </Modal>
  )
}

export default ShowEvent