import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Route, RouterProvider,createRoutesFromElements} from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import store from './redux/store.js';
import Home from './pages/Home.jsx';
import App from './App.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element={<App/>}>
      <Route path = '/login' element={<Login/>}></Route>
      <Route path = '/register' element={<Register/>}></Route>
      <Route index={true} path = '/' element={<Home/>}></Route>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <RouterProvider router = {router}/>
  </Provider>
);