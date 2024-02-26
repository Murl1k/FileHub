import '../../../app/assets/styles/style.scss'
import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {Menu} from "../../menu";
import {Header} from "../../header";
import {NotAuth} from "../../not-auth";
import {useAppSelector} from "../../../shared/lib/hooks/useAppSelector.ts";

const DefaultLayout = () => {

    const navigate = useNavigate()

    const {data} = useAppSelector(state => state.auth)

    const isAuth = !(!data && !localStorage.getItem('token'))

    useEffect(() => {
        if (!isAuth) {
            navigate('/introduction')
        }
    });

    return (
        <div style={{display: 'flex', minHeight: '100vh'}}>
            <Menu/>
            <div style={{width: '100%', position: 'relative'}}>
                {
                    isAuth ?
                        <>
                            <Header/>
                            <main>
                                <Outlet/>
                            </main>
                        </> :
                        <NotAuth/>
                }
            </div>
        </div>
    );
};

export default DefaultLayout;