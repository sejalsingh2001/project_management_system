import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);
  const getProjects = async () => {
    const response = await axios.get("http://localhost:5000/projects");
    if (response.status === 200) {
      setData(response.data);
    }
  };
  const onDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      const response = await axios.delete(
        `http://localhost:5000/project/${id}`
      );
      if (response.status === 200) {
        toast.success(response.data);
        getProjects();
      }
    }
  };

  console.log("data=>", data);

  return (
    <div style={{ marginTop: "150px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}></th>
            <th style={{ textAlign: "center" }}></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDeleteUser(item.id)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${item.id}`}>
                      <button className="btn btn-view">View Tasks</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
