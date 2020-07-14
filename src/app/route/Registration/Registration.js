import React, { Component } from "react";
import axios from "axios";
import { API_URL, AUTH, HOME, REGISTER_API, LOGIN } from "../../constant";
import { fetchStrapi } from "../../components/Strapi";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Input,
  FormGroup,
  Container,
  Label,
  CardHeader,
  CardBody,
} from "reactstrap";
import { toast } from "react-toastify";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (event) => {
    this.setState({ loading: true });
    const { email, password, username } = this.state;
    fetchStrapi
      .register(username, email, password)
      .then((res) => {
        toast.success("Signed Up Successfully");
        this.setState({ loading: false });
        this.props.history.push(HOME);
      })
      .catch((err) => {
        this.setState({ loading: false });
        toast.error(err.response.data.data[0].messages[0].message);
        throw err;
      });
    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <Container className="col-md-6 col-xl-5">
        <Card className="m-4">
          <CardHeader>Sign Up</CardHeader>
          <CardBody>
            <form onSubmit={this.handleSubmit}>
              <FormGroup className="text-left md-form">
                <Label className="text-muted small">Username: </Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup className="text-left md-form">
                <Label className="text-muted small">Email: </Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup className="text-left">
                <Label className="text-muted small">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Button
                  className={`btn-info btn-block ${
                    this.state.loading ? "btn-loading" : ""
                  }`}
                  type="submit"
                  title="Sign Up"
                  disabled={this.state.loading}
                >
                  Sign Up
                </Button>
              </FormGroup>
              <span>
                Already have an account?{" "}
                <Link to={{ pathname: LOGIN }} className="text-info">
                  Login
                </Link>
              </span>
            </form>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Registration;
