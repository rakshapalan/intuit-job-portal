import React from "react";
import UserTable from "../../components/UserTable"; // Import the UserTable component
import Subheader from "../../components/Subheader";
import { sampleUsers } from "../../../constants/base";

function AllApplicants() {
  return (
    <>
      <Subheader />
      <UserTable users={sampleUsers} />
    </>
  );
}

export default AllApplicants;
