import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUpTab from '../components/SignUpTab/SignUpTab';
import LoginTab from '../components/LoginTab/LoginTab';
import '../styles/Login.css'; // Ensure you have this CSS file imported

export default function Login() {
    return (
        <div className='login--container'>
            <div className='login--content'>
                <Tabs
                    defaultActiveKey="login"
                    id="justify-tab-example"
                    className="mb-3"
                    justify
                >
                    <Tab eventKey="signup" title="Sign Up">
                        <SignUpTab />
                    </Tab>
                    <Tab eventKey="login" title="Login">
                        <LoginTab />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}
