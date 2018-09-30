import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
// import moment from "moment";

class Article extends Component {
  state = {
    article: [],
    nyTimesResults: [],
    topic: "",
    startYear: "",
    endYear: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ article: res.data, topic: "", startYear: "", endYear: "" })
      )
      .catch(err => console.log(err));
  };

  // deleteArticle = id => {
  //   API.deleteArticle(id)
  //     .then(res => this.loadArticle())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.startYear && this.state.endYear) {
      API.getArticles({
        topic: this.state.topic,
        startYear: this.state.startYear.format("YYYYMMDD"),
        endYear: this.state.endYear.format("YYYYMMDD")
      })
        .then(res => this.loadArticle())
        .catch(err => console.log(err));
    }
  };

  // handleSaveArticle = event => {
  //   event.preventDefault();
  //   if (this.state.topic && this.state.startYear && this.state.endYear) {
  //     API.saveArticle({
  //       title: this.state.title,
  //       link: this.state.link
  //     })
  //       .then(res => this.loadArticle())
  //       .catch(err => console.log(err));
  //   }
  // };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-8">
            <Jumbotron>
              <h1>Search NY Times Articles</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="start-year"
                placeholder="Start Year"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="end-year"
                placeholder="End Year"
              />
              <FormBtn
                disabled={!(this.state.topic || this.state.startYear || this.state.endYear)}
                onClick={this.handleFormSubmit}
              >
                SEARCH
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-8">
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>       
          <Col size="md-12 md-offset-1">
            <List>
            {this.state.article.map(article => (
                  <ListItem key={article._id}>
                    <strong>
                      {article.topic} 
                      <br /><a href={article.url}>{article.url}</a>                        
                    </strong>
                    
                    <SaveBtn
                      onClick={() => this.saveArticle(article.title, article.url)}                     
                    >
                      SAVE
                    </SaveBtn>
                  </ListItem>
                ))}
            </List>
          </Col>
        </Row>
        <Row>
          <Col size="md-8 offset-4">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            
              <DeleteBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Delete
              </DeleteBtn>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Article;
