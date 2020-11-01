import React, { useState, forwardRef, useEffect} from 'react';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function NewCategory() {
  const [name, setName] = useState('');
  const [categoryTableData, setCategoryTableData] = useState({
    data: [],
  });

  useEffect(() => {
    axios.get('http://localhost:4000/categories')
    .then((res) => {
      setCategoryTableData({ data: res.data});
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const submitCategoryHandler = () => {
    let categoryData = {
      name: name
    };

    axios
      .post('http://localhost:4000/categories/addcategory', categoryData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container alignItems="flex-start" justify="center">
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            {'New Category'}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Grid container  alignItems="baseline" spacing={4}>
          <Grid item xs={6}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center" spacing={4}>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => submitCategoryHandler()}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <MaterialTable
          title={'All Categories'}
          icons={tableIcons}
          columns={[
            {
              title: 'Name',
              field: 'name',
              type: 'string'
            }
          ]}
          data={categoryTableData.data}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setCategoryTableData((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    axios.delete('http://localhost:4000/categories/delete/' + oldData._id)
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
    </Grid>
  );
}