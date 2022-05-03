import './App.css';

import LogForm from './components/logForm'
import Banniere from './components/banniere'
import NotFound from './components/notFound'
import Wall from './components/wall'
import Admin from './components/admin'
import Profil from './components/profil'
import Profiler from './components/profiler'
import Post from './components/post'

import {useState, useEffect } from 'react'
import { Routes,Route, useNavigate} from 'react-router-dom'
import axios from 'axios'

const authentificator = (API,mail,password,user_name) => {
  return axios.post(API,{
    email:mail,
    password:password,
    user_name:user_name
  })
  .then(response => {return response.data })
  .catch(error => {return error.response.data})
}

function App() {
  let navigate = useNavigate()
  const [userId,setUserId] = useState(sessionStorage.getItem('userId'))
  const [userRole,setUserRole] = useState(sessionStorage.getItem('userRole'))
  const [userToken,setUserToken] = useState(sessionStorage.getItem('userToken'))
  const [userConnected,setUserConnected] = useState(sessionStorage.getItem('userConnected'))
  

  const login = async (event) => {
    event.preventDefault();
    let mail = document.getElementById('Email').value
    let password = document.getElementById('Mot de passe').value
    let mailreg = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
    if(!mailreg.test(mail)){
      alert('vous n\'avaz pas saisie une adresse mail correcte')  
    } else{
      let loger =  await authentificator('http://localhost:3000/api/auth/login',mail,password)
      if (!loger.userId || !loger.role || !loger.token)
        alert(loger.error)
      else{
        sessionStorage.setItem('userId', loger.userId)
        sessionStorage.setItem('userRole', loger.role)
        sessionStorage.setItem('userToken', loger.token)
        sessionStorage.setItem('userConnected', true)
        setUserId(loger.userId)
        setUserRole(loger.role)
        setUserToken(loger.token)
        setUserConnected(true)
        navigate('/Wall')
      }
    }
  }

  const signup = async (event) =>{
    event.preventDefault();
    let mail = document.getElementById('Email').value
    let password = document.getElementById('Mot de passe').value
    let user_name = document.getElementById('Nom Utilisateur').value

    let mailreg = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
    let mdp_reg = new RegExp(".{8,}")
    if(!mailreg.test(mail)){
      alert('vous n\'avaz pas saisie un mail correct')  
    } else if(!mdp_reg.test(password)) {
      alert('Votre mot de passe doit contenir 8 caractères minimum')
    } else{
      let signer = await authentificator('http://localhost:3000/api/auth/signup',mail,password,user_name)
      signer.error ? alert(signer.error) : navigate('/Signed')}
    }

  const disconnect = () =>{
    sessionStorage.clear();
    setUserId()
    setUserRole()
    setUserToken()
    setUserConnected(false)
    navigate('/')
  }

  return (
    <div className="App">
      <Banniere role={userRole} connected={userConnected} disconnect={disconnect}/>
      <Routes>
        <Route index element={<LogForm role={login} usage='Formulaire de connexion'/>}></Route>
        <Route path='/Signup' element={<LogForm role={signup} usage="Formulaire d'inscription"/>}></Route>
        <Route path='/Signed' element={<h1>Vous êtes inscrit en attente de validation</h1>}></Route>
        <Route path='/Wall' element={<Wall token={userToken} userId={userId} key='wall'/>}></Route>
        <Route path='/Profile' element={<Profil userId={userId} token={userToken}/>}></Route>
        <Route path='/Profile/:id' element={<Profiler token={userToken} />}></Route>
        <Route path='/Post/:id' element={<Post  userId={userId} token={userToken} />}></Route>
        <Route path='/Profiles' element={<h1>Je veux voir tous les profiles</h1>}></Route>
        <Route path='/Admin' element={<Admin userRole={userRole} token={userToken} />} ></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
