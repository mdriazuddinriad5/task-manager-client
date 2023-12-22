import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";



const Register = () => {

    const { createUser } = useContext(AuthContext);

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');


    useEffect(() => {
        if (registerError) {
            Swal.close(); 
            Swal.fire(
                'Sorry!',
                `${registerError}`,
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
    }, [registerError, success]);



    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;

        console.log(name, photo, email, password, accepted);

        setRegisterError('')
        setSuccess('')



        if (password.length < 6) {
            setRegisterError('Password is less than 6 characters')
            return
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password don\'t have a capital letter')
            return
        } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|'"`]/.test(password)) {
            setRegisterError('Password don\'t have a special character')
            return
        }
        else if (!accepted) {
            setRegisterError('You have to agree to the Terms and Conditions')
            return
        }



        // create user

        createUser(email, password)
            .then(result => {
                console.log(result.user)
                setSuccess('Successfully Registered')

                //update user
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photo
                })
                    .then()
                    .catch(error => console.log(error))
            })
            .catch(error => console.error(error))


    }

    return (
        <div>
           
            <div data-aos='fade-up' className=" mt-10 bg-base-200">
                <div className="flex-col">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold">Register now!</h1>

                    </div>
                    <div className="card shadow-2xl lg:w-1/3 mx-auto bg-base-100">
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" name="photo" placeholder="photo url" className="input input-bordered" required />
                            </div>
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
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <div>
                                    <input type="checkbox" name="terms" id="terms" />
                                    <label className="ml-2" htmlFor="terms">Accept our <a href="">Terms & Conditions</a></label>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>


                        <p className="text-center my-4">Already have an account? <Link to={'/login'} className="text-blue-700 font-bold">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;