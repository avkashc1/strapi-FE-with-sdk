import React, { Component } from "react";
import { API_URL, AUTH, LOGIN_API, HOME, REGISTER } from "../../constant";
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (event) => {
    this.setState({ loading: true });
    const { password, username } = this.state;
    fetchStrapi
      .login(username, password)
      .then((res) => {
        toast.success("Logged in successfully");
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
          <CardHeader>Login</CardHeader>
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
                  title="Login"
                  disabled={this.state.loading}
                >
                  Login
                </Button>
              </FormGroup>
              <span>
                Don't have an account?{" "}
                <Link to={{ pathname: REGISTER }} className="text-info">
                  Register
                </Link>
              </span>
            </form>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Login;
