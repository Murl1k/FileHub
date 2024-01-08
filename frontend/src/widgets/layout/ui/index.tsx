import {Menu} from "../../menu";
import {Header} from "../../header";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div style={{display: 'flex'}}>
            <Menu/>
            <div style={{width: '100%', marginLeft: '280px'}}>
                <Header/>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;