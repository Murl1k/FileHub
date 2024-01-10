import {Menu} from "../../menu";
import {Header} from "../../header";
import {Outlet} from "react-router-dom";
import '../../../app/assets/styles/style.scss'

const Layout = () => {
    return (
        <div style={{display: 'flex'}}>
            <Menu/>
            <div style={{width: '100%', marginLeft: '280px'}}>
                <Header/>
                <main className='main'>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

export default Layout;