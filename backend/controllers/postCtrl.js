const models = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utils = require('../utils')
const { Op } = require('sequelize')

exports.getAll = (req,res) => {
	models.Posts.findAll({
		include:[
			{
				model:models.User,
				attributes:['user_name']
			},
			{
				model: models.Comment,
				attributes:['content','users_id'],
				include:[{model:models.User,attributes:['user_name']}]
			}
		]
	})
	.then(result => res.status(200).json(result))
	.catch(error => res.status(500).json(error))
}

exports.getModerated = (req,res) => {
	console.log(req.params.limit)
	models.Posts.findAll({
		where:{moderated:1},
		order:[['id','DESC']],
		include:[
			{
				model:models.User,
				attributes:['user_name','id']
			},
			{
				model: models.Comment,
				attributes:['content','users_id','moderated'],
				include:[{model:models.User,attributes:['user_name','id']}],
				where:{
					moderated:[1]
				},
				required:false,
				limit:parseInt(req.params.limit),
				order:[['id','DESC']]
			}
		],
	})
	.then(result => res.status(200).json(result))
	.catch(error => res.status(500).json(error))
}

exports.getToModerate = (req,res) => {
	models.Posts.findAll({
		where:{moderated:0},
	})
	.then(result => res.status(200).json(result))
	.catch(error => res.status(500).json(error))
}

exports.getOne = (req,res) => {
	let id = req.params.id
	models.Posts.findOne({
		where: {id:id},
		include:[
			{
				model:models.User,
				attributes:['user_name']
			},
			{
				model: models.Comment,
				attributes:['content','users_id','moderated'],
				include:[{model:models.User,attributes:['user_name']}],
				where:{
					moderated:[1]
				},
				required:false,
			}
		]
	})
	.then(result => res.status(200).json(result))
	.catch(error => res.status(500).json(error))
}

exports.create = (req,res) => {
	models.Posts.create({
        topic: req.body.topic,
        content: req.body.content,
        attachement: req.body.attachement,
        moderated: 0,
        likes: 0,
        creator_id: req.body.creator_id,
	})
	.then(result=>res.status(200).json({message:'Post created'}))
	.catch(error => res.status(500).json(error))
}

exports.moderate = (req,res) => {
	let id = req.params.id
	models.Posts.update({
		moderated:1,
	},{
		where:{id:id}
	})
	.then(result => res.status(200).json({message:'Post modified'}))
	.catch(error => res.status(500).json(error))
}

exports.delete = (req,res) =>{
	let id = req.params.id
	models.Posts.destroy({
		where:{id:id}
	})
	.then(result => res.status(200).json({message:'Post destroyed'}))
	.catch(error => res.status(500).json(error))
}

exports.count = (req,res) =>{
	models.Posts.count()
	.then(result => res.status(200).json({message:result}))
	.catch(error => res.status(400).json(eror))
}