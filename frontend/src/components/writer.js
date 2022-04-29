import React from 'react'
import axios from 'axios'

const Writer = (props) => {
	let {creator,token}=props

	const new_post = async (topic,content) => { // Ajouter un post
		return axios.post('http://localhost:3000/api/post',
		{
			topic: topic,
	        content: content,
	        /*attachement: 'test',*/
	        creator_id: creator,
		},{
			headers:{
				'Authorization' : 'Bearer ' + token
			},
		})
		.then(response=>{return response})
		.catch(error => {return error})
	}

	const send_post = async (event) => {
		event.preventDefault()
		let topic = event.target.previousSibling.children[1].value
		let content = event.target.previousSibling.children[3].value
		if(topic && content){
			let send_new_post = await new_post(topic,content)
			event.target.previousSibling.children[1].value = ''
			event.target.previousSibling.children[3].value = ''
			event.target.parentElement.insertAdjacentHTML('afterend','<p class=\'Send_validation\'>Votre article est en attente de modération</p>')
		}
	}

	return(
		<form action="" className='writer'>
			<div className='writer_type'>
				<label htmlFor="writer_topic">Titre de l'article :</label>
				<input id='writer_topic' className='writer_type_topic' type="text" placeholder='Le sujet de votre article' />
				<label htmlFor="writer_content">Contenu :</label>
				<textarea id='writer_content' className='writer_type_content' name="content" rows="5" cols="33" placeholder='Vous pouvez écrire un article ici ...'>
				</textarea>
			</div>
			<input className='writer_sender' type='image' alt='Envoyer l&apos;article' onClick={(event)=>{send_post(event)}} src="/message.png"/>
		</form>
	)
}

export default Writer