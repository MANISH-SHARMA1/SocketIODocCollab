import React from "react";
import "./Home.css";
import Tab from "../../component/Tab";

function Home() {
  return (
    <div className="collaborateApp">
      <h1>Document Collaborating App</h1>

      <h5>Note: Copy and Paste the changed text to commit changes.</h5>
      <h5>Note: Choose the ID to collaborate.</h5>

      <Tab />
    </div>
  );
}
export default Home;
