import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  titleChanged,
  taskDeleted,
  completeTask,
  getTasks,
  getTasksLoadingStatus,
  loadTasks,
  createTask,
} from './store/task'
import configureStore from './store/store'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { getErrors } from './store/errors'

const store = configureStore()

const App = () => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getErrors())
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTasks())
  }, [])

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId))
  }
  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId))
  }

  const addNewTask = () => {
    dispatch(createTask({ title: '123', completed: false }))
  }

  if (isLoading) {
    return <h1>loading</h1>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <h1>app</h1>
      <button onClick={addNewTask}>add task</button>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              completed
            </button>
            <button onClick={() => changeTitle(el.id)}>change title</button>
            <button onClick={() => deleteTask(el.id)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
