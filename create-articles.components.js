import axios from 'axios';
import React, { Component } from 'react';


export default class Articles extends Component {
  constructor(props){
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state={
      title: '',
      content: '',
      description: '',
      category: []
    }
  }

  componentDidMount(){
    this.setState({
      category: [{id:'5f9ddd6646af5352ef13bbe6', name:'test category'},{id:'5f9ddd6646af5352ef13bbee', name:'test category1'},{id:'5f9ddd6646af5352ef13bbeb', name:'test category2'}],
    })
  }

  onChangeTitle(e){
    this.setState({
      title: e.target.value
    })
  }

  onChangeContent(e){
    this.setState({
      content: e.target.value
    })
  }

  onChangeDescription(e){
    this.setState({
      description: e.target.value
    })
  }

  onChangeCategory(e){
    this.setState({
      categoryId: e.target.value
    })
  }

  onSubmit(e, ){
    e.preventDefault();

    const article = {
      title: this.state.title,
      content: this.state.content,
      description: this.state.description,
      category: this.state.categoryId
    }

    console.log(article)

    axios.post('http://localhost:4000/articles/addarticle',article)
    .then(res => console.log(res.data));
    // window.location = '/'
  }

  render() {
    const { category } = this.state;
    let categoriesList = category.length>0 && category.map((ObjItem, Objindex) =>{
      return (
          <option key={Objindex} value={ObjItem.id}>{ObjItem.name}</option>
      )
    }, this);
    return (
      <div>
      <h3>Create New Article</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Title: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Content: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.content}
              onChange={this.onChangeContent}
              />
        </div>
        <div className="form-group">
          <label>Category: </label>
          <div>
            <select ref="category" required
              className="form-control" 
              onChange={ this.onChangeCategory}>
              {categoriesList}
            </select>
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Article" className="btn btn-primary" />
        </div>
      </form>
    </div>
    );
  }
}