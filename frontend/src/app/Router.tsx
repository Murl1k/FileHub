import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Layout} from "../widgets/layout";
import App from "../pages/sign-in";
import Home from "../pages/home";
import Shared from "../pages/shared";
import AllFiles from "../pages/all-files";
import Favorites from "../pages/favorites";
import PrivateFiles from "../pages/private-files";
import DeletedFiles from "../pages/deleted-files";
import Help from "../pages/help";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='/auth' element={<App/>}/>
                    <Route path='/shared' element={<Shared/>}/>
                    <Route path='/all-files' element={<AllFiles/>}/>
                    <Route path='/favorites' element={<Favorites/>}/>
                    <Route path='/private-files' element={<PrivateFiles/>}/>
                    <Route path='/deleted-files' element={<DeletedFiles/>}/>
                    <Route path='/help' element={<Help/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;