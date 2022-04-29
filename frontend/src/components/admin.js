import React, {Fragment, useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import ReactDOM from 'react-dom';
import axios from 'axios'
import './css/css/admin.css'

const Admin = (props) =>{
	let [Data_to_lay,setData] = useState({})
	const props_setdata = (data) => {
		setData(data)
	}

	let [menu_layed,setMenu] = useState()

	let navigate = useNavigate()
	let { userRole, token } = props
	if(userRole!=2){navigate('/Wall')}

	const getApi = async (api,menu) =>{
		return axios.get(api,{
			headers:{
				'Authorization' : 'Bearer ' + token
			},
		})
		.then(response => {return response.data })
		.catch(error => {return error})
	}

	const delete_one = async (api,id) =>{
		return axios.delete(api + id,{
			headers:{
				'Authorization' : 'Bearer ' + token
			},
		})
		/*.then(response => {return response.data })*/
		.then(() => setData())
		.catch(error => {return error})
	}

	const accept_one = async (api,id,content) =>{
		return axios.put(api + id,content,{
			headers:{
				'Authorization' : 'Bearer ' + token
			},
		})
		.then(response => {return response.data })
		.catch(error => {return error})
	}

	const lay_menu = async (event) => { // Afiche le menu séléctionné par le lien
		let api,api_manage;
		switch (event.target.id){ // Fetch datas
			case 'Utilisateurs' : 
				api = 'http://localhost:3000/api/auth/profiles/moderate'
				api_manage = 'http://localhost:3000/api/auth/'
				break;
			case 'Posts' : 
				api = 'http://localhost:3000/api/post/moderate'
				api_manage = 'http://localhost:3000/api/post/'
				break;
			case 'Commentaires' : 
				api = 'http://localhost:3000/api/comment/moderate'
				api_manage = 'http://localhost:3000/api/comment/'
				break;
		}
		const moderation = await getApi(api)

		switch (event.target.id){
			case 'Utilisateurs' : 
				ReactDOM.render(<User_menu datas={moderation} set_data={props_setdata} deleter={delete_one} accepter={accept_one} api={api_manage}/>,document.getElementById('layed_menu'))
				break;
			case 'Posts' : 
				ReactDOM.render(<Post_menu datas={moderation} set_data={props_setdata} deleter={delete_one} accepter={accept_one} api={api_manage} />,document.getElementById('layed_menu'))
				break;
			case 'Commentaires' : 
				ReactDOM.render(<Comment_menu datas={moderation} set_data={props_setdata} deleter={delete_one} accepter={accept_one} api={api_manage} />,document.getElementById('layed_menu'))
				break; // Use datas
		}
	}

	let [nbreUser,SetNbreUsers] = useState(0)
	let [nbrePost,SetNbrePost] = useState(0)
	let [nbreComment,SetNbreComment] = useState(0)

	const count = async(api,setter) => {
		const nbre = await getApi(api)
		setter(nbre.message)
	}

	useEffect(async () => {
		let users = await count('http://localhost:3000/api/auth/count',SetNbreUsers)
		let posts = await count('http://localhost:3000/api/post/count',SetNbrePost)
		let comments = await count('http://localhost:3000/api/comment/count',SetNbreComment)
	}, [])

	return(
		<Fragment>
			<h2>Choses à Modérer :</h2>
			<div className='button_layer'>
				<button role='button' id='Utilisateurs' onClick={(event)=>lay_menu(event)}>Utilisateurs ({nbreUser} personnes sont inscrites) </button>
				<button role='button' id='Posts'onClick={(event)=>lay_menu(event)}>Posts (Total : {nbrePost})</button>
				<button role='button' id='Commentaires' onClick={(event)=>lay_menu(event)} >Commentaires (Total : {nbreComment})</button>
			</div>
			<div id="layed_menu"></div>
		</Fragment>
	)
}
export default Admin

// Menus
const User_menu = (props) => {
	let {datas,deleter,api,accepter,set_data} = props
	let [data,changeData] = useState(datas)

	const mapped_users = data.map(user =>
		<div key={user.id + user.user_name} className='admin_article'>
			<p>Nom : {user.user_name}</p>
			<p>Adresse email : {user.email}</p>
			<div className='admin_checkadmin'>
				<label htmlFor={'admin_box' + user.id}>Administrateur</label>
				<input type="checkbox" id={'admin_box' + user.id}/>
			</div>
			<button className='admin_accept'
			onClick={(event) =>{
				let role
				document.getElementById('admin_box'+user.id).checked ? role=2 : role=1
				accepter(api+'profile/',user.id,{'role':role});
				data = data.filter(users=>users.id != user.id);
				changeData(data)
			}}>Accepter</button>
			<button className='admin_delete'
			onClick={(event) =>{deleter(api+'one/',user.id);data = data.filter(users=>users.id != user.id);changeData(data)}}>Supprimer</button>
		</div>
	)

	return(
		<Fragment>
			{mapped_users.length > 0 ? mapped_users : <p>Aucun utilisateur à modérer</p>}
		</Fragment>
	)
}

const Post_menu = (props) => {
	let {datas,deleter,api, accepter} = props
	let [data,changeData] = useState(datas)

	const mapped_posts = data.map(post => 
		<div key={post.id + post.topic} className='admin_article'>
			<p>Sujet : {post.topic}</p>
			<p>Article : {post.content}</p>
			<button className='admin_accept' onClick={(event) =>{accepter(api,post.id);data = data.filter(posts=>posts.id != post.id);changeData(data)}}>Accepter</button>
			<button className='admin_delete'
			onClick={(event) =>{deleter(api,post.id);data = data.filter(posts=>posts.id != post.id);changeData(data)}}>Supprimer</button>
		</div>
	)

	return(
		<Fragment>
			{mapped_posts.length > 0 ? mapped_posts : <p>Aucun post à valider</p>}
		</Fragment>
	)
}

const Comment_menu = (props) => {
	let {datas,deleter,api, accepter, set_data} = props
	let [data,changeData] = useState(datas)
	const mapped_comments = data.map(comment =>{

		return <div key={comment.id + comment.content} className='admin_article'>
			<p>Utilisateur : {comment.User.user_name}</p>
			<p>Content : {comment.content}</p>
			<p>Article concerné : {comment.Post.content}</p>
			<button className='admin_accept' onClick={(event) =>{
				accepter(api,comment.id);
				data = data.filter(comments=>comments.id != comment.id);
				changeData(data)
			}}
			>Accepter</button>
			<button className='admin_delete'
			onClick={(event) =>{
				deleter(api,comment.id);
				data = data.filter(comments=> parseInt(comment.id) != parseInt(comments.id))
				changeData(data)
				}
			}>Supprimer</button>
		</div>
		}
	)
	return(
		<Fragment>
			{mapped_comments.length > 0 ? mapped_comments : <p>Aucun commenaire à valider</p>}
		</Fragment>
	)
}