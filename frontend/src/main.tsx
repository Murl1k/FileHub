import ReactDOM from 'react-dom/client'
import Router from "./app/Router.tsx";
import {store} from "./shared/api/store";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ToastContainer closeOnClick/>
        <Router/>
    </Provider>
)
