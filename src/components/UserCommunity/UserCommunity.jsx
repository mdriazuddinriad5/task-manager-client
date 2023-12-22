import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";


const UserCommunity = () => {
    const { user } = useContext(AuthContext);
    const [userCategories, setUserCategories] = useState([]);


    useEffect(() => {
        fetch('clients.json')
            .then(res => res.json())
            .then(data => setUserCategories(data))
    }, [])

    return (
        <section className="bg-gray-100 py-16 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">User Community Showcase: Empower Your Work, Empower Your Life</h2>

            <p className="text-lg text-gray-600 mb-12">
                Welcome to our vibrant community at SCC Technovision Inc.&apos;s Task Management Platform! Our platform is tailored to serve a diverse range of professionals, bringing efficiency and organization to your daily tasks. See how different individuals and industries benefit:
            </p>

            <div className="flex flex-wrap justify-center">
                {userCategories.map((category) => (
                    <div key={category.title} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                        <img src={category.image} alt={category.title} className="mx-auto mb-4 w-32 h-32 object-cover rounded-full" />
                        <strong className="text-xl font-bold text-gray-800 mb-4">{category.title}</strong>
                        <p className="text-gray-600">{category.description}</p>
                    </div>
                ))}
            </div>

            <p className="text-lg text-gray-600 mt-8">
                <strong>How It Works:</strong> Explore our user-friendly platform by signing up or logging in. Create, organize, and manage tasks effortlessly in a visually intuitive dashboard.
            </p>

            {
                user ? <button className="bg-green-500 text-white py-4 px-8 text-lg font-bold rounded focus:outline-none hover:bg-green-600 transition duration-300 mt-8">
                    Thanks for using our app
                </button> :
                    <Link to={'/register'}>
                        <button className="bg-green-500 text-white py-4 px-8 text-lg font-bold rounded focus:outline-none hover:bg-green-600 transition duration-300 mt-8">
                            Join Us Today and Empower Your Productivity!
                        </button>
                    </Link>
            }

        </section>
    );
};

export default UserCommunity;