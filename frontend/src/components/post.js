import { useParams } from 'react-router';
import {useEffect, useState, Fragment} from 'react'
import axios from 'axios'

const Post = (props) => {
	const {id} = useParams() // Id post
	const {token, userId} = props

	// Comment
		const new_comment = async (content) => { // Ajouter un commentaire
			return axios.post('http://localhost:3000/api/comment',
				{
					content:content,
					posts_id:id,
					user_id:userId
				},{
					headers:{
						'Authorization' : 'Bearer ' + token
					},
				})
			.then(response=>{return response.data})
				.then(() => { // Rajout au state du nouveau commentaire
					console.log(article)
					let page_article = {... article}
					page_article.Comments.push({ content:'Votre commentaire est en attente de modération', User:{user_name:'Vous'}})
					console.log(page_article)
					setArticle(page_article)
				})
			.catch(error => {return error})
		}

		const send_comment = async (event) => { // Event
			event.preventDefault();
			const content = event.target.previousSibling.value
			if(content){
				let comment = await new_comment(content)
			}
			event.target.previousSibling.value = ''
		}

	//-----
	let [article,setArticle] = useState()

	useEffect(() => { // Cherche les post modérés et commentaires modérés en bonus
		return axios.get(`http://localhost:3000/api/post/one/${id}`,{
			headers:{
				'Authorization' : 'Bearer ' + token
			},
		})
		.then(response => {return response.data })
			.then(datas => {
				setArticle(datas)
			})
	  	.catch(error => {return error})
	}, [])

	return(
		<Fragment>
			{
				article ?
				<div className='Post' key='post_written'>
					<div className='Post_infos'>
						<p>Sujet : {article.topic}</p>
						<p>Auteur : {article.User.user_name}</p>
					</div>
					<p>{article.content}</p>
					<div className='topic_comment'>
						<h2>Espace commentaire</h2>
						<div className='Post_comments'>
							{article.Comments.map(comment=><div className='Post_comments_comment'><p className='Post_comments_comment_user'>{comment.User.user_name + ' :'}</p><p className='Post_comments_comment_content'>{comment.content}</p></div>)}	
						</div>
					</div>
					<form action="">
						<label htmlFor={'comment'+article.id}>Commentaire : </label>
						<input type="text" id={'comment'+article.id} name='comment' placeholder='Mettre un commentaire' />
						<input type='image' alt='Commenter' tabIndex='0' onClick={(event)=>{send_comment(event)}} src="/message.png"/>
					</form>
				</div>
				: null
			}
		</Fragment>
	)
}

export default Post