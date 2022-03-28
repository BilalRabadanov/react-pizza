import React from 'react'

const Categories = React.memo(function Categories({ activeCategory, items, onSelectCategory }) {


	return (
		<div className="categories">
			<ul>
				{items.map((name, index) => (
					<li key={index} className={activeCategory === index ? "active" : null} onClick={() => onSelectCategory(index)}>{name}</li>
				))}
			</ul>
		</div>
	)
})


export default Categories;

