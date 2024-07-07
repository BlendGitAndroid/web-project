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