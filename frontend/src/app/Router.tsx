import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Layout} from "../widgets/layout";
import Home from "../pages/home";
import Shared from "../pages/shared";
import AllFiles from "../pages/all-files";
import Favorites from "../pages/favorites";
import PrivateFiles from "../pages/private-files";
import DeletedFiles from "../pages/deleted-files";
import Help from "../pages/help";
import SignUp from "../pages/sign-up";
import SignIn from "../pages/sign-in";
import {useAppDispatch} from "../shared/lib/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {fetchLoginMe} from "../shared/api/auth/auth.action.ts";

const Router = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchLoginMe())
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
                </Route>
                <Route path='/auth/register' element={<SignUp/>}/>
                <Route path='/auth/login' element={<SignIn/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;