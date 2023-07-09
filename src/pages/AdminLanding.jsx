import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
const AdminLanding = () => {
  let [user, setUser] = useState();

  useEffect(() => {
    let fetchData = async () => {
      let response = await fetch("http://localhost:8080/user/getAllUser");
      let data = await response.json();
      setUser(data.data);
    };
    fetchData();
  }, []);

  //! handleSubmit function
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   console.log(message);
  // };
  return (
    <div>
      <h1>Admin Page</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Assign Task</th>
          </tr>
        </thead>
        <tbody>
          {user &&
            user.length &&
            user.map((ele, index) => {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td>{ele.userName}</td>
                    <td>{ele.useRole.toLowerCase()}</td>
                    <Link to={`/assignTask/${ele.id}`}>Assign Task</Link>
                  </tr>
                </React.Fragment>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLanding;
