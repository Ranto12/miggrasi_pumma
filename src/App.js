
import { UseGetDataMqtt } from "./hooks/mqtt";


function App() {
  // const {data : dataQuery} = UseGetDataMqtt()
const {data} = UseGetDataMqtt("pumma/canti")
console.log(data, "data query");

  return (
    <>
    <p className="font-bold text-3xl">{data?.DATETIME}</p>wkkw
    </>
  );
}

export default App;
