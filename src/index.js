import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import * as actions from './store/actions'
import { initiateStore } from './store/store'

const store = initiateStore()

const App = () => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])

  const completedTask = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId))
  }
  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId))
  }
  const deleteTask = (taskId) => {
    store.dispatch(actions.taskDeleted(taskId))
  }
  return (
    <>
      <h1>app</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`completed: ${el.completed}`}</p>
            <button onClick={() => completedTask(el.id)}>completed</button>
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
    <App />
  </React.StrictMode>
)
