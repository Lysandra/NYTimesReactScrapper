import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Detail extends Component {
  state = {
    article: [],
    title: "",
    startDate: "",
    link: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ article: res, title: "", date: "", link: "" })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticle())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.date) {
      API.saveArticle({
        title: this.state.title,
        date: this.state.date,
        link: this.state.link
      })
        .then(res => this.loadArticle())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-8">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="start-year"
                placeholder="Start Year"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="end-year"
                placeholder="End Year"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                SEARCH
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
