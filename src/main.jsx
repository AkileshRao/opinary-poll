import React from 'react'
import ReactDOM from 'react-dom/client'
import Poll from './Poll.jsx'
import './index.css'

const pollContainer = document.getElementById('poll');

ReactDOM.createRoot(pollContainer).render(
  <React.StrictMode>
    <Poll data={pollContainer.dataset} />
  </React.StrictMode>,
)
