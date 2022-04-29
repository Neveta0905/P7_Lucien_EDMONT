import { useParams } from 'react-router';
import {useEffect, useState, Fragment} from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import './css/css/profil.css'

const Profiler = (props) => {
	const {id} = useParams()
	const {token} = props
	let [user,setUser] = useState()
	let navigate = useNavigate()

	useEffect(() => {
		if(id==='undefined')
		navigate('/Wall')
	}, [])


	useEffect(() => { // Cherche les post modérés et commentaires modérés en bonus
		return axios.get(`http://localhost:3000/api/auth/profile/${id}`,{
			headers:{
				'Authorization' : 'Bearer ' + token
			},
		})
		.then(response => {return response.data })
			.then(datas => {
				setUser(datas)
			})
	  	.catch(error => {return error})
	}, [])

	return(
		<div className='profil_show'>
			{
				user ? 
				<Fragment>
				<h2 className='profil_show_title'>Profil de {user.user_name}</h2>
				{user.bio ? <p>Biographie : {user.bio}</p> : null}
				<p>mail : {user.email}</p>
				</Fragment>
				: null
			}
		</div>
	)
}

export default Profiler