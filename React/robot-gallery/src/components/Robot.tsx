import React, { useContext, useState } from "react";
import styles from "./Robot.module.css";    // 引入局部样式,这里的样式是局部的，只会影响到当前组件，通过对象的方式来访问样式
import { appContext, appSetStateContext } from "../AppState";
import { withAddToCart } from "./AddToCart"

export interface RobotProps {
    id: number;
    name: string;
    email: string;
    addToCart: (id, name) => void;
}

// React.FC是一个泛型接口，FC是FunctionComponent的缩写
// 使用{}来进行解构
const Robot: React.FC<RobotProps> = ({ id, name, email, addToCart }) => {

    // useContext是appContext.Consumer的替代方案，用来获取appContext.Provider的value
    const value = useContext(appContext)

    return (
        <div className={styles.cardContainer}>
            <img alt="robot" src={`https://robohash.org/${id}`} />
            <h2>{name}</h2>
            <p>{email}</p>
            <p>作者：{value.username}</p>
            <button onClick={() => addToCart(id, name)}>加入购物车</button>
        </div>
    );

    // 通过appContext.Consumer来获取appContext.Provider的value
    // return (
    //     <appContext.Consumer>
    //         {
    //             (value) => {
    //                 return (<div className={styles.cardContainer}>
    //                     <img alt="robot" src={`https://robohash.org/${id}`} />
    //                     <h2>{name}</h2>
    //                     <p>{email}</p>
    //                     <p>作者：{value.username}</p>
    //                     <button onClick={() => addToCart(id, name)}>加入购物车</button>
    //                 </div>
    //                 );
    //             }
    //         }
    //     </appContext.Consumer>
    // )
};

// 高阶组件，用来给Robot组件添加一个addToCart方法，方法的入参是Robot
export default withAddToCart(Robot);