import React,{Fragment,useState, useEffect, Link} from 'react'
import axios from 'axios'
import Banniere from './banniere'
import Writer from './writer'
import Article from './article'
import './css/css/wall.css'

const Wall = (props) => {
	const {token,userId} = props // récupère le token de l'app
	const [messages,setMessages] = useState({})

	useEffect(() => { // Cherche les post modérés et commentaires modérés en bonus
		return axios.get('http://localhost:3000/api/post/moderated/3',{
			headers:{
				'Authorization' : 'Bearer ' + token
			},
		})
		.then(response => {return response.data })
			.then(datas => {
				setMessages(datas)
			})
	  	.catch(error => {return error})
	}, [])

	const mapped_mess = Object.keys(messages).map(message => { // Création d'article qui ont des commentaires en props
		if (messages[message].moderated != 0){
			return <Article msg={messages[message]} 
			comments={messages[message].Comments} userId={userId} token={token} key={messages[message].id+messages[message].content+messages[message].creator_id}/>
		}
	})

	return(
		<main className='wall'>
			<h1>Fil d'actualité</h1>
			<Writer creator={userId} token={token}/>
			<div className="posts">
				{mapped_mess}
			</div>
		</main>
	)
}
export default Wall