import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/show'
import EditTable from '../pages/Dashboard/edit'
import Home from '../pages/Home'
import InsertUser from '../pages/Dashboard/insert'

function RouterMain() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/:email" element={<Dashboard />} />
        <Route path="/edit_user/:email/:id" element={<EditTable />} />
        <Route path="/cad_user/:email" element={<InsertUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterMain
