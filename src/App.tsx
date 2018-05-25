// import '@babel/polyfill';
// import 'url-polyfill';
import dva, {DvaInstance} from 'dva';

import createHistory from 'history/createHashHistory';
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';
// import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
// import './rollbar';

import './App.css';
import {registerModel} from "./lib/utils";
// 1. Initialize
const app: DvaInstance = dva({
    history: createHistory(),
});

// 2. Plugins
// app.use(createLoading());

// 3. Register global model
// app.model(require('./models/global').default);
registerModel(app, require('./modules/Organization2/models/OrgModel').default)
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#app');
