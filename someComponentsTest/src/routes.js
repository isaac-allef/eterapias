import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Sheets from './componets/sheet';
import List from './componets/list';
import listOnlyRead from './componets/listOnlyRead'
import Main from './pages/main';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/load" component={Sheets} />
                <Route path="/list" component={List} />
                <Route path="/listOnlyRead" component={listOnlyRead} />
                <Route path="/" component={Main} />
            </Switch>
        </BrowserRouter>
    );
}