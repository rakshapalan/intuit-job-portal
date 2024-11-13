import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./index.css"; // Import the CSS file with custom styles

function UserTable({ users }) {
  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead className="thead-light">
            <tr>
              <th scope="col">User</th>
              <th scope="col">Email ID</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="user-logo mr-2">{user.name.charAt(0)}</div>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.contactNumber}</td>
                <td>{user.appliedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
