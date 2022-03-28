import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setSortBy } from '../redux/actions/filters'

import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components/index'
import { fetchPizzas } from "../redux/actions/pizzas";

const categoryNames = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const sortItems = [
	{ name: 'популярности', type: 'popular', order: 'desc' },
	{ name: 'цене', type: 'price', order: 'desc' },
	{ name: 'алфавит', type: 'name', order: 'asc' },
];

const Home = () => {
	const dispatch = useDispatch();
	const items = useSelector(({ pizzas }) => pizzas.items);
	const cartItems = useSelector(({ cart }) => cart.items);
	const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
	const { category, sortBy } = useSelector(({ filters }) => filters);

	React.useEffect(() => {
		dispatch(fetchPizzas(sortBy, category));
	}, [category, sortBy]);


	const onSelectCategory = React.useCallback((index) => {
		dispatch(setCategory(index))
	}, [])

	const onSelectSortType = React.useCallback((type) => {
		dispatch(setSortBy(type))
	}, [])


	return (
		<div className="container">
			<div className="content__top">
				<Categories
					activeCategory={category}
					onSelectCategory={onSelectCategory}
					items={categoryNames} />
				<SortPopup
					onClickSortType={onSelectSortType}
					activeSortType={sortBy.type}
					items={sortItems} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoaded
					? items.map((obj) => (
						<PizzaBlock
							key={obj.id}
							addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
							{...obj}
						/>
					))
					: Array(12)
						.fill(0)
						.map((_, index) => <PizzaLoadingBlock key={index} />)}
			</div>
		</div>
	)
}

export default Home