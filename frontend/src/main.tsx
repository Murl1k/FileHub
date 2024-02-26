import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import Router from "./app/Router.tsx";
import {store} from "./shared/api/store";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ToastContainer closeOnClick/>
        <Router/>
    </Provider>
)
