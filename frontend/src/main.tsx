import ReactDOM from 'react-dom/client'
import Router from "./app/Router.tsx";
import {store} from "./shared/api/store";
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Router/>
    </Provider>
)
