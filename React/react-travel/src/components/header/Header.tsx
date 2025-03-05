import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown, Space } from "antd";
import type { MenuProps } from 'antd';
import { GlobalOutlined } from "@ant-design/icons";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
  LanguageActionTypes,
  addLanguageActionCreator,
  changeLanguageActionCreator,
} from "../../redux/language/languageActions";
import { useTranslation } from "react-i18next";
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { userSlice } from "../../redux/user/slice";

// 定义jwt的payload类型
interface JwtPayload extends DefaultJwtPayload {
  username: string
}

// Header的函数式组件
export const Header: React.FC = () => {

  // 路由钩子函数
  // 用于进行路由跳转
  const history = useHistory();
  // 获取当前路径
  const location = useLocation();
  // 获取路径参数
  const params = useParams();
  // 获取当前路由匹配信息
  const match = useRouteMatch();

  // 引入redux的钩子函数，获取store中的state，与类组件中的mapStateToProps相对应
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);

  // 引入redux的钩子函数，获取dispatch,从store.store中获取dispatch
  const dispatch = useDispatch();
  // const dispatch = useDispatch<Dispatch<LanguageActionTypes>>(); // 引入dispatch并指定dispatch的类型

  // 函数式组件引入国际化钩子函数,与类组件相对应的是withTranslation高阶组件
  const { t } = useTranslation();

  const jwt = useSelector(s => s.user.token)  // 获取到jwt的token

  const [username, setUsername] = useState("")

  const shoppingCartItems = useSelector(s => s.shoppingCart.items)
  const shoppingCartLoading = useSelector(s => s.shoppingCart.loading)

  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt) // 解析jwt
      setUsername(token.username)
    }
  }, [jwt])

  const menuClickHandler = (e) => {
    console.log(e);
    if (e.key === "new") {
      // 处理新语言添加action,dispatch的是一个对象
      dispatch(addLanguageActionCreator("新语言", "new_lang"));
    } else {
      dispatch(changeLanguageActionCreator(e.key));
    }
  };

  const onLogout = () => {
    dispatch(userSlice.actions.logOut())
    history.push("/")
  }

  // 类型注解就是给变量、函数、参数等添加类型的过程，可以帮助我们在编码过程中发现错误，提高代码的健壮性。
  // items: MenuProps['items'] 是 TypeScript 中的一种类型注解语法，属于索引访问类型。
  // TypeScript 中的索引访问类型（Index Access Types）允许你通过对象类型的属性名来引用对象中的某个属性类型。
  // 它表示 items 这个属性的类型是 MenuProps 接口中 items 属性的类型。
  // map方法返回一个新的数组，数组中的元素是原始数组中的每个元素调用一个提供的函数后的返回值。
  const items: MenuProps['items'] = languageList.map((l) => {
    return {
      key: l.code,
      label: l.name
    };
  })

  items.push({ key: "new", label: t("header.add_new_language") });

  return (
    // styles是一个对象,["app-header"]是对象的属性,是方括号语法
    <div className={styles["app-header"]}>
      {/* top-header */}
      <div className={styles["top-header"]}>
        <div className={styles.inner}>
          {/* 设置多语言 */}
          <Typography.Text>{t("header.slogan")}</Typography.Text>

          {/* 选择语言 */}
          <Space>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              menu={{ items, onClick: menuClickHandler }}
              icon={<GlobalOutlined />}
            >
              {language === "zh" ? "中文" : "English"}
            </Dropdown.Button>
          </Space>

          {jwt ? (
            <Button.Group className={styles["button-group"]}>

              {/* 欢迎组件 */}
              <span>
                {t("header.welcome")}
                <Typography.Text strong>{username}</Typography.Text>
              </span>

              {/* 购物车 */}
              <Button
                loading={shoppingCartLoading}
                onClick={() => history.push("/shoppingCart")}
              >
                {t("header.shoppingCart")}({shoppingCartItems.length})
              </Button>

              {/* 注销 */}
              <Button onClick={onLogout}>{t("header.signOut")}</Button>
            </Button.Group>
          ) : (
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => history.push("/register")}>
                {t("header.register")}
              </Button>
              <Button onClick={() => history.push("/signIn")}>
                {t("header.signin")}
              </Button>
            </Button.Group>
          )}
        </div>
      </div>

      <Layout.Header className={styles["main-header"]}>

        <span onClick={() => history.push("/")}>
          <img src={logo} alt="logo" className={styles["App-logo"]} />
          <Typography.Title level={3} className={styles.title}>
            {t("header.title")}
          </Typography.Title>
        </span>

        <Input.Search
          placeholder={"请输入旅游目的地、主题、或关键字"}
          className={styles["search-input"]}
          onSearch={(keywords) => history.push("/search/" + keywords)}
        />
      </Layout.Header>

      <Menu mode={"horizontal"} className={styles["main-menu"]}>
        <Menu.Item key="1"> {t("header.home_page")} </Menu.Item>
        <Menu.Item key="2"> {t("header.weekend")} </Menu.Item>
        <Menu.Item key="3"> {t("header.group")} </Menu.Item>
        <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
        <Menu.Item key="5"> {t("header.private")} </Menu.Item>
        <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
        <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
        <Menu.Item key="8"> {t("header.local")} </Menu.Item>
        <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
        <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
        <Menu.Item key="11"> {t("header.study")} </Menu.Item>
        <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
        <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
        <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
        <Menu.Item key="15"> {t("header.outdoor")} </Menu.Item>
        <Menu.Item key="16"> {t("header.insurance")} </Menu.Item>
      </Menu>
    </div>
  );
};
