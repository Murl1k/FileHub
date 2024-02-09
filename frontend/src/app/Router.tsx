import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useEffect} from "react";
import Home from "../pages/home";
import Shared from "../pages/shared";
import AllFiles from "../pages/all-files";
import Favorites from "../pages/favorites";
import PrivateFiles from "../pages/private-files";
import DeletedFiles from "../pages/deleted-files";
import ChangePassword from "../pages/change-password";
import ChangeUsername from "../pages/change-username";
import Help from "../pages/help";
import SignUp from "../pages/sign-up";
import SignIn from "../pages/sign-in";
import Profile from "../pages/profile";
import NotFound from "../pages/not-found";
import {DefaultLayout} from "../widgets/default-layout";
import {PageLayout} from "../widgets/page-layout";
import {NotAuth} from "../widgets/not-auth";
import {fetchLoginMe} from "../features/auth";
import {useAppDispatch} from "../shared/lib/hooks/useAppDispatch.ts";
import {useAppSelector} from "../shared/lib/hooks/useAppSelector.ts";

const Router = () => {

    const dispatch = useAppDispatch()

    const {data} = useAppSelector(state => state.auth)

    useEffect(() => {
        localStorage.getItem('token') && dispatch(fetchLoginMe())
    }, [dispatch])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<DefaultLayout/>}>
                    {!(!data && !localStorage.getItem('token')) ?
                        <>
                            <Route index element={<Home/>}/>
                            <Route path='/folder/:id' element={<Home/>}/>
                            <Route path='/shared' element={<Shared/>}/>
                            <Route path='/all-files' element={<AllFiles/>}/>
                            <Route path='/favorites' element={<Favorites/>}/>
                            <Route path='/private-files' element={<PrivateFiles/>}/>
                            <Route path='/deleted-files' element={<DeletedFiles/>}/>
                            <Route path='/help' element={<Help/>}/>
                            <Route path='/profile' element={<Profile/>}/>
                        </> :
                        <>
                            <Route index element={<NotAuth/>}/>
                            <Route path='/folder/:id' element={<NotAuth/>}/>
                            <Route path='/shared' element={<NotAuth/>}/>
                            <Route path='/all-files' element={<NotAuth/>}/>
                            <Route path='/favorites' element={<NotAuth/>}/>
                            <Route path='/private-files' element={<NotAuth/>}/>
                            <Route path='/deleted-files' element={<NotAuth/>}/>
                            <Route path='/help' element={<NotAuth/>}/>
                            <Route path='/profile' element={<NotAuth/>}/>
                            <Route path='/profile/settings' element={<NotAuth/>}/>
                        </>
                    }
                </Route>
                <Route path='/' element={<PageLayout/>}>
                    <Route path='/auth/register' element={<SignUp/>}/>
                    <Route path='/auth/login' element={<SignIn/>}/>
                    <Route path='/security/change-password' element={<ChangePassword/>}/>
                    <Route path='/security/change-username' element={<ChangeUsername/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;