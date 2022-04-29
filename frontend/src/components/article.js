import React,{Fragment, useState, useEffect } from 'react'
import './css/css/post.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Article = (props) =>{
	// Props
	let {msg,comments,userId,token} = props
	const [stateComments,setComments] = useState(comments)

	// Functions
	const new_comment = async (content,post_key,userId) => { // Ajouter un commentaire
		return axios.post('http://localhost:3000/api/comment',
			{
				content:content,
				posts_id:post_key,
				user_id:userId
			},{
				headers:{
					'Authorization' : 'Bearer ' + token
				},
			})
		.then(response=>{return response.data})
			.then(() => { // Rajout au state du nouveau commentaire
				let commentaries = {... stateComments}
				for(let i=3;i>0;i--){
					if(commentaries[i]) 
						commentaries[i+1] = commentaries[i]
				}
				commentaries[0]={ content:content, User:{user_name:'Votre commentaire en attente de modération'}}
				setComments(commentaries)
			})
		.catch(error => {return error})
	}

	const send_comment = async (event) => { // Event
		event.preventDefault();
		const post_id = event.target.previousSibling.value
		const content = event.target.previousSibling.previousSibling.value
		if(content){
			let comment = await new_comment(content,post_id,userId)
		}
		event.target.previousSibling.previousSibling.value = ''
	}

	const mapped_comments = Object.keys(stateComments).map(comment=>{
		return <div className='Post_comments_comment'>
				<p key={'user'+comment + stateComments[comment].User.user_name + stateComments[comment].content} className='Post_comments_comment_user'><Link to={'/profile/'+stateComments[comment].User.id}>{stateComments[comment].User.user_name} :</Link></p>
				<p key={'content'+comment + stateComments[comment].User.user_name + stateComments[comment].content} className='Post_comments_comment_content'>{stateComments[comment].content}</p>
			</div>
	})

	// JSX
	return(
		<div className='Post' key={msg.id+msg.content} >
			<div className="Post_infos">
				<div className='Post_infos_author'>
					<Link to={'/profile/' +msg.User.id} tabIndex='0'>
						<img src="/user.png" alt={"User : "+msg.User.id} /> 
						<p>{msg.User.user_name}</p>
					</Link>
				</div>
				<div className='Post_infos_topic'>
					<Link tabIndex='0' to={'/Post/' + msg.id}>
						<img src="/topic.png" alt="User :" />
						<p>{msg.topic}</p>
					</Link>
				</div>
			</div>
			<p className='Post_content'>{msg.content}</p>
			<div className="Post_comments">
				{mapped_comments}
			</div>
			<form action="">
				<label htmlFor={'comment'+msg.id}>Commentaire : </label>
				<input type="text" id={'comment'+msg.id} name='comment' placeholder='Mettre un commentaire' />
				<input type='hidden' value={msg.id}  />
				<input type='image' alt='Commenter' tabIndex='0' onClick={(event)=>{send_comment(event)}} src="/message.png"/>
			</form>
		</div>
	)
}

export default Article

// message erreur post  et comm