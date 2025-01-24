
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc as firestoreDoc } from "firebase/firestore";


import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "./firebase"; 



const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
    age: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    guardianName: "",
    admissionDate: "",
    bloodGroup: ""
  });

  // Fetch students from Firestore
  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    setStudents(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  // Handle form submission to add new student
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      // Add new student to Firestore
      const docRef = await addDoc(collection(db, "students"), newStudent);
      
      // Add the new student to the state
      setStudents([
        ...students,
        { id: docRef.id, ...newStudent }
      ]);

      // Close the modal after submission
      setShowModal(false);

      // Clear form fields after submission
      setNewStudent({
        name: "",
        class: "",
        section: "",
        rollNumber: "",
        age: "",
        gender: "",
        address: "",
        phone: "",
        email: "",
        guardianName: "",
        admissionDate: "",
        bloodGroup: ""
      });

      alert("Student added successfully!"); // Show confirmation
    } catch (error) {
      console.error("Error adding student: ", error);
      alert("Error adding student");
    }
  };

  // Handle delete student
  const handleDelete = async (id) => {
    try {
      await deleteDoc(firestoreDoc(db, "students", id));
      fetchStudents(); // Re-fetch students after delete
    } catch (error) {
      console.error("Error deleting student: ", error);
      alert("Error deleting student");
    }
  };
  

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Students</h2>
      <Button variant="contained" onClick={() => setShowModal(true)}>Add Student</Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Roll Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.section}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>
                  <IconButton><VisibilityIcon color="primary" /></IconButton>
                  <IconButton><EditIcon color="action" /></IconButton>
                  <IconButton onClick={() => handleDelete(student.id)}><DeleteIcon color="error" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="modal-content">
          <form onSubmit={handleAddStudent}>
            {Object.keys(newStudent).map((field) => (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                fullWidth
                margin="normal"
                value={newStudent[field]}
                onChange={(e) => setNewStudent({ ...newStudent, [field]: e.target.value })}
              />
            ))}
            <Button type="submit" variant="contained" color="primary">Submit</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default StudentsPage;