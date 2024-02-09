import '../../../app/assets/styles/style.scss'
import {Menu} from "../../menu";
import {Header} from "../../header";
import {Outlet} from "react-router-dom";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";
import {NotAuth} from "../../not-auth";

const DefaultLayout = () => {

    const {data} = useAppSelector(state => state.auth)

    return (
        <div style={{display: 'flex', minHeight: '100vh'}}>
            <Menu/>
            <div style={{width: '100%'}}>
                {!(!data && !localStorage.getItem('token')) ? <><Header/>
                    <main>
                        <Outlet/>
                    </main>
                </> : <NotAuth/>}
            </div>
        </div>
    );
};

export default DefaultLayout;