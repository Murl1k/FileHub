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
import Settings from "../pages/settings";
import {DefaultLayout} from "../widgets/default-layout";
import {PageLayout} from "../widgets/page-layout";
import {useAppDispatch} from "../shared/lib/hooks/useAppDispatch.ts";
import {fetchLoginMe} from "../features/auth/model/auth.action.ts";
import NotFound from "../pages/not-found";
import {NotAuth} from "../widgets/not-auth";
import {useAppSelector} from "../shared/lib/hooks/useAppSelector.ts";
import {selectIsAuth} from "../features/auth/model/auth.slice.ts";
import Folder from "../pages/folder";

const Router = () => {

    const dispatch = useAppDispatch()

    const isAuth = useAppSelector(selectIsAuth)

    useEffect(() => {
        localStorage.getItem('token') && dispatch(fetchLoginMe())
    }, [dispatch])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<DefaultLayout/>}>
                    {isAuth ?
                        <>
                            <Route index element={<Home/>}/>
                            <Route path='/shared' element={<Shared/>}/>
                            <Route path='/all-files' element={<AllFiles/>}/>
                            <Route path='/favorites' element={<Favorites/>}/>
                            <Route path='/private-files' element={<PrivateFiles/>}/>
                            <Route path='/deleted-files' element={<DeletedFiles/>}/>
                            <Route path='/help' element={<Help/>}/>
                            <Route path='/profile' element={<Profile/>}/>
                            <Route path='/folder/:id' element={<Folder/>}/>
                            <Route path='/profile/settings' element={<Settings/>}/>
                        </> :
                        <>
                            <Route index element={<NotAuth/>}/>
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