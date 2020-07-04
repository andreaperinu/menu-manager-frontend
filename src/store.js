import { useState, useCallback } from 'react'

const initialState = {
  menus: [],
  dishes: []
}

export const useStore = () => {
  const [state, setState] = useState(initialState)

  const dispatch = async (action, payload) => {

    let newState = null
    switch (action) {
      case 'getDish':
        newState = await getDish(payload, state)
        break;

      case 'getDishes':
        newState = await getDishes(payload, state)
        break;

      default:
        break;
    }

    setState(newState)
  }

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
