import React, {useEffect} from "react";
import styles from "./App.module.css";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {DetailPage, HomePage, PlaceOrderPage, RegisterPage, SearchPage, ShoppingCartPage, SignInPage} from "./pages";
import {useSelector} from "./redux/hooks";
import {useDispatch} from "react-redux";
import {getShoppingCart} from "./redux/shoppingCart/slice";

{/* <PrivateRoute
isAuthenticated={jwt !== null}
path="/placeOrder"
component={PlaceOrderPage}
/> */
}

// 正常的路由
{/* <Route path="/register" component={RegisterPage} /> */
}

// 私有路由，只有登录后才能访问，这里的...rest是剩余参数，其实就是指的path="/placeOrder"
const PrivateRoute = ({component, isAuthenticated, ...rest}) => {
    const routeComponent = (props) => {
        return isAuthenticated ? (
            React.createElement(component, props) // 创建一个React元素
        ) : (
            <Redirect to={{pathname: "/signIn"}}/> // 重定向到登录页面
        );
    }

    return <Route render={routeComponent} {...rest} />;
}

function App() {

    const jwt = useSelector((s) => s.user.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (jwt) {
            dispatch(getShoppingCart(jwt));
        }
    }, [jwt]);

    return (
        <div className={styles.App}>
            {/* 路由系统：浏览器路由 */}
            <BrowserRouter>
                {/* Switch: 只匹配一个路由，只渲染第一个匹配的路由，消除页面堆叠的情况 */}
                <Switch>
                    {/* exact: 精确匹配，只有当路径完全匹配时才会渲染
                    exact 属性表示路径匹配时需要精确匹配。也就是说，只有当 URL 路径完全等于 / 时，才会渲染 HomePage 组件。
                    如果没有 exact 属性，路径 / 也会匹配其他以 / 开头的路径（例如 /about），这可能会导致意外的路由匹配。
                    path 属性： path 属性指定了路由的路径。在这个例子中，路径是 /，表示应用的根路径。
                    */}
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/signIn" component={SignInPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    {/* 详情页面, 通过touristRouteId来获取详情 */}
                    <Route path="/detail/:touristRouteId" component={DetailPage}/>
                    {/* 搜索页面，通过keywords来搜索, ?表示keywords可有可无 */}
                    <Route path="/search/:keywords?" component={SearchPage}/>
                    <PrivateRoute
                        isAuthenticated={jwt !== null}
                        path="/shoppingCart"
                        component={ShoppingCartPage}
                    />
                    <PrivateRoute
                        isAuthenticated={jwt !== null}
                        path="/placeOrder"
                        component={PlaceOrderPage}
                    />
                    {/* 404 页面，页面的最后一个界面,如果上面的都没有匹配,则到404界面 */}
                    <Route render={() => <h1>404 not found 页面去火星了 ！</h1>}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
