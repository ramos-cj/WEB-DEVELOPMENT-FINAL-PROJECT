import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import Topbar from './Components/Topbar/Topbar'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Topbar/>
      <Admin/>
    </div>
  )
}

export default App