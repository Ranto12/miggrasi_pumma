import { useEffect, useState } from "react";
import mqtt from "mqtt/dist/mqtt";

export const MQTT = {
  GetDataMQTT:  (topic ) => {
    const [dataone, setDataOne] = useState();
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

    const connectUrl = `${process.env.REACT_APP_BASE_HOST_MQTT}:${process.env.REACT_APP_BASE_PORT_MQTT}`;
    useEffect(() => {
      const client = mqtt.connect(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: `${process.env.REACT_APP_BASE_USERNAME_MQTT}`,
        password: `${process.env.REACT_APP_BASE_PASSWORD_MQTT}`,
        reconnectPeriod: 1000,
        ca: process.env.REACT_APP_BASE_PORT_CERT,
        keyPath: process.env.REACT_APP_BASE_CLIENT_KEY_MQTT,
        certPath: process.env.REACT_APP_CLIENT_CERT_MQTT,
        rejectUnauthorized: false,
        protocol: "wss",
      });

      // export default nilai
      client.on("connect", () => {
        client.subscribe([topic], () => {});
      });
      client.on("message", (topic, payload) => {
        const data = payload.toString();
        setDataOne(JSON.parse(data));
      });

      return () => {
        // client.unsubscribe(topic);
        client.end();
      };
      // eslint-disable-line react-hooks/exhaustive-deps
    }, [topic]); // eslint-disable-line react-hooks/exhaustive-deps

    return { dataone };
  },
};

// const MQTT = (topic) => {
//     const [dataone, setDataOne] = useState();
//     const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

//     const connectUrl = `${process.env.REACT_APP_BASE_HOST_MQTT}:${process.env.REACT_APP_BASE_PORT_MQTT}`;
//     useEffect(() => {
//     const client = mqtt.connect(connectUrl, {
//         clientId,
//         clean: true,
//         connectTimeout: 4000,
//         username: `${process.env.REACT_APP_BASE_USERNAME_MQTT}`,
//         password: `${process.env.REACT_APP_BASE_PASSWORD_MQTT}`,
//         reconnectPeriod: 1000,
//         ca: process.env.REACT_APP_BASE_PORT_CERT,
//         keyPath: process.env.REACT_APP_BASE_CLIENT_KEY_MQTT,
//         certPath: process.env.REACT_APP_CLIENT_CERT_MQTT,
//         rejectUnauthorized: false,
//         protocol: "wss",
//       });

//       // export default nilai
//         client.on("connect", () => {
//           client.subscribe([topic], () => {
//           });
//         });
//         client.on("message", (topic, payload) => {
//           const data = payload.toString();
//           setDataOne(JSON.parse(data));
//         });

//         return () =>{
//           // client.unsubscribe(topic);
//           client.end();
//         }
//         // eslint-disable-line react-hooks/exhaustive-deps
//       }, []);   // eslint-disable-line react-hooks/exhaustive-deps

//       return {dataone}
//   }
