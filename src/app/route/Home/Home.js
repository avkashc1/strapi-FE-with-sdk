import React, { Component } from "react";
import getCurrentUser from "../../utils/getCurrentUser";
import { API_URL, LOGIN, AUTH, USERS } from "../../constant";
import { fetchStrapi } from "../../components/Strapi";
import {
  Button,
  Container,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      user: null,
      loading: false,
    };
  }

  componentDidMount() {
    getCurrentUser()
      .then((res) => {
        this.setState({ user: res, username: res.username, email: res.email });
      })
      .catch((err) => {
        toast.error(
          err.response.data.message || err.response.data.data[0].messages[0].id
        );
        this.logout();
      });
  }

  logout = () => {
    fetchStrapi.clearToken();
    this.props.history.push(LOGIN);
  };

  deleteUser = () => {
    fetchStrapi.deleteEntry("users", this.state.user.id).then((res) => {
      toast.success(`${res.username} deleted successfully.`);
      this.logout();
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    this.setState({ loading: true });
    const data = { username: this.state.username, email: this.state.email };
    fetchStrapi
      .updateEntry("users", this.state.user.id, data)
      .then((res) => {
        toast.success("Details Saved");
        this.setState({ user: res, loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        toast.error(err.response.data.data[0].messages[0].message);
      });
    event.preventDefault();
  };

  render() {
    return this.state.user ? (
      <Container className="col-md-6 col-xl-5">
        <Card className="m-4">
          <CardHeader>
            <h2>Welcome {this.state.user && this.state.user.username}</h2>
          </CardHeader>
          <CardBody>
            <Button onClick={this.logout} className="btn-danger">
              Logout
            </Button>
            <i
              className="fa fa-trash fa-lg d-block mt-4"
              onClick={this.deleteUser}
            ></i>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3>Edit User</h3>
          </CardHeader>
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
              <FormGroup>
                <Button
                  className={`btn-info ${
                    this.state.loading ? "btn-loading pr-5" : ""
                  }`}
                  type="submit"
                  title="Save"
                  disabled={this.state.loading}
                >
                  Save
                </Button>
              </FormGroup>
            </form>
          </CardBody>
        </Card>
      </Container>
    ) : (
      <Loading />
    );
  }
}

export default Home;
