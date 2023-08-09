import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./View.css";
import "./Home.css";
import axios from "axios";

const initialState = {
  name: "",
};
const View = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [reload, setReload] = useState(false);
  const [editId, setEditId] = useState(null);

  const [state, setState] = useState(initialState);
  const { name } = state;
  const addContact = async (data) => {
    const response = await axios.post("http://localhost:5000/task", {
      ...data,
      projectId: id,
    });
    if (response.status === 200) {
      setReload(true);
      setState(initialState);
      toast.success(response.data);
    }
  };

  const handleEdit = (task) => {
    setState({ ...state, name: task.taskName });
    setEditId(task.taskId);
  };

  const handleUpdate = (taskId) => {
    if (!name) {
      toast.error("Provide valid input");
    } else {
      updateTask(taskId);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Provide valid input");
    } else {
      addContact(state);
    }
  };

  useEffect(() => {
    getTasks();
    setReload(false);
  }, [reload]);
  const getTasks = async () => {
    const response = await axios.get(`http://localhost:5000/tasks?id=${id}`);
    if (response.status === 200) {
      console.log(response);
      setData(response.data);
    }
  };
  const onDeleteUser = async (task_id) => {
    console.log(task_id);
    if (window.confirm("Are you sure you want to delete")) {
      const response = await axios.delete(
        `http://localhost:5000/task?task_id=${task_id}`
      );

      if (response.status === 200) {
        toast.success(response.data);
        getTasks();
      }
    }
  };

  const updateTask = async (taskId) => {
    console.log(taskId);
    try {
      await axios.put(`http://localhost:5000/task`, {
        taskName: name,
        taskId: taskId,
      });
      toast.success("Task updated successfully");
      setEditId(null); // Move this line here
      setReload(!reload);
      setState(initialState);
    } catch (error) {
      toast.error("Error updating task");
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
    <div style={{ marginTop: "50px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "300px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <div className="divi">
          <input
            type="text"
            id="name"
            name="name"
            className="input-d"
            placeholder="Add Task..."
            onChange={handleInputChange}
            value={name}
          />
          <input className="sub-btn sub" type="submit" value="Add" />
        </div>
      </form>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}> Name</th>
            <th style={{ textAlign: "center" }}></th>

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
                  <td>
                    {editId === item.taskId ? (
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                        className="input-d"
                      />
                    ) : (
                      item?.taskName
                    )}
                  </td>
                  <td>
                   
                    {editId === item.taskId ? (
                      <button
                        className="btn btn-edit"
                        onClick={() => handleUpdate(item.taskId)}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="btn btn-delete"
                      onClick={() => onDeleteUser(item?.taskId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default View;
