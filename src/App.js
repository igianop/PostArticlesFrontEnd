import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from "./components/navbar.component";
// import ArticlesList from "./components/articles-list.component";
// import CreateArticle from "./components/create-article.component";
// import CreateCategory from "./components/create-category.component";


function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      {/* <Route path="/" exact component={ArticlesList} />
      <Route path="" exact component={CreateArticle} />
      <Route path="" exact component={CreateCategory} />
      <Route path="/" exact component={ArticlesList} /> */}
    </Router>
  );
}

export default App;
