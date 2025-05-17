import { useEffect } from 'react'
import './App.css'

function App() {

  useEffect(()=>{
    const checkServer = async ()=>{
      const res = await fetch("/api")
      const data = await res.json();
      console.log(data.message)
    }

    checkServer()
  },[])

  return (
    <>

    </>
  )
}

export default App
