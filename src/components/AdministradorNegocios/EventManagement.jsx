import React, { useEffect } from "react";

import { Tab, Tabs } from "@nextui-org/react";
import { getEventsfromBussiness } from "../../api/events";
import {
  merchantEvents,
  useBussinessStore,
  useUserStore,
} from "../../hooks/useStore";

import EventCard from "./EventCard";

export default function EventManagement() {
  const user = useUserStore((state) => state.user);
  const bussiness = useBussinessStore((state) => state.bussiness);
  const setBussiness = useBussinessStore((state) => state.setBussiness);

  // useEffect(() => {
  //   console.log(bussiness)
  //   const fetchBussiness = async () => {
  //     console.log("fetching bussiness");
  //     if (user === null) return;
  //     const b = await getOneBussiness(user.id);
  //     setBussiness(b);
  //   };

  //   return () => {
  //     if (bussiness === null) fetchBussiness();
  //   };
  // }, [user]);

  const events = merchantEvents((state) => state.events);
  const setEvents = merchantEvents((state) => state.setEvents);

  const fetchEvents = async () => {
    const eventList = await getEventsfromBussiness(bussiness.id);
    setEvents(eventList);
  };

  useEffect(() => {
    if (bussiness) {
      fetchEvents();
    }
  }, [bussiness]);

  return (
    <Tabs aria-label="seleccion de eventos" fullWidth>
      <Tab key="create" title="Crear Evento">
        {bussiness?.id && <EventCard bussinessId={bussiness.id} />}
      </Tab>
      {events.map((item) => (
        <Tab key={item.id} title={item.name}>
          <EventCard
            bussinessId={bussiness.id}
            bussiness={bussiness}
            event={item}
          />
        </Tab>
      ))}
    </Tabs>
  );
}
