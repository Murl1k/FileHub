import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "../pages/home";
import Shared from "../pages/shared";
import AllFiles from "../pages/all-files";
import Favorites from "../pages/favorites";
import PrivateFiles from "../pages/private-files";
import DeletedFiles from "../pages/deleted-files";
import Help from "../pages/help";
import SignUp from "../pages/sign-up";
import SignIn from "../pages/sign-in";
import Profile from "../pages/profile";
import Settings from "../pages/settings";
import {Layout} from "../widgets/layout";
import {useAppDispatch} from "../shared/lib/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {fetchLoginMe} from "../features/auth/model/auth.action.ts";

const Router = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        localStorage.getItem('token') && dispatch(fetchLoginMe())
    }, [dispatch])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='/shared' element={<Shared/>}/>
                    <Route path='/all-files' element={<AllFiles/>}/>
                    <Route path='/favorites' element={<Favorites/>}/>
                    <Route path='/private-files' element={<PrivateFiles/>}/>
                    <Route path='/deleted-files' element={<DeletedFiles/>}/>
                    <Route path='/help' element={<Help/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/profile/settings' element={<Settings/>}/>
                </Route>
                <Route path='/auth/register' element={<SignUp/>}/>
                <Route path='/auth/login' element={<SignIn/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;