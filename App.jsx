import React, { useState } from 'react';
import './App.css';

const initialData = [
  { id: 1, name: 'Arjun Sharma', marks: 78 },
  { id: 2, name: 'Priya Patel', marks: 34 },
  { id: 3, name: 'Rohan Gupta', marks: 45 },
  { id: 4, name: 'Sneha Reddy', marks: 92 },
];

export default function App() {
  const [students, setStudents] = useState(initialData);

  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const updateMarks = (id, newMarks) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, marks: newMarks } : student
      )
    );
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Student Report Card Dashboard</h1>
      </header>
      
      <DashboardStats students={students} />
      
      <div className="main-content">
        <AddStudentForm onAdd={addStudent} />
        <StudentTable students={students} onUpdateMarks={updateMarks} />
      </div>
    </div>
  );
}

// --- Sub-Components ---

function DashboardStats({ students }) {
  const total = students.length;

  const validStudents = students.map(s => ({ ...s, marks: Number(s.marks) || 0 }));
  
  const passed = validStudents.filter((s) => s.marks >= 40).length;
  const failed = total - passed;
  const totalMarks = validStudents.reduce((sum, s) => sum + s.marks, 0);
  const average = total > 0 ? (totalMarks / total).toFixed(2) : 0;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Students</h3>
        <p>{total}</p>
      </div>
      <div className="stat-card">
        <h3>Average Marks</h3>
        <p>{average}</p>
      </div>
      <div className="stat-card pass">
        <h3>Passed</h3>
        <p>{passed}</p>
      </div>
      <div className="stat-card fail">
        <h3>Failed</h3>
        <p>{failed}</p>
      </div>
    </div>
  );
}

function AddStudentForm({ onAdd }) {
  const [name, setName] = useState('');
  const [marks, setMarks] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || marks === '') return;

    const newStudent = {
      id: Date.now(),
      name: name,
      marks: Number(marks),
    };

    setName('');
    setMarks('');
  };

  return (
    <div className="form-section">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label>Student Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Amit Singh"
            required
          />
        </div>
        <div className="form-group">
          <label>Marks:</label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="0 - 100"
            min="0"
            max="100"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Student</button>
      </form>
    </div>
  );
}

function StudentTable({ students, onUpdateMarks }) {
  return (
    <div className="table-section">
      <h2>Student Records</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Marks</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>
                <input
                  type="number"
                  className="marks-input"
                  value={student.marks}
                  onChange={(e) => onUpdateMarks(student.id, e.target.value)}
                  min="0"
                  max="100"
                />
              </td>
              <td>
                {Number(student.marks) >= 40 ? (
                  <span className="status-badge pass-status">Pass</span>
                ) : (
                  <span className="status-badge fail-status">Fail</span>
                )}
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="3" className="empty-state">No students added yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}