const models = require('../models');

exports.getAll = (req,res) => {
	models.Comment.findAll()
	.then(result => res.status(200).json({message:result}))
	.catch(error => res.status(400).json(eror))
}

exports.Count = (req,res) => {
	models.Comment.count()
	.then(result => res.status(200).json({message:result}))
	.catch(error => res.status(400).json(eror))
}

exports.getOne = (req,res) => {
	let id = req.params.id
	models.Comment.findOne({
		where:{id:id},
		include:{model:models.User,attributes:{exclude:['password']}}
	})
	.then(result => res.status(200).json({message:result}))
	.catch(error=>res.status(400).json(error))
}

exports.getToModerate = (req,res) => {
	models.Comment.findAll({
		where:{moderated:0},
		include:[
			{model:models.Posts,attributes:['content']},
			{model:models.User,attributes:['user_name']}
		]
	})
	.then(result => res.status(200).json(result))
	.catch(error => res.status(500).json(error))
}

exports.send = (req,res) => {
	models.Comment.create({
		content:req.body.content,
		posts_id: req.body.posts_id,
		users_id : req.body.user_id
	})
	.then(result => res.status(200).json({message:'Comment send'}))
	.catch(error => res.status(400).json(error))
}

exports.moderate = (req,res) => {
	models.Comment.update({
		moderated:1
	},{
		where:{id:req.params.id}
	})
	.then(result => res.status(200).json({message:'Comment modified'}))
	.catch(error => res.status(400).json(error))
}

exports.delete = (req,res) => {
	models.Comment.destroy({
		where:{id:req.params.id}
	})
	.then(result => res.status(200).json({message:'Comment deleted'}))
	.catch(error => res.status(400).json(error))
}

exports.test = (req,res) => {
	models.Comment.findAll()
	.then(result => res.status(200).json({message:result}))
	.catch(error => res.status(400).json(eror))
}