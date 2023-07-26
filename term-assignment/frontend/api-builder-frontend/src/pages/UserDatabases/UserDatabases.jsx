import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './UserDatabases.scss';
import FormDrawer from '../../components/FormDrawer/FormDrawer';
import CancelIcon from '@mui/icons-material/Cancel';

function UserDatabases() {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState([]);
  const [tableName, setTableName] = useState('');

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleFormSubmit = (data) => {
    const tableData = {
      tableName,
      columns: formData,
    };
    console.log('Form data:', tableData);
    handleDrawerClose();
  };

  const handleAddColumn = () => {
    setFormData([...formData, { columnName: '', columnType: '' }]);
  };

  const handleColumnChange = (index, key, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index][key] = value;
    setFormData(updatedFormData);
  };

  const handleRemoveColumn = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
  };

  const formContent = (
    <div style={{ width: 500, padding: '16px' }}>
      <h2>Create New Table Form</h2>
      <TextField
        label="Table Name"
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
        fullWidth
        style={{ marginBottom: '16px' }}
      />
      {formData.map((column, index) => (
        <div key={index} style={{ marginBottom: '16px' }}>
          <TextField
            label="Column Name"
            value={column.columnName}
            onChange={(e) => handleColumnChange(index, 'columnName', e.target.value)}
            style={{ marginRight: '16px' }}
          />
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <Select
              value={column.columnType}
              onChange={(e) => handleColumnChange(index, 'columnType', e.target.value)}
            >
              <MenuItem value="" disabled>
                Column Type
              </MenuItem>
              <MenuItem value="VARCHAR(255)">VARCHAR(255)</MenuItem>
              <MenuItem value="INT">INT</MenuItem>
              <MenuItem value="BOOLEAN">BOOLEAN</MenuItem>
            </Select>
          </FormControl>
          <Button variant="text" color="error" onClick={() => handleRemoveColumn(index)}>
            <CancelIcon />
          </Button>
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={handleAddColumn}>
        Add new column
      </Button>
      <Button variant="contained" color="primary" onClick={handleFormSubmit} style={{ marginLeft: '16px' }}>
        Submit
      </Button>
    </div>
  );

  return (
    <div>
      <div className="button-container">
        <Button variant="contained" color="primary" onClick={handleDrawerOpen}>
          Create new Table
        </Button>
      </div>
      <FormDrawer open={isDrawerOpen} onClose={handleDrawerClose}>
        {formContent}
      </FormDrawer>
    </div>
  );
}

export default UserDatabases;
