import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from "./components/navbar.components";
import ArticlesList from "./components/articles-list.components";
import CreateArticle from "./components/create-articles.components";
import CreateCategory from "./components/create-category.components";



function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ArticlesList} />
        <Route path="/addarticle" exact component={CreateArticle} />
        <Route path="/addcategory" exact component={CreateCategory} />
      </div>
    </Router>
  );
}

export default App;
