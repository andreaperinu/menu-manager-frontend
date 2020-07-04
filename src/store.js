import { useState, useCallback, useEffect } from 'react'

let state = {
  menus: [],
  dishes: []
}

let listeners = []

export const A = {
  GET_DISH: 'GET_DISH',
  GET_DISHES: 'GET_DISHES',
  CREATE_DISH: 'CREATE_DISH',
}

export const useStore = (shouldListen = true) => {

  const setState = useState(state)[1]

  const dispatch = async (action, payload) => {

    let newState = null
    switch (action) {
      case A.GET_DISH:
        state = await getDish(payload, state)
        break;

      case A.CREATE_DISH:
        state = await createDish(payload, state)
        break;

      case A.GET_DISHES:
        state = await getDishes(payload, state)
        break;

      default:
        break;
    }

    for (const listener of listeners) listener(state)

    setState(newState)
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


const getDish = async ({ id }, state) => {

  const graphqlQuery = {
    query: `query getDish($id: ID!) {
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

const createDish = async ({ name, description, price }, state) => {
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
    variables: { name, description, price }
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

const getDishes = async ({ page = 0 }, state) => {

  const graphqlQuery = {
    query: `query getDishes($page: Int!) {
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

const doFetch = async (graphqlQuery) => {
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
