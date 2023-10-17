import React from 'react'
import Layout from '../components/layout';
import './branches.css'
import AddRoundedIcon from '@mui/icons-material/AddRounded';


function Branches() {
  return (
    <>
      <Layout />
      <div className="form-container">
      <div className="searchContainer">
          <div className="searchContainer-right">
            <p style={{ fontWeight: "bold" }}>Search</p>
            <input type="text" id="searchName" name="branchName" />
          </div>
          <div className="button-container">
            <button className="add-button">
              <AddRoundedIcon /> Add Branch
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Branches;