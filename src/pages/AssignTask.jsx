import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { over } from "stompjs";
import SockJS from "sockjs-client";

let stompClient = null;
const AssignTask = () => {
  let { id } = useParams();
  let [userData, setUserData] = useState({
    id: id,
    taskname: "",
    sub_task_name: "",
    duration: "",
    status: "",
  });

  const handleChange = e => {
    let { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/stomp-endpoint");

    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    console.log("connected");
  };

  const onConnected = () => {
    stompClient.subscribe("/assign/recive-task", onMessageReceived);
    console.log("connected");
    // userJoin();
  };

  const userJoin = () => {
    stompClient.send(`/app/save?userId=${id}`, {}, JSON.stringify(userData));
  };

  const onError = () => {
    console.log("error");
  };

  const onMessageReceived = payload => {
    let payloadData = JSON.parse(payload.body);
    console.log(payloadData);
  };

  const handleSubmit = e => {
    e.preventDefault();
    userJoin();
  };
  connect();

  return (
    <div>
      <h1>Assign Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="task">Task Subject</label>
          <input
            type="text"
            id="task"
            name="taskname"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="subTask">Task Topic</label>
          <input
            type="text"
            id="subTask"
            name="sub_task_name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="taskDuration">Task Duration</label>
          <input
            type="text"
            id="taskDuration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="radio"
            name="status"
            value="COMPLETED"
            onChange={handleChange}
          />
          Completed
          <input
            type="radio"
            name="status"
            value="STOPPED"
            onChange={handleChange}
          />
          Stopped
          <input
            type="radio"
            name="status"
            value="ASSIGNED"
            onChange={handleChange}
          />
          Assigned
          <input
            type="radio"
            name="status"
            value="ONGOING"
            onChange={handleChange}
          />
          Ongoing
        </div>
        <button type="submit">Assign</button>
      </form>
    </div>
  );
};

export default AssignTask;
