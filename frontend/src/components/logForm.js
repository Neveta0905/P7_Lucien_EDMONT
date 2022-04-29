import React,{Fragment} from 'react'
import './css/css/connexionForm.css'
import Inputs from './inputs'
import { Link } from 'react-router-dom'

const ConnexionForm = (props) => {
	const {role,usage} = props

	const check_mail = (e) =>{
		let mail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
		alert(mail.test(e.target.value))
	}

	return(
		<div className='Form'>
			<form className="ConnexionForm">
				<legend>{usage}</legend>
				<Inputs name='Email' type='text' />
				<Inputs name='Mot de passe' type='password'/>

				{ role.name==='login' ?
					<input type="submit" value='Se connecter' onClick={role}/> : 
					null
				}

				{ role.name==='signup' ?
					<Fragment>
						<Inputs name='Nom Utilisateur' type='text'/>
						<input type="submit" value="S'inscrire" onClick={role}/>
					</Fragment>
					: 
					null
				}
			</form>
			{ role.name==='login' ?
				<Link to='/signup' >S'inscrire à Groupomania</Link> : 
				null
			}
			{ role.name==='signup' ?
				<Link to='/' >j'ai déjà un compte</Link> : 
				null
			}
		</div>
	)
}

export default ConnexionForm