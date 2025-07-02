import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth} from '../../context/AuthContext'

export default function SignUpTab() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState([])    
    const { firstName, lastName, email, password } = formData;
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const { login } = useAuth(); 

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !password) {
            setErrors([{ msg: 'All fields are required' }]);
            return;
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify(formData);
            const res = await axios.post('/api/users', body, config); // Relative URL
            console.log(res.data);
            login(res.data.token); // store token just like login flow
            navigate('/main'); // Navigate to the main page on success
        } catch (err) {
            console.error(err.response.data);
            const responseErrors = err.response?.data?.errors;
            if (Array.isArray(responseErrors)) {
                setErrors(responseErrors);
            } else if (typeof err.response?.data === 'string') {
                setErrors([{ msg: err.response.data }]);
            } else {
                setErrors([{ msg: 'Registration failed' }]);
            }
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={onChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={onChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSignUpEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={onChange}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSignUpPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            {Array.isArray(errors) && errors.length > 0 && (
                <ul>
                    {errors.map((error, index) => (
                        <li key={index}>{error.msg}</li>
                    ))}
                </ul>
            )}
        </Form>
    );
}
