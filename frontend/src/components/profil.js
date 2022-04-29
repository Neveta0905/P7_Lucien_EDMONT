import axios from 'axios'
import {useState,useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom'


const Profil = (props) =>{
	let{userId,token} = props
	let [profils,setProfils] = useState()
	let [email,setEmail] = useState('')
	let [bio,setBio] = useState('')
	let [Name,setName] = useState('')

	useEffect(() => { // Cherche les post modérés et commentaires modérés en bonus
		return axios.get('http://localhost:3000/api/auth/profile',{
			headers:{
				'Authorization' : 'Bearer ' + token
			},
		})
		.then(response => {return response.data })
			.then(datas => {
				setEmail(datas.email)
				setBio(datas.bio)
				setName(datas.user_name)
			})
	  	.catch(error => {return error})
	}, [])

	useEffect(() => { // Cherche les post modérés et commentaires modérés en bonus
		return axios.get('http://localhost:3000/api/auth/profiles',{
			headers:{
				'Authorization' : 'Bearer ' + token
			},
		})
		.then(response => {return response.data })
			.then(datas => {
				setProfils(datas)
			})
	  	.catch(error => {return error})
	}, [])

	const hold_change = (event,setter) => {
		setter(event.target.value)
	}

	const change_request = async (datas) => {
		return axios.put('http://localhost:3000/api/auth/profile',datas,{
			headers:{
				'Authorization' : 'Bearer ' + token
			},
		})
	}

	const submit_change = async (event) =>{
		event.preventDefault()
		const datas = {
			email:email,
			bio:bio,
			user_name:Name
		}
		const request = await change_request(datas)
		if(!document.getElementById('change_confirmation'))
		event.target.insertAdjacentHTML('afterend','<p id=\'change_confirmation\'>Votre changement a été pris en compte</p>')
	}

	const mapped_profils = profils ? profils.map(user => {
		return <div key={user.id + user.user_name} className='profil'>
			
			<p><Link to={'/Profile/'+user.id}>Profil de : {user.user_name}</Link></p>
			<p>Adresse : {user.email}</p>
			{user.bio != null ? <p>Biographie : {user.bio}</p>: null}
			{user.role === 2 ? <p>Administrateur</p>: null}
		</div>
	}) : null 

	const self_delete = async (event) =>{
		event.preventDefault()

		if(window.confirm('Supprimer définitivement votre compte ?')){
				return axios.delete('http://localhost:3000/api/auth/',{
					headers:{
						'Authorization' : 'Bearer ' + token
					},
				})
				.then(response => {window.location.href='../' })
			  	.catch(error => {return error})
			}
		}


	return(
		<Fragment>
			<div className='profil_show'>
				<h2>Mon profil</h2>
				<form onSubmit={(event)=>submit_change(event)}>
					<div>
						<label htmlFor="profil_mail">Mon email :</label>
						<input type="text" value={email} id='profil_mail' onChange={(event)=>{hold_change(event,setEmail)}}/>
					</div>
					<div>
						<label htmlFor="profil_bio">Ma bio :</label>
						<input type="text" value={bio} id='profil_bio' onChange={(event)=>{hold_change(event,setBio)}} />
					</div>

					<div>
						<label htmlFor="profil_name">Mon nom utilisateur :</label>
						<input type="text" value={Name} id='profil_name' onChange={(event)=>{hold_change(event,setName)}}/>
					</div>
					<input type="submit" value='Modifier mes informations' className='valid_button'/>
					<button className='deletion_button' onClick={(event)=>self_delete(event)}>Supprimer son compte</button>
				</form>

			</div>

			<div>
				<h2>Tous les profils</h2>
				<div className='all_profils'>
					{mapped_profils}
				</div>
			</div>
		</Fragment>
	)
}
export default Profil