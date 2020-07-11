import { doFetch } from './store'

export const getMenus = async ({ page }, state) => {
	const graphqlQuery = {
		query: `
			query getMenus($page: Int!) {
				menus(page: $page) {
					items {
						_id
						name
						items {
							_id
							name
							items {
								_id
								name
								description
								price
							}
						}
					}
					count
				}
			}
    	`,
		variables: { page }
	}

	const response = await doFetch(graphqlQuery)

	const { data: { menus: { items } } } = response

	return {
		...state,
		menus: items
	}
}

export const createMenu = async ({ name, items }, state) => {
	const graphqlQuery = {
		query: `
			mutation createMenu($name: String!, $items: [SubMenuInputData!]!) {
				createMenu(data: {
					name: $name,
					items: $items
				}) {
					_id
					name
					items {
						_id
						name
						items {
							_id
							name
							description
							price
						}
					}
				}
			}
		`,
		variables: { name, items }
	};

	const response = await doFetch(graphqlQuery)
	const { data: { createMenu: createdMenu } } = response

	return {
		...state,
		menus: [...state.menus, createdMenu],
	}
}
