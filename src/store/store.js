import { useState, useCallback, useEffect } from "react"

import { getDish, getDishes, createDish, deleteDish, deleteDishes } from "./dish"
import { getMenus, createMenu, deleteMenu } from "./menu"

let state = {
  menus: [],
  dishes: [],
  loadingMenus: true
}

let listeners = []

export const A = {
  GET_DISH: "GET_DISH",
  GET_DISHES: "GET_DISHES",
  CREATE_DISH: "CREATE_DISH",
  DELETE_DISH: "DELETE_DISH",
  DELETE_DISHES: "DELETE_DISHES",
  GET_MENUS: "GET_MENUS",
  CREATE_MENU: "CREATE_MENU",
  DELETE_MENU: 'DELETE_MENU'
}

const updatedState = async (action, payload) => {
  switch (action) {
    case A.GET_DISH: return await getDish(payload, state)
    case A.GET_DISHES: return await getDishes(payload, state)
    case A.CREATE_DISH: return await createDish(payload, state)
    case A.DELETE_DISH: return await deleteDish(payload, state)
    case A.DELETE_DISHES: return await deleteDishes(payload, state)
    case A.GET_MENUS: return await getMenus(payload, state)
    case A.CREATE_MENU: return await createMenu(payload, state)
    case A.DELETE_MENU: return await deleteMenu(payload, state)
    default: return state
  }
}

export const useStore = (shouldListen = true) => {
  const setState = useState(state)[1]

  const dispatch = async (action, payload) => {
    state = await updatedState(action, payload)
    for (const listener of listeners) listener(state)
  }

  useEffect(() => {
    shouldListen && listeners.push(setState)

    return () => {
      if (!shouldListen) return
      listeners = listeners.filter((listener) => listener !== setState)
    }
  }, [setState, shouldListen])

  return [state, useCallback(dispatch, [])]
}

export const doFetch = async (graphqlQuery) => {
  const response = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: {
      // Authorization: 'Bearer ' + this.props.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphqlQuery),
  })

  return await response.json()
}
