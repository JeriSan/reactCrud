import { useState } from 'react'
import './App.css'
import React from 'react'
import MainComponent from './Components-main/Main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MainComponent/>
    </>
  )
}

export default App
