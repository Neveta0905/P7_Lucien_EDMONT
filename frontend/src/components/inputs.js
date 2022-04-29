import React from 'react'

const Inputs = (props) => {
	const {name,type} = props
	return(
		<div className='ConnexionForm_inputs'>
			<label htmlFor={name}>{name}</label>
			<input type={type} id={name}/>
		</div >
	)
}

export default Inputs