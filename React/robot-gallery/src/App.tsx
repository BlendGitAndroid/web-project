import React, { useState, useEffect } from "react";
import logo from "./assets/images/logo.svg";    // svg的定义已经在react-app-env.d.ts中定义了，不像css需要单独定义
// import robots from "./mockdata/robots.json";
import Robot from "./components/Robot";
import RobotDiscount from "./components/RobotDiscount";
import styles from "./App.module.css";
import ShoppingCart from "./components/ShoppingCart";
import { OptimizingPage } from "./optimizing/OptimizingPage";

interface Props {

}

interface State {
    robotGallery: any[];
    count: number;
}

const App: React.FC<Props> = (props) => {

    // function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
    // S | (() => S表示接受一个S类型的初始值，或者一个函数，返回一个S类型的初始值
    // [S, Dispatch<SetStateAction<S>>]表示返回一个数组，数组的第一个元素是S类型的值，
    // 第二个元素是一个函数，这个函数接受一个S类型的值，返回一个void

    const [count, setCount] = useState<number>(0);
    const [robotGallery, setRobotGallery] = useState<any>([]);  // 这里定义的是any类型，从网络上获取数据，因为返回的数据类型是不确定的
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>()

    useEffect(() => {
        document.title = `点击${count}次`
    }, [count]) // 只有count发生变化时，才会触发useEffect

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const responses = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );
                // .then(response => response.json())
                // .then(data=>setRobotGallery(data))
                const data = await responses.json();
                setRobotGallery(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false)
            }
        };
        fetchData() // 这里调用fetchData函数，因为useEffect的第二个参数是空数组，所以只会在组件挂载的时候执行一次
    }, [])  // 这里的[]表示只在组件挂载的时候执行一次


    return (
        // className是JSX的语法，用来添加class属性
        // typescript-plugin-css-modules插件会自动帮我们完成样式的映射
        <div className={styles.app}>

            <div className={styles.appHeader}>
                <img src={logo} className={styles.appLogo} alt="logo" />
                <h1>罗伯特机器人炫酷吊炸天online购物平台的名字要长</h1>
            </div>

            <div>
                {console.log("OptimizingPage")}
                <OptimizingPage />
            </div>

            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                Click
            </button>

            <span>count:{count}</span>

            {/* 购物车组件 */}
            <ShoppingCart />

            {!!error && <div>网站出错：{error}</div>}

            {!loading ? (
                <div className={styles.robotList}>
                    {robotGallery.map((r, index) =>
                        index % 2 == 0 ? (
                            <RobotDiscount id={r.id} email={r.email} name={r.name} key={index} />
                        ) : (
                            <Robot id={r.id} email={r.email} name={r.name} key={index} />
                        )
                    )}
                </div>
            ) : (
                <h2>loading加载中</h2>
            )}

        </div>
    );
};

export default App;
