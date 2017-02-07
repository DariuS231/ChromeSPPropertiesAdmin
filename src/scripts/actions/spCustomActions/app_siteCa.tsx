import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { hashHistory, IndexRoute, Route, Router } from "react-router";
import { AppBase } from "./../common/AppBase";
import SpCustomModalWrapper from "./../common/components/spCustomModalWrapper";
import Utils from "./../common/utils";
import SpCustomActions from "./components/spCustomActions";
import SpCustomActionItemEdit from "./components/spCustomActionsItemEdit";
import { constants } from "./constants/constants";
import { configureStore } from "./store/configureStore-dev";

class App extends AppBase {
    constructor() {
        super(constants.COMPONENT_WEB_CA_DIV_ID);
        this.onCloseWrapperClick = this.onCloseWrapperClick.bind(this);
    }

    public onCloseWrapperClick() {
        hashHistory.push("/");
        this.remove();
    }
    public show() {
        const that = this;
        Utils.ensureSPObject().then(() => {
            const store = configureStore({});

            const wrapper: React.StatelessComponent<{ children?: any }> = (props: { children?: any }) => {
                return <SpCustomModalWrapper
                        onCloseClick={this.onCloseWrapperClick}
                        modalDialogTitle={constants.MODAL_SITE_CA_DIALOG_TITLE}
                >
                    <div className="action-container sp-customActions">
                        {props.children}
                    </div>
                </SpCustomModalWrapper>;
            };

            ReactDOM.render(<Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/" component={wrapper} >
                        <IndexRoute component={SpCustomActions} />
                        <Route path="newItem/:type" component={SpCustomActionItemEdit} />
                        <Route path="item/:guid" component={SpCustomActionItemEdit} />
                    </Route>
                </Router>
            </Provider>, document.getElementById(that.baseDivId));
        });
    }
}

window.SpCustomActionsObj = new App();
window.SpCustomActionsObj.show();
