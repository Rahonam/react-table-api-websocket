import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import './App.css';
import { COLUMNS } from './components/columns';
import Datatable from './components/DataTable';
import { getProducts } from './services/api';
import { socketInstance, subscribeTicker } from './services/socket';

function App() {
  const columns = useMemo(()=>COLUMNS,[]);
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [channelStatus, setChannelStatus] = useState('Connecting to channel...');

  useEffect(()=>{
      getProducts()
      .then(res=>{
          console.log(res)
          setData(res.products)
          subscribeTicker(socketInstance,res.symbols)
      })
      .catch(err=>{
          console.log(err)
          setData([])
      })
      .finally(()=>setLoadingData(false))

      socketInstance.onopen = ()=>{
        setChannelStatus('Connected, waiting for channel messages...')
      }
      socketInstance.onerror = (ev)=>{
        setChannelStatus('Unable to connect channel!')
      }
      socketInstance.onclose = (ev)=>{
        setChannelStatus('Channel disconnected!')
      }
    
  },[])

  useEffect(()=>{
    socketInstance.onmessage = (ev)=>{
      const channelData = JSON.parse(ev.data)
      console.log(channelData)
      if(channelData && channelData.symbol){
        setChannelStatus('Channel is streaming now...')
        const index = data.findIndex(p=>p.symbol === channelData.symbol);
        if(index>-1){
          data[index] = {
            ...data[index],
            ...channelData
          }
          setData([...data])
          console.log(data)
        }
      }
    }
  },[data])

  return (
    <div className="App">
      {
        loadingData ? <h3>Loading...</h3> : 
        <div>
          <h3>{channelStatus}</h3>
          <Datatable columns={columns} data={data} width={500} height={500}></Datatable>
        </div>
      }
    </div>
  );
}

export default App;
