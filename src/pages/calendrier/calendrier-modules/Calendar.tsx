import { Badge, Card, Space, Breadcrumb } from "antd";
import "@/style/modules/Calendar.less"
import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import AddEvent from "./AddEvent";
import ShowEvent from "./ShowEvent";
import moment from "moment/moment";
const Calendar = () => {
  const ws = useRef(null);
  const [events, setEvents] = useState([
    { title: "consultation", date: "2023-02-13 12:30", state: 3, color:"#52c41a"},
    { title: "rendez-vouz", date: "2023-02-15 09:00", state: 3, color:"#52c41a" },
    { title: "operation", date: "2023-02-09 10:30", state: 2, color:"#1677ff" },
    { title: "rendez-vouz", date: "2023-02-06 13:30", state: 2, color:"#1677ff" },
    { title: "operation", date: "2023-02-16 11:30", state: 2, color:"#1677ff" },
    { title: "rendez-vouz",start: "2023-02-06 14:30",end: "2023-02-06 15:00", state: 1, color:"#faad14" },
    { title: "rendez-vouz",  start: "2023-02-16 15:00",end: "2023-02-16 15:30", state: 0, color:"#ff4d4f" },
    { title: "rendez-vouz", start: "2023-02-22 11:00",end: "2023-01-22 13:30", state: 1, color:"#faad14" },
  ])
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  function renderEventContent(eventInfo) {
    return (
        <Space className="ml-2">
          {eventInfo.event._def.extendedProps.state === 3 ? (
            <Badge status="success" />
          ) : eventInfo.event._def.extendedProps.state === 0 ? (
            <Badge status="error" />
          ) : eventInfo.event._def.extendedProps.state === 2 ? (
            <Badge status="processing" />
          ) : (
            <Badge status="warning" />
          )}
          {eventInfo.event.title}
        </Space>
    );
  }
  const handleDateClick = (arg) => {
  };
    
  return (
    <div className="calendar">
            <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Mon calendrier</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="mt-5">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: "prev,next today myCustomButton",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
            // ,timeGridDay
          }}
          buttonText={{
            today:    "Aujourd'hui",
            month:    'Mois',
            week:     'Semaine',
            day:      'Jour',}
          }
          height={850}
          // themeSystem=""
          fixedWeekCount={false}
          locale='fr'
          allDaySlot={false}
          initialView="dayGridMonth"
          // weekends={false}
          events={events}
          eventContent={renderEventContent}
          eventColor="#2577ef"
          eventBackgroundColor="#2577ef"
          eventTextColor="white"
          dateClick={handleDateClick}
          eventClick={()=>{setIsModalEditOpen(true)}}
          //   editable={true}
          // selectable={true}
          // select={onSelect}
          //   selectMirror={true}
          //   dayMaxEvents={true}
          customButtons={{
            myCustomButton: {
                text: 'Ajouter evenement',
                click: function() {
                    setIsModalAddOpen(true)
                },
            },
        }}
        />
      </Card>
      <AddEvent isModalAddOpen={isModalAddOpen} setIsModalAddOpen={setIsModalAddOpen} setEvents={setEvents} events={events}/>
      <ShowEvent isModalEditOpen={isModalEditOpen} setIsModalEditOpen={setIsModalEditOpen}/>
    </div>
  );
};

export default Calendar;
