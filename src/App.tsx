import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './components/Layout'
import Home from './components/Home'
import Products from './components/Products'
import ProductInfo from './components/ProductInfo'
import CreateProduct from './components/CreateProduct'
import EditProduct from './components/EditProduct'
import Register from './components/Register'
import Login from './components/Login'
import { ProtectedRoute } from './security/ProtectedRoute'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/create' element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>} />
          <Route path='/details/:id' element={<ProductInfo />} />
          <Route path='/edit/:id' element={<EditProduct />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<p>Page Not Found!</p>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
