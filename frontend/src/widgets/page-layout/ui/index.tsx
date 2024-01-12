import {Outlet} from "react-router-dom";

const PageLayout = () => {
    return (
        <div className="page">
            <Outlet/>
        </div>
    );
};

export default PageLayout;