import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button, Label, FormControl, FieldGroup, ButtonToolbar} from 'react-bootstrap';


class RegistrationForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: '', password: '' };

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUsernameChange(event) {
		this.setState({ username: event.target.value });
	}

	handlePasswordChange(event) {
		this.setState({ password: event.target.value });
	}

	handleSubmit(event) {
		axios.post('http://localhost:3000/register', {
			username: this.state.username,
			password: this.state.password
		})
			.then(resp => {
				console.log(resp.data.message);
				this.props.registerFn();
			})
			.catch(error => {
				console.log('Error registering:', error.message)
			})
		event.preventDefault();
	}

	render() {
		return (
			<div id="register-page">
				<h1>
					Register
				</h1>
				<form id="register-form">
					<label>Username</label>
					<FormControl id="username-input" type="text" value={this.state.username} onChange={this.handleUsernameChange}  />
					<label>Password</label>
					<FormControl id="password-input" type="password" value={this.state.password} onChange={this.handlePasswordChange}  />
					<div id="form-buttons-bar">
						<Button bsStyle="primary" onClick={this.handleSubmit}>
							Submit
						</Button>
					</div>
				</form>
				<span>Already have an account? <a onClick={this.props.registerFn}>Login</a></span>
			</div>
		);
	}
}

export default RegistrationForm;