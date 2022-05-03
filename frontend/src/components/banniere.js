import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

import './css/css/banniere.css'
const Banniere = (props) => {
	const {role,connected,disconnect} = props

	const lay_menu = (event) => {
		let menu =document.getElementsByClassName('menu')[0]
		menu.style.height != 0 ?
		menu.style.removeProperty('height')
		:menu.style.height='120px'
	}

	return(
		<Fragment>			
			<header className="banniere">
				<div className="banniere_logo">
					{!!connected ?
						<Link tabIndex='0' to='wall'><img src="/Groupomania/icon-left-font-monochrome-black.png" alt="Groupomania" /></Link>
						: <Link tabIndex='0' to='/'><img src="/Groupomania/icon-left-font-monochrome-black.png" alt="Groupomania" /></Link>
					}
					{!!connected ? <button onClick={()=>lay_menu()}>+</button>:null}
				</div>
				

				{!!connected ? // Menu d'action
					<div className='menu'>
						<p><Link to='Profile' tabIndex='0'>Profil</Link></p>
						{role === 2 || role === '2'?
							<p><Link tabIndex='0' to='Admin'>Espace administrateur</Link></p>
							: null
						}
						<button tabIndex='0' onClick={()=>disconnect()}>Déconnexion</button>
					</div>

					:null
				}
			</header>
		</Fragment>
	)
}

export default Banniere