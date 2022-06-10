import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-pro';
import React from 'react';
import axios from 'axios';
import Employees from '../src/data/Employee.json';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import  VisibilityIcon  from '@mui/icons-material/Visibility';

const geRowsWithId = (rows) => {
  let id = 0
  let completeRowListArray = []
  for (let row of rows) {
    const rowsWithId = {
      id: id,
      ...row
    }
    id++
    completeRowListArray.push(rowsWithId)
  }
  return completeRowListArray
}
export default function App() {

  const employeeTable =
    [
      {
        feild: 'actions',
        type: 'actions',
        width: 100,
        getActions: (event) => [
          <GridActionsCellItem  onClick={(e) => onClickOfViewButton(event)} icon={<VisibilityIcon/>} label="View" />,
          <GridActionsCellItem onClick={(e) => onclickEditButton(event)} icon={<EditIcon />} label="Edit" />,
          <GridActionsCellItem onClick={(e) => deleteRecord(event.id)} icon={<DeleteIcon />} label="Delete" />,

        ],
      },
      {
        field: 'employeeId',
        headerName: 'EmployeeId',
        width: 190
      },
      {
        field: 'firstName',
        headerName: 'FirstName',
        width: 190
      },
      {
        field: 'lastName',
        headerName: 'LastName',
        width: 190
      },
      {
        field: 'phoneNumber',
        headerName: 'PhoneNumber',
        width: 190
      },
      {
        field: 'jobId',
        headerName: 'JobId',
        width: 190
      },
      {
        field: 'salary',
        headerName: 'Salary',
        width: 190
      },
      {
        field: 'managerId',
        headerName: 'ManagerId',
        width: 190
      },
      {
        field: 'departmentId',
        headerName: 'DepartmentId',
        width: 190
      }
    ]

  const [rows, setRows] = React.useState([])
  const [addOrEdit, setAddOrEdit] = React.useState("")
  const [editId, setEditId] = React.useState("")
  const handleClickOpen = () => { setOpen(true); };
  const handleClickOpen2 = () => {setOpenView(true);};
  const [openview, setOpenView] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [employeeId, setEmployeeId] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [jobId, setJobId] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [managerId, setManagerId] = React.useState("");
  const [departmentId, setDepartmentId] = React.useState("");
  const handleClose = () => {
     setOpen(false);
     setEmployeeId("")
     setFirstName("")
     setLastName("")
     setPhoneNumber("")
     setJobId("")
     setSalary("")
     setManagerId("")
     setDepartmentId("")
     };
  const handleClose2 = () => {setOpenView(false);};

  const getAllRecords = () => {
    console.log(Employees.employeeData.getAll)
    axios.get(Employees.employeeData.getAll).then(response => {
      console.log(response.data)
      setRows(geRowsWithId(response.data))
    });
  }

  const onClickofSaveRecord = () => {
    setAddOrEdit("Save")
    handleClickOpen()
  }

  useEffect(() => { getAllRecords() }, []);

  const addOrEditRecordAndClose = (type) => {
    if (type === "Edit") { editRecordAndClose() }
    if (type === "Save") { addRecordAndClose() }
  }

  const addRecordAndClose = () => {
    if (employeeId !== undefined && firstName !== undefined && lastName !== undefined && phoneNumber !== undefined && jobId !== undefined && salary !== undefined && managerId !== undefined && departmentId !== undefined) {
      let payload =
      {
        "employeeId": employeeId,
        "firstName": firstName,
        "lastName": lastName,
        "phoneNumber": phoneNumber,
        "jobId": jobId,
        "salary": salary,
        "managerId": managerId,
        "departmentId": departmentId
      }
      console.log("The Data to DB is " + payload)
      axios.post(Employees.employeeData.post, payload).then(response => {
        getAllRecords()
        handleClose()
        setEmployeeId("")
        setFirstName("")
        
        setLastName("")
        setPhoneNumber("")
        setJobId("")
        setSalary("")
  
        setManagerId("")
        setDepartmentId("")

      })
    }
  }
  const deleteRecord = (index) => {
    let dataId = rows[index]._id
    axios.delete(Employees.employeeData.delete + "/" + dataId).then(() => { getAllRecords(); });
  }

  const onclickEditButton = (e) => {
    setAddOrEdit("Edit")
    let editRecord = rows[e.id]
    setEmployeeId(editRecord.employeeId)
    setFirstName(editRecord.firstName)
    setLastName(editRecord.lastName)
   
    setPhoneNumber(editRecord.phoneNumber)
    setJobId(editRecord.jobId)
    setSalary(editRecord.salary)
    
    setManagerId(editRecord.managerId)
    setDepartmentId(editRecord.departmentId)
    setEditId(editRecord._id)
    handleClickOpen()
  }
  const onClickOfViewButton = (e) =>
  {
    let viewRecord = rows[e.id]
    setEmployeeId(viewRecord.employeeId)
    setFirstName(viewRecord.firstName)
    setLastName(viewRecord.lastName)
   
    setPhoneNumber(viewRecord.phoneNumber)
    setJobId(viewRecord.jobId)
    setSalary(viewRecord.salary)
    
    setManagerId(viewRecord.managerId)
    setDepartmentId(viewRecord.departmentId)
  
  
    handleClickOpen2()
  }

  const editRecordAndClose = () => {
    if (employeeId !== undefined && firstName !== undefined && lastName !== undefined && phoneNumber !== undefined && jobId !== undefined && salary !== undefined && managerId !== undefined && departmentId !== undefined) {
      let payload =
      {
        "employeeId": employeeId,
        "firstName": firstName,
        "lastName": lastName,
        "phoneNumber": phoneNumber,
        "jobId": jobId,
        "salary": salary,
        "managerId": managerId,
        "departmentId": departmentId
      }
      
      axios.put(Employees.employeeData.put + "/" + editId, payload).then(response => {
        getAllRecords();
        handleClose();

      })
    }
  }


  return (
    <div className="App">
      <div className="text-alligned">
        <h1>Employee Data</h1>
      </div>
      <div style={{ height: "50vh", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={employeeTable}
          components={{ Toolbar: GridToolbar, }}
          componentsProps={{ toolbar: { showQuickFilter: true } }}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <div className="center" >
        <Button variant="contained" onClick={onClickofSaveRecord} >Add Record</Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Employee Data</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="employeeId" onChange={(e) => { setEmployeeId(e.target.value) }} value={employeeId} label="EmployeeId" type="text" fullWidth />
          <TextField autoFocus margin="dense" id="firstName" onChange={(e) => { setFirstName(e.target.value) }} value={firstName} label="FirstName" type="text" fullWidth />
          <TextField autoFocus margin="dense" id="lastName" onChange={(e) => {  setLastName(e.target.value) }} value={lastName} label="LastName" type="text" fullWidth />
          <TextField autoFocus margin="dense" id="phoneNumber" onChange={(e) => { setPhoneNumber(e.target.value) }} value={phoneNumber} label="PhoneNumber" type="text" fullWidth />
          <TextField autoFocus margin="dense" id="jobId" onChange={(e) => { setJobId(e.target.value) }} value={jobId} label="JobId" type="text" fullWidth />
          <TextField autoFocus margin="dense" id="salary" onChange={(e) => { setSalary(e.target.value) }} value={salary} label="Salary" type="text" fullWidth />
          <TextField autoFocus margin="dense" id="managerId" onChange={(e) => { setManagerId(e.target.value) }} value={managerId} label="ManagerId" type="text" fullWidth />
          <TextField autoFocus margin="dense" id="departmentId" onChange={(e) => { setDepartmentId(e.target.value) }} value={departmentId} label="DepartmentId" type="text" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => { addOrEditRecordAndClose(addOrEdit) }}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openview} onClose={handleClose2}>
        <DialogTitle>View Data</DialogTitle>
        <DialogContent>
          <TextField inputProps={{ readOnly: true, }} autoFocus margin="dense" id="employeeId" onChange={(e) => { setEmployeeId(e.target.value) }} value={employeeId} label="City Name" type="text" fullWidth />
          <TextField inputProps={{ readOnly: true, }} autoFocus margin="dense" id="firstName" onChange={(e) => { setFirstName(e.target.value) }} value={firstName} label="Country Id" type="text" fullWidth />
          <TextField inputProps={{ readOnly: true, }} autoFocus margin="dense" id="lastName" onChange={(e) => { setLastName(e.target.value) }} value={lastName} label="Postal Code" type="text" fullWidth />
          <TextField inputProps={{ readOnly: true, }} autoFocus margin="dense" id="phoneNumber" onChange={(e) => { setPhoneNumber(e.target.value) }} value={phoneNumber} label="Location Id" type="text" fullWidth />
          <TextField inputProps={{ readOnly: true, }} autoFocus margin="dense" id="jobId" onChange={(e) => { setJobId(e.target.value) }} value={jobId} label="City Name" type="text" fullWidth />
          <TextField inputProps={{ readOnly: true, }} autoFocus margin="dense" id="salary" onChange={(e) => { setSalary(e.target.value) }} value={salary} label="Country Id" type="text" fullWidth />
          <TextField inputProps={{ readOnly: true, }} autoFocus margin="dense" id="managerId" onChange={(e) => {setManagerId(e.target.value) }} value={managerId} label="Postal Code" type="text" fullWidth />
          <TextField inputProps={{ readOnly: true, }} autoFocus margin="dense" id="departmentId" onChange={(e) => { setDepartmentId(e.target.value) }} value={departmentId} label="Location Id" type="text" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cancel</Button>
        </DialogActions>
      </Dialog>


    </div>
  );
}