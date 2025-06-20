import { useState } from 'react'
import './App.css'
import Mario from './container/Mario/Mario'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Mario/>
    </>
  )
}

export default App
