import { useState, useCallback, useEffect } from 'react'

import { getDish, getDishes, createDish, deleteDish, deleteDishes } from './dish'
import { getMenus } from './menu'

let state = {
	menus: [],
	dishes: []
}

let listeners = []

export const A = {
	GET_DISH: 'GET_DISH',
	GET_DISHES: 'GET_DISHES',
	CREATE_DISH: 'CREATE_DISH',
	DELETE_DISH: 'DELETE_DISH',
	DELETE_DISHES: 'DELETE_DISHES',
	GET_MENUS: 'GET_MENUS'
}

export const useStore = (shouldListen = true) => {

	const setState = useState(state)[1]

	const dispatch = async (action, payload) => {

		switch (action) {
			case A.GET_DISH:
				state = await getDish(payload, state)
				break;

			case A.GET_DISHES:
				state = await getDishes(payload, state)
				break;

			case A.CREATE_DISH:
				state = await createDish(payload, state)
				break;

			case A.DELETE_DISH:
				state = await deleteDish(payload, state)
				break;

			case A.DELETE_DISHES:
				state = await deleteDishes(payload, state)
				break;

			case A.GET_MENUS:
				state = await getMenus(payload, state)
				break;

			default:
				break;
		}

		for (const listener of listeners) listener(state)
	}

	useEffect(() => {
		shouldListen && listeners.push(setState)

		return () => {
			if (!shouldListen) return
			listeners = listeners.filter(listener => listener !== setState)
		}
	}, [setState, shouldListen])

	return [state, useCallback(dispatch, [])]
}

export const doFetch = async (graphqlQuery) => {
	const response = await fetch('http://localhost:8080/graphql', {
		method: 'POST',
		headers: {
			// Authorization: 'Bearer ' + this.props.token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(graphqlQuery)
	})

	return await response.json()
}
