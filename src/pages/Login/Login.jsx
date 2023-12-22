import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";




const Login = () => {
    const { signIn, googleSignIn, githubSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [success, setSuccess] = useState('');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        if (loginError) {
            Swal.close();
            Swal.fire(
                'Sorry!',
                `${loginError}`,
                'error'
            );
        }

        if (success) {
            Swal.close();
            Swal.fire(
                'Good Job!',
                `${success}`,
                'success'
            );
        }
    }, [loginError, success]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setSuccess('');
        setLoginError('');

        try {
            await signIn(email, password);
            setSuccess('Logged in successfully');
            e.target.reset();
            navigate(location?.state ? location.state : '/')
        } catch (error) {
            console.error(error);
            console.log("Error code:", error.code); // Log the error code

            switch (error.code) {
                case "auth/invalid-email":
                    setLoginError('email doesn\'t match');
                    break;
                case "auth/invalid-login-credentials":
                    setLoginError('Password doesn\'t match');
                    break;
                default:
                    setLoginError('An unexpected error occurred while signing in');
                    break;
            }
        }
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user)
                setSuccess('Logged in successfully');
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const handleGithubSignIn = () => {
        githubSignIn()
            .then(result => {
                console.log(result.user)
                setSuccess('Logged in successfully');
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                console.log(error.message)
            })
    }


    return (
        <div>

            <div className=" mt-10 bg-base-200">
                <div className="flex-col">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold">Login now!</h1>
                    </div>
                    <div className="card shadow-2xl lg:w-1/3 mx-auto bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />

                            </div>
                            <div className="form-control mt-4">
                                <button className="btn btn-primary">Login</button>
                            </div>

                        </form>


                        <p className="text-center my-2">Don&apos;t have an account? <Link to={'/register'} className="text-blue-700 font-bold">Register</Link></p>

                        <div className="form-control w-5/6 mx-auto mt-6 mb-4">
                            <button onClick={handleGoogleLogin} className="btn btn-primary">Login With Google</button>
                        </div>
                        <div className="form-control w-5/6 mx-auto mt-6 mb-4">
                            <button onClick={handleGithubSignIn} className="btn btn-primary">Login With Github</button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
