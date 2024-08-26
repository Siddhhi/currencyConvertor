import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/Navbar'
import Dropdown from './component/Dropdown'
import CurrencyCon from './component/CurrencyCon'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <CurrencyCon/>
      
    </>
  )
}

export default App
