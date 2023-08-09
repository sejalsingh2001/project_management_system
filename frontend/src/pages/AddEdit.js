import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddEdit.css";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { name, email } = state;
  const history = useNavigate();

  const addContact = async (data) => {
    const response = await axios.post("http://localhost:5000/project", data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Provide valid input");
    } else {
      addContact(state);
      setTimeout(() => history("/"), 500);
    }
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
   
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(e.target.value);
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Project Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Project..."
          onChange={handleInputChange}
          value={name}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter Email..."
          onChange={handleInputChange}
          value={email}
        />

        <input className="sub-btn" type="submit" value="Add" />
      </form>
    </div>
  );
};

export default AddEdit;
