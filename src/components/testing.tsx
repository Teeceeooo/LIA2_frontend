/*
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = "https://localhost:8080/students";

export default function Testing() {
  interface Post {
    fullName: string;
  }

  const [post, setPost] = useState<Post[] | null>(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  return <h1>{post[0].fullName}</h1>;
}
*/
