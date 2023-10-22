import { useQuery } from "react-query"
import { MQTT } from "../service/mqtt"

export const UseGetDataMqtt = (topic) => {
    const {dataone} = MQTT.GetDataMQTT('pumma/canti')
    return useQuery('getData', () => dataone, {
        initialData : dataone
    })
    // return useQuery(['getdatamqtt'], () => MQTT.GetDataMQTT(topic))
}