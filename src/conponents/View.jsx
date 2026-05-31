import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

const View = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // 1. Fetch data from Backend
  const getdata = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/students`);
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // 2. Delete Student
  const deletedata = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await axios.delete(`${API_BASE_URL}/delete-student/${id}`);
      getdata(); // Refresh list
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="view-container">
      <div className="list-box">
        <h2>Registered Students</h2>
        <button className="add-btn" onClick={() => navigate("/")}>
          + Add New Student
        </button>

        <div className="student-list">
          {students.length === 0 ? (
            <p className="no-data">No students registered yet.</p>
          ) : (
            students.map((item) => (
              <div key={item._id} className="student-card">
                <div className="info">
                  <h3>{item.name}</h3>
                  <p>Age: {item.age} | CGPA: <span>{item.cgpa}</span></p>
                </div>
                <div className="actions">
                  <button className="edit-btn" onClick={() => navigate(`/edit/${item._id}`)}>Edit</button>
                  <button className="del-btn" onClick={() => deletedata(item._id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default View;