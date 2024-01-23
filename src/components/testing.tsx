
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = "http://localhost:8080/student/getall";
let myArray:any;

export default function Testing() {
  interface Student {
    fullName: string;
  }

  const [students, setStudents] = useState<Student[] | null>(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setStudents(response.data);
    });
  }, []);

  if (!students) return null;

  const allStudents = students.map((Student:any, index:any) => (
    <li key={index}>{Student.fullName}</li>
  ));

  return (
    <div className="student-container">
    <h2>Studenter</h2>
    <ul>
        {allStudents}
    </ul>
    </div>
  );
}

