import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function NewArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:4000/categories/')
    .then((res) => {
      setCategories(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const handleNameChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryIdChange = (event) => {
    setCategoryId(event.target.value);
  };

  const submitArtcleHandler = () => {
    let articleData = {
      title: title,
      content: content,
      description: description,
      categoryId: categoryId,
    };

    axios
      .post('http://localhost:4000/articles/addarticle', articleData)
      .then((res) => {
        articleData = {
          title: '',
          content: '',
          description: '',
          categoryId: '',
        };
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
            {'New Article'}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Grid container justify="center" alignItems="center" spacing={4}>
          <Grid item xs={6}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              type="text"
              name="title"
              value={title}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              type="text"
              name="content"
              value={content}
              onChange={handleContentChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              type="text"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label="Category" value={categoryId} onChange={handleCategoryIdChange}>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center" spacing={4}>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => submitArtcleHandler()}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}