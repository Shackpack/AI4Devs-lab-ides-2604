import React, { useState } from 'react';
import './App.css';
import CandidateForm from './components/CandidateForm';
import { ToastProvider } from './context/ToastContext';
import Toast from './components/Toast';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <ToastProvider>
      <div className="App">
        <header className="App-header">
          <h1>Recruiter Dashboard</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Close Form' : 'Add Candidate'}
          </button>
        </header>
        <main className="App-main">
          {showForm && <CandidateForm />}
        </main>
        <Toast />
      </div>
    </ToastProvider>
  );
}

export default App;
