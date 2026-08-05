import { useState } from 'react'
import './App.css'

const initialTasks = [
  { id: 1, title: 'Learn AWS Amplify', completed: true },
  { id: 2, title: 'Deploy the React application', completed: true },
  { id: 3, title: 'Enable offline support', completed: true },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')

  const addTask = (event) => {
    event.preventDefault()

    const title = newTask.trim()

    if (!title) return

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        title,
        completed: false,
      },
    ])

    setNewTask('')
  }

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task,
      ),
    )
  }

  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <main className="app-shell">
      <section className="task-card">
        <header className="hero">
          <div className="cloud-icon" aria-hidden="true">
            ☁️
          </div>

          <div>
            <p className="eyebrow">DEPLOYED WITH AWS AMPLIFY 🚀</p>

            <h1>Cloud Task Manager</h1>

            <p className="subtitle">
              Progressive Web App automatically deployed using GitHub CI/CD and
              AWS Amplify Hosting.
            </p>
          </div>
        </header>

        <section className="progress-panel">
          <div>
            <span>Project progress</span>

            <strong>
              {completedCount} of {tasks.length} complete
            </strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-bar"
              style={{
                width: `${
                  tasks.length
                    ? (completedCount / tasks.length) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </section>

        <form className="task-form" onSubmit={addTask}>
          <label htmlFor="task-input">
            Add a new cloud deployment task
          </label>

          <div className="form-row">
            <input
              id="task-input"
              type="text"
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              placeholder="Example: Configure custom domain"
              maxLength={100}
            />

            <button type="submit">Add task</button>
          </div>
        </form>

        <section className="tasks-section">
          <div className="section-heading">
            <h2>Deployment checklist</h2>
            <span>{tasks.length} tasks</span>
          </div>

          <ul className="task-list">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={task.completed ? 'task completed' : 'task'}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />

                  <span className="checkmark" aria-hidden="true" />

                  <span className="task-title">
                    {task.title}
                  </span>
                </label>

                <span className="status">
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <footer>
          <span>React + Vite</span>
          <span>AWS Amplify</span>
          <span>PWA</span>
          <span>GitHub CI/CD</span>
        </footer>
      </section>
    </main>
  )
}

export default App