import React, { useEffect, useState } from "react";
import {
  Button,
  Space,
  Table,
  Input,
  Breadcrumb,
  Card,
  Col,
  Row,
  Typography,
  Select,
  DatePicker,
  Divider,
  InputNumber,
} from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { getAllProjects } from "@/features/project/projectSlice";
import { useDispatch } from "react-redux";
const { Title, Link } = Typography;
const { Option } = Select;
const dateFormat = "DD-MM-YY";
const test = {
  debut:"",
  fin:"",
  projet_id:[],
  type_activite:[],
  activite:[],
  h_lun:[],
  h_mar:[],
  h_mer:[],
  h_jeu:[],
  h_ven:[],
  h_sam:[],
  h_dim:[],
  totalproj:[],
  tot_lun:"",
  tot_mar:"",
  tot_mer:"",
  tot_jeu:"",
  tot_ven:"",
  tot_sam:"",
  tot_dim:"",
  total_timesheet:""
}
const InputTimesheet = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(dayjs());
  const [cp, setCp] = useState(1);
  const [timesheet, setTimesheet] = useState([{ id: 0, details:[null,null,null,0,0,0,0,0,0,0,0] }]);
  const [total, setTotal] = useState([null,null,null,0,0,0,0,0,0,0,0]);
  const [projects, setProjects] = useState([]);
  const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
    `${dayjs(value).startOf("week").add(1, "day").format(dateFormat)} ~ ${dayjs(
      value
    )
      .endOf("week")
      .add(1, "day")
      .format(dateFormat)}`;

  //select search and sort
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const filterSort = (optionA, optionB) =>
    (optionA?.label ?? "")
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toLowerCase());

  useEffect(() => {
    dispatch(getAllProjects())
      .unwrap()
      .then((originalPromiseResult) => {
        setProjects(originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  }, []);
  return (
    <div>
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Timesheet</Breadcrumb.Item>
        <Breadcrumb.Item href="">Mes Timesheets</Breadcrumb.Item>
      </Breadcrumb>
      <Card
        className="mt-5"
        title={<Title level={4}>Créer un Timesheet</Title>}
        bordered={false}
      >
        <Row gutter={12} className="mt-3">
          <Col offset={1} span={9}>
            <Title level={5}> Statut Timesheet : NON CRÉÉ</Title>
          </Col>
          <Col offset={8} span={4}>
            <DatePicker
              format={customWeekStartEndFormat}
              className="w-full"
              defaultValue={date}
              picker="week"
              onChange={(e) => {
                setDate(e);
              }}
            />
          </Col>
        </Row>
        <Divider />
        <Row gutter={12} className="mt-3 ml-4">
          <Col span={3} className="text-center font-bold">
            Projet
          </Col>
          <Col span={2} className="text-center font-bold	">
            Type
          </Col>
          <Col span={3} className="text-center font-bold">
            Tâche
          </Col>
          <Col span={2} className="text-center">
            <Space direction="vertical">
              <span>Lun</span>
              <span className="text-[#ff0101]">{date.day(1).format("DD")}</span>
            </Space>
          </Col>
          <Col span={2} className="text-center">
            <Space direction="vertical">
              <span>Mar</span>
              <span className="text-[#ff0101]">{date.day(2).format("DD")}</span>
            </Space>
          </Col>
          <Col span={2} className="text-center">
            <Space direction="vertical">
              <span>Mer</span>
              <span className="text-[#ff0101]">{date.day(3).format("DD")}</span>
            </Space>
          </Col>
          <Col span={2} className="text-center">
            <Space direction="vertical">
              <span>Jeu</span>
              <span className="text-[#ff0101]">{date.day(4).format("DD")}</span>
            </Space>
          </Col>
          <Col span={2} className="text-center">
            <Space direction="vertical">
              <span>Ven</span>
              <span className="text-[#ff0101]">{date.day(5).format("DD")}</span>
            </Space>
          </Col>
          <Col span={2} className="text-center bg-[#D0D3D4]">
            <Space direction="vertical">
              <span>Sam</span>
              <span className="text-[#ff0101]">{date.day(6).format("DD")}</span>
            </Space>
          </Col>
          <Col span={2} className="text-center bg-[#D0D3D4]">
            <Space direction="vertical">
              <span>Dim</span>
              <span className="text-[#ff0101]">{date.day(7).format("DD")}</span>
            </Space>
          </Col>
          <Col span={2} className="text-center font-bold">
            Total (h)
          </Col>
        </Row>
        <Divider />
        {timesheet.map((item, index) => (
          <div key={item.id}>
            <Space>
              <CloseOutlined
                className="mt-3 text-[#ff0101]"
                onClick={() => {
                  setTimesheet(timesheet.filter((x) => x.id !== item.id));
                  // console.log(item.id)
                  // console.log(timesheet)
                  // console.log(timesheet.filter((x) => x.id !== item.id))
                }}
              />
              <Row gutter={12} className="mt-3">
                <Col span={3}>
                  <Select
                    className="w-full"
                    placeholder="Projet"
                    filterOption={filterOption}
                    filterSort={filterSort}
                    showSearch
                    allowClear
                  >
                    {projects.map((project) => (
                      <Option
                        key={project.id}
                        value={project.id}
                        label={project.designation}
                      >
                        {project.designation}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={2}>
                  <Select
                    className="w-full"
                    placeholder="Type"
                    options={[{ value: "0", label: "Documentation" },
                    { value: "1", label: "Développement" },
                    { value: "2", label: "Test" },
                    { value: "3", label: "Réunion" },
                    { value: "4", label: "Support" }]}
                    filterOption={filterOption}
                    filterSort={filterSort}
                    showSearch
                    allowClear
                  />
                </Col>
                <Col span={3}>
                  <Input
                    className="w-full"
                    placeholder="Tâche"
                    // options={[{ value: "lucy", label: "Lucy" }]}
                    // filterOption={filterOption}
                    // filterSort={filterSort}
                    // showSearch
                    // allowClear
                  />
                </Col>
                <Col span={2}>
                  <InputNumber
                    // decimalSeparator=":"
                    min={0}
                    max={24}
                    className="w-full"
                    defaultValue={0}
                    step="0.01"
                  />
                </Col>
                <Col span={2}>
                  <InputNumber
                    // decimalSeparator=":"
                    min={0}
                    max={24}
                    className="w-full"
                    defaultValue={0}
                    step="0.01"
                  />
                </Col>
                <Col span={2}>
                  <InputNumber
                    // decimalSeparator=":"
                    min={0}
                    max={24}
                    className="w-full"
                    defaultValue={0}
                    step="0.01"
                  />
                </Col>
                <Col span={2}>
                  <InputNumber
                    // decimalSeparator=":"
                    min={0}
                    max={24}
                    className="w-full"
                    defaultValue={0}
                    step="0.01"
                  />
                </Col>
                <Col span={2}>
                  <InputNumber
                    // decimalSeparator=":"
                    min={0}
                    max={24}
                    className="w-full"
                    defaultValue={0}
                    step="0.01"
                  />
                </Col>
                <Col span={2}>
                  <InputNumber
                    // decimalSeparator=":"
                    min={0}
                    max={24}
                    className="w-full"
                    defaultValue={0}
                    step="0.01"
                  />
                </Col>
                <Col span={2}>
                  <InputNumber
                    // decimalSeparator=":"
                    min={0}
                    max={24}
                    className="w-full"
                    defaultValue={0}
                    step="0.01"
                  />
                </Col>
                <Col span={2}>
                  <InputNumber
                    className="w-full"
                    defaultValue={0}
                    step="0.01"
                    disabled
                  />
                </Col>
              </Row>
            </Space>
            <Divider />
          </div>
        ))}
        <Row gutter={12} className="mt-3 ml-4">
          <Col span={8} className="text-center">
            <Title level={5}>Total (h)</Title>
          </Col>
          <Col span={2}>
            <InputNumber
              className="w-full"
              defaultValue={0}
              step="0.01"
              disabled
            />
          </Col>
          <Col span={2}>
            <InputNumber
              className="w-full"
              defaultValue={0}
              step="0.01"
              disabled
            />
          </Col>
          <Col span={2}>
            <InputNumber
              className="w-full"
              defaultValue={0}
              step="0.01"
              disabled
            />
          </Col>
          <Col span={2}>
            <InputNumber
              className="w-full"
              defaultValue={0}
              step="0.01"
              disabled
            />
          </Col>
          <Col span={2}>
            <InputNumber
              className="w-full"
              defaultValue={0}
              step="0.01"
              disabled
            />
          </Col>
          <Col span={2}>
            <InputNumber
              className="w-full"
              defaultValue={0}
              step="0.01"
              disabled
            />
          </Col>
          <Col span={2}>
            <InputNumber
              className="w-full"
              defaultValue={0}
              step="0.01"
              disabled
            />
          </Col>
          <Col span={2}>
            <InputNumber
              className="w-full"
              defaultValue={0}
              step="0.01"
              disabled
            />
          </Col>
        </Row>
        <Row gutter={24} className="mt-10 ml-1">
          <Col span={12}>
            <Link
              className="text-[#347bb7]"
              onClick={() => {
                setTimesheet([...timesheet, { id: cp, details:[null,null,null,0,0,0,0,0,0,0,0] }]);
                setCp(cp + 1);
                setTimeout(() => {
                  console.log(timesheet);
                }, 1000);
              }}
            >
              <PlusOutlined /> Ajouter une activité
            </Link>
          </Col>
          <Col span={12} className="text-right">
            <Space>
              <Button>Retour</Button>
              <Button type="primary">Enregistrer</Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default InputTimesheet;
