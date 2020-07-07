import { doFetch } from './store'

export const getDish = async ({ id }, state) => {
	const graphqlQuery = {
		query: `
			query getDish($id: ID!) {
				dish(id: $id) {
					name
					description
					price
				}
      		}
    	`,
		variables: { id }
	};

	const response = await doFetch(graphqlQuery)
	const { data: { dish } } = response

	return {
		...state,
		dishes: [
			...state.dishes,
			dish
		]
	}
}

export const getDishes = async ({ page = 0 }, state) => {
	const graphqlQuery = {
		query: `
			query getDishes($page: Int!) {
				dishes(page: $page) {
					items {
						_id
						name
						description
						price
					},
					count
				}
			}
    	`,
		variables: { page }
	}

	const response = await doFetch(graphqlQuery)
	const { data: { dishes: { items } } } = response

	return {
		...state,
		dishes: items
	}
}

export const createDish = async ({ name, description, price }, state) => {
	const graphqlQuery = {
		query: `
			mutation createDish($name: String!, $description: String, $price: Int!) {
				createDish(data: { name: $name, description: $description, price: $price }) {
					_id
					name
					description
					price
				}
			}
		`,
		variables: { name, description, price: +price }
	}

	const response = await doFetch(graphqlQuery)
	const { data: { createDish: createdDish } } = response

	return {
		...state,
		dishes: [
			...state.dishes,
			createdDish
		]
	}
}

export const deleteDish = async ({ id }, state) => {
	const graphqlQuery = {
		query: `
			mutation deleteDish($id: ID!) {
				deleteDish(id: $id)
			}
    	`,
		variables: { id }
	}

	await doFetch(graphqlQuery)

	return {
		...state,
		dishes: state.dishes.filter(({ _id }) => _id !== id)
	}
}

export const deleteDishes = async ({ ids }, state) => {
	const graphqlQuery = {
		query: `
			mutation deleteDishes($ids: [ID!]!) {
				deleteDishes(ids: $ids)
			}
		`,
		variables: { ids }
	}

	await doFetch(graphqlQuery)

	return {
		...state,
		dishes: state.dishes.filter(({ _id }) => !ids.find(removed_id => removed_id === _id))
	}
}
