import { useState } from 'react'
import './App.css'
import Router from './router'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Router />
    </div>
  )
}

export default App
