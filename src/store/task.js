import { createAction, createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'
import { setError } from './errors'

// const update = createAction('task/updated')
// const remove = createAction('task/removed')

const initialState = { entities: [], isLoading: true }

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      )
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      }
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      )
    },
    loadTaskRequested(state, action) {
      state.isLoading = false
    },
    taskRequestFailed(state, action) {
      state.isLoading = false
    },
    taskCreated(state, action) {
      state.entities.push(action.payload)
    },
  },
})

const { actions, reducer: taskReducer } = taskSlice
const {
  update,
  remove,
  recived,
  loadTaskRequested,
  taskRequestFailed,
  taskCreated,
} = actions
const taskRequested = createAction('task/taskRequested')

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.fetch()
    dispatch(recived(data))
  } catch (error) {
    dispatch(taskRequestFailed())
    dispatch(setError(error.message))
  }
}

export const createTask = (task) => async (dispatch) => {
  dispatch(loadTaskRequested())
  try {
    const data = await todosService.create(task)
    dispatch(taskCreated(data))
  } catch (error) {
    dispatch(taskRequestFailed())
    dispatch(setError(error.message))
  }
}

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }))
}

export function titleChanged(id) {
  return update({ id, title: `new title ${id}` })
}

export function taskDeleted(id) {
  return remove({ id })
}

// export function taskCreated(id) {
//   return remove({ title, completed })
// }

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

// const taskReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(update, (state, action) => {
//       const elementIndex = state.findIndex((el) => el.id === action.payload.id)
//       state[elementIndex] = {
//         ...state[elementIndex],
//         ...action.payload,
//       }
//     })
//     .addCase(remove, (state, action) => {
//       return state.filter((el) => el.id !== action.payload.id)
//     })
// })

export default taskReducer
