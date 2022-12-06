import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProCard, ProFormField } from '@ant-design/pro-components';
import type { InputRef } from 'antd';
import { Button, Form, Input, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import { domainToASCII } from 'url';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


type DataSourceType = {
  id: React.Key;
  title?: string;
  labels?: {
    key: string;
    label: string;
  }[];
  state?: string;
  created_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: 'activity name one',
    labels: [{ key: 'woman', label: 'woman' }],
    state: 'open',
    created_at: '1590486176000',
  },
  {
    id: 624691229,
    title: 'Activity name two	',
    labels: [{ key: 'man', label: 'man' }],
    state: 'closed',
    created_at: '1590481162000',
  },
];

const columns: ProColumns<DataSourceType>[] = [
  {
    title: 'Event name',
    dataIndex: 'title',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '30%',
  },
  {
    title: 'state',
    key: 'state',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum: {
      all: { text: 'Default', status: 'Default' },
      open: {
        text: 'Error',
        status: 'Error',
      },
      closed: {
        text: 'Success',
        status: 'Success',
      },
    },
  },
  {
    title: 'labels',
    dataIndex: 'labels',
    width: '20%',
    renderFormItem: (_, { isEditable }) => {
      return !isEditable ? <Input />: <Input/>;
    },
    render: (_, row) => row?.labels?.map((item) => <Tag key={item.key}>{item.label}</Tag>),
  },
  {
    // title: 'option',
    valueType: 'option',
    width: 250,
    render: (text, record, _, action) => [
    //   <a
    //     key="editable"
    //     onClick={() => {
    //       action?.startEditable?.(record.id);
    //     }}
    //   >
    //     edit
    //   </a>
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [form] = Form.useForm();
  return (
    <>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            actionRef.current?.addEditRecord?.({
              id: (Math.random() * 1000000).toFixed(0),
              title: 'default',
            });
          }}
          icon={<PlusOutlined />}
        >
          new line
        </Button>
        <Button
          key="rest"
          onClick={() => {
            actionRef.current?.cancelEditable?.("5");
          }}
        >
          cancel
        </Button>
      </Space>

      <EditableProTable<DataSourceType>
        rowKey="id"
        actionRef={actionRef}
        headerTitle="editable form"
        maxLength={5}

        recordCreatorProps={false}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          form,
          editableKeys,
          onSave: async () => {
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
      />
    </>
  );
};