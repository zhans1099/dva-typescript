
import dva, {DvaInstance} from 'dva';
import createHistory from 'history/createBrowserHistory';
import {registerModel} from "./lib/utils";

import 'moment/locale/zh-cn';
import './App.css';
// 1. Initialize
const app: DvaInstance = dva({
    history: createHistory(),
});

// 2. Plugins
// app.use(createLoading());

// 3. Register global model

registerModel(app, require('./modules/Organization/models/OrgTreeModel.tsx').default)
registerModel(app, require('./modules/Organization/models/OrgPageModel.tsx').default)
registerModel(app, require('./modules/Organization/models/OrgContentModel.tsx').default)
registerModel(app, require('./components/Container/models/SheetModel.ts').default)
registerModel(app, require('./components/Container/models/MenuModel.ts').default)

// 4. Router
app.router(require('./Router').default);

// 5. Start
app.start('#app');
