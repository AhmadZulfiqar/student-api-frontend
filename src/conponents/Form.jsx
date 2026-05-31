import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './App.css';


const Form = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const { id } = useParams(); // This will be undefined if we are adding a new student

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [cgpa, setCgpa] = useState('');

  // Handle Form Submission (Both Add and Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update existing student
        await axios.put(`${API_BASE_URL}/update-student/${id}`, { name, age, cgpa });
      } else {
        // Add new student
        await axios.post(`${API_BASE_URL}/add-student`, { name, age, cgpa });
      }
      navigate("/view");
    } catch (error) {
      console.error("Error saving student data:", error);
    }
  };

  // Fetch data only if we are in "Edit Mode" (if id exists)
  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/students/${id}`);
          setName(res.data.name);
          setAge(res.data.age);
          setCgpa(res.data.cgpa);
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      };
      fetchStudent();
    }
  }, [id]);

  return (
    <div className="form-container">
      {/* Dynamic Heading based on id presence */}
      <h2>{id ? "Edit Student Details" : "New Student Entry"}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="input-group">
          <label>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>

        <div className="input-group">
          <label>CGPA</label>
          <input type="number" step="0.01" value={cgpa} onChange={(e) => setCgpa(e.target.value)} required />
        </div>

        <button type="submit">
          {id ? "Update Student" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;