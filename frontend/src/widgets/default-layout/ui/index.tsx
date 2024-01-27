import '../../../app/assets/styles/style.scss'
import {Menu} from "../../menu";
import {Header} from "../../header";
import {Outlet} from "react-router-dom";

const DefaultLayout = () => {
    return (
        <div style={{display: 'flex', minHeight: '100vh'}}>
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

export default DefaultLayout;