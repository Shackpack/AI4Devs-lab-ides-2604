import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CandidateForm from './components/CandidateForm';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
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
    </div>
  );
}

export default App;
