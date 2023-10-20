import React from 'react'
import './addBranch.css'
const AddBranch = ({ closeAddBranch }) =>{
return (
    <>
      <div className="form-container">
        <p>Add New Branch</p>
        <hr />

        <div className='form-group'>
        <input
                  type="text"
                  name="userName"
                  placeholder="Branch Name"
                />
        </div>

        <br />
            {/* Cancel button */}
            <button className="cancel" onClick={closeAddBranch}>Cancel</button>
            {/* Save button */}
            <button className="save" >Save</button>
      </div>
    </>
  )
}

export default AddBranch;
