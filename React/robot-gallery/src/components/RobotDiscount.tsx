import React, { useContext, useState } from "react";
import styles from "./Robot.module.css";
import { appContext, appSetStateContext } from "../AppState";
import { useAddToCart } from "./AddToCart";


interface RobotProps {
    id: number;
    name: string;
    email: string;
    // addToCart:(id,name)=>void; 
}

const RobotDiscount: React.FC<RobotProps> = ({ id, name, email }) => {
    
    const value = useContext(appContext)

    // 引入自定义hook，用来获取addToCart函数
    // 自定义 Hook 实际上是一种函数，它能让你在函数组件中复用状态逻辑。自定义 Hook 的原理基于 React 的钩子机制，
    // 通过使用一些内置的钩子函数，如useState、useEffect等，并结合一些自定义的逻辑，可以创建出可以在多个组件中共
    // 享的逻辑。对于自定义 Hook，需要遵循一些命名规则，通常以"use"开头，以示其作为一个钩子函数。
    // 这个自定义hook返回的是一个addToCart函数，通过useAddToCart()函数调用这个自定义hook，就可以获取到addToCart函数
    const addToCart = useAddToCart();

    return (
        <div className={styles.cardContainer}>
            <img alt="robot" src={`https://robohash.org/${id}`} />
            <h2>打折商品</h2>
            <h2>{name}</h2>
            <p>{email}</p>
            <p>作者：{value.username}</p>
            <button onClick={() => addToCart(id, name)}>加入购物车</button>
        </div>
    );
};

export default RobotDiscount;