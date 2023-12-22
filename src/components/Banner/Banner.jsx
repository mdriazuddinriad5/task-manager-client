import { Link } from "react-router-dom";
import bannerImg from "../../assets/Chocolate Elegant Task Management Kanban Board Template.png"

const Banner = () => {
    return (
        <div>
            <div className="relative">
                <img src={bannerImg} alt="" />
                <Link to={'/login'}>
                    <button className="btn btn-success absolute right-0 -mt-12">Let&apos;s Explore</button>
                </Link>
            </div>

        </div>
    );
};

export default Banner;