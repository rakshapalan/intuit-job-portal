import React from "react";
import UserTable from "../../components/UserTable"; // Import the UserTable component
import Subheader from "../../components/Subheader";

const sampleUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    contactNumber: "123-456-7890",
    appliedDate: "2023-11-07",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    contactNumber: "987-654-3210",
    appliedDate: "2023-11-06",
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    contactNumber: "555-123-4567",
    appliedDate: "2023-11-05",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    contactNumber: "123-456-7890",
    appliedDate: "2023-11-07",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    contactNumber: "987-654-3210",
    appliedDate: "2023-11-06",
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    contactNumber: "555-123-4567",
    appliedDate: "2023-11-05",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    contactNumber: "123-456-7890",
    appliedDate: "2023-11-07",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    contactNumber: "987-654-3210",
    appliedDate: "2023-11-06",
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    contactNumber: "555-123-4567",
    appliedDate: "2023-11-05",
  },
];

function AllApplicants() {
  return (
    <>
      <Subheader />
      <UserTable users={sampleUsers} />
    </>
  );
}

export default AllApplicants;
