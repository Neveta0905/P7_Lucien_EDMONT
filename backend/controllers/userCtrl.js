const models = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utils = require('../utils')

exports.signup = (req,res) =>{
	bcrypt.hash(req.body.password,10)
	.then(hash => {
		models.User.create({
			email:req.body.email,
			password:hash,
			user_name: req.body.user_name,
			role:1,
			}
		)
		.then(result => res.status(200).json({message:'Account created'}))
		.catch(error => {
			let name = error.name
			if (name === 'SequelizeUniqueConstraintError')
				return res.status(400).json({error:'Mail already registered'})
			else
				return res.status(400).json(error)
		})
	})
	.catch((error) => res.status(500).json(error))
}

exports.login = (req,res) =>{
	models.User.findOne({
		attributes: ['id','password','role','moderated'],
		where: {email: req.body.email}
	})
	.then(user => {
		if(!user){
			return res.status(401).json({error:'Wrong mail'})
		}
		bcrypt.compare(req.body.password,user.password)
		.then(valid =>{
			if(!valid){
				return res.status(401).json(error)
			}
			if (user.moderated === 0)
				res.status(403).json({message:'Wait for your account\'s validation'})
			else{
				res.status(200).json({
					userId:user.id,
					token: jwt.sign( // User Id gardé cypté en front
						{ 
							userId: user.id,
							userRole: user.role
						},
						process.env.TokenCrypter,
						{ expiresIn:'24h'}
					),
					role: user.role
				})
			}
		})
		.catch(error => res.status(500).json({error:'Wrong password'}))
	})
	.catch(error => res.status(500).json(error))
}

exports.userProfil = (req, res) => {
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'user_name','bio'],
        where: { id: id},
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json(error))
};

exports.userProfilById = (req, res) => {
    let id = req.params.id
    models.User.findOne({
        attributes: ['id', 'email', 'user_name','bio'],
        where: { id: id},
        //include: Model.company // Left join // Faire une seule requete
    })
    .then(user => user!=null ? res.status(200).json(user) : res.status(400).json({error:'User doesn\'t exist'}))
    .catch(error => res.status(500).json(error))
};

exports.userProfils = (req, res) => {
    models.User.findAll({
        attributes: ['id', 'email', 'user_name','bio','role'],
        where:{moderated:1}
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json(error))
};

exports.userToModerate = (req, res) => {
    models.User.findAll({
        attributes:{exclude:['password']},
        where:{moderated:0}
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json(error))
};

exports.userModif = async (req,res) => {
	let id = utils.getUserId(req.headers.authorization)
	let new_password
	if(req.body.password){
		new_password = await bcrypt.hash(req.body.password,10)
	}

	models.User.update(
		{
			email:req.body.email,
			/*password:new_password,*/
			user_name:req.body.user_name,
			bio:req.body.bio,
		},
        {where:{id:id}}
	)
	.then( user => res.status(200).json('Auto modification complete'))
	.catch(error => res.status(500).json(error))
}

exports.moderate = (req,res) =>{
	models.User.update(
	{
		moderated: 1,
		role:req.body.role
	},
	{
		where:{id:req.params.id}
	}
	)
	.then(result => {res.status(200).send('User modified')})
	.catch(error => res.status(500).json(error))
}

exports.delete = (req,res) =>{
	models.User.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(result => {res.status(200).send('User deleted')})
	.catch(error => res.status(500).json(error))
}

exports.selfDelete = (req,res) => {
	models.User.destroy({
		where:{
			id: utils.getUserId(req.headers.authorization)
		}
	})
	.then(result => res.status(200).json({message:'Account destroyed'}))
	.catch(error => res.status(500).json(error))
}

exports.Count = (req,res) => {
	models.User.count()
	.then(result => res.status(200).json({message:result}))
	.catch(error => res.status(400).json(eror))
}