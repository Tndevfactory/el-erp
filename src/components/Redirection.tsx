import React, { useEffect } from 'react';
import { Button, Result, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getToken } from '@/features/redirection/redirectionSlice';

  const Redirection: React.FC = ()=>{
    const dispatch = useDispatch();
  let { token } = useParams();
  const navigate = useNavigate()
  const handleGetToken=()=>{
    
  }
  useEffect(()=>{
    setTimeout(() => {
    dispatch(getToken(token))
    .unwrap()
    .then((originalPromiseResult) => {
      localStorage.setItem('token',originalPromiseResult)
      navigate(`/finance`)
    })
    .catch((rejectedValueOrSerializedError) => {
      alert(rejectedValueOrSerializedError);
    });
    }, 2000);
  },[])
  return(
  // <Result
  //   status="success"
  //   title="Redirection successfully !"
  //   // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
  //   // extra={[
  //   //   <Button type="primary" key="console">
  //   //     Go Console
  //   //   </Button>,
  //   //   <Button key="buy">Buy Again</Button>,
  //   // ]}
  // />
  <div className='flex justify-center	min-h-screen relative	'>
    <Spin className='absolute top-1/3	' size="large" />
  </div>
  )
};

export default Redirection;