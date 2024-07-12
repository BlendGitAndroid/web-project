import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { withRouter, RouteComponentProps } from "react-router-dom";
import store, { RootState } from "../../redux/store";
import { withTranslation, WithTranslation } from "react-i18next";
import {
  addLanguageActionCreator,
  changeLanguageActionCreator,
} from "../../redux/language/languageActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { LanguageState } from "../../redux/language/languageReducer";

// 从store中获取state，传递给组件
const mapStateToProps = (state: RootState) => {
  return {
    language: state.language.language,  // 从store中获取语言信息
    languageList: state.language.languageList // 从store中获取语言列表
  }
}

// 定义mapDispatchToProps，将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: "zh" | "en") => {
      const action = changeLanguageActionCreator(code);
      dispatch(action);
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code);
      dispatch(action);
    },
  };
};

type PropsType = RouteComponentProps & // react-router 路由props类型
  WithTranslation & // i18n props类型
  ReturnType<typeof mapStateToProps> & // redux store 映射类型
  ReturnType<typeof mapDispatchToProps>; // redux dispatch 映射类型 

// 将Header函数式组件改为类组件，将路由hook改为withRouter高阶组件
class HeaderComponnet extends React.Component<PropsType> {

  constructor(props) {
    super(props);
    // 通过store.dispatch分发了action，reducer更改了store后，在这里订阅store的变化，就能获取到最新的state用于更新组件
    // store.store.subscribe(this.handleStoreChange)
  }

  handleStoreChange = () => {
    // ******获取store中的state，这里的state是一个全局的state
    const storeState = store.store.getState();
    const language: LanguageState = storeState.language;  // 获取语言信息
    const user = storeState.user  // 获取用户信息
  }

  menuClickHandler = (e) => {
    console.log(e);
    if (e.key === "new") {  // 如果点击的是新增语言
      // 处理新语言添加action
      this.props.addLanguage("新语言", "new_lang");
    } else {
      this.props.changeLanguage(e.key)  // 这里的e.key就是Menu.Item传入的key
    }

    // ******最简单的redux使用方式，使用store直接dispatch action，然后store会自动调用reducer进行state更新
    // dispatch的作用是将action传递给reducer，reducer会根据action的type，更新state
    // const action = {
    //   type: "change_language",
    //   payload: e.key,
    // };
    // store.store.dispatch(action);
    
    
    // 添加ts类型约束
    // const action = changeLanguageActionCreator(e.key);
    // store.store.dispatch(action);


  };

  render() {

    // 从props中获取路由信息history，因为使用了withRouter高阶组件
    const { history, t } = this.props;

    return (
      <div className={styles["app-header"]}>
        {/* top-header */}
        <div className={styles["top-header"]}>
          <div className={styles.inner}>
            <Typography.Text>{t("header.slogan")}</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu onClick={this.menuClickHandler}>
                  {this.props.languageList.map((l) => {
                    return <Menu.Item key={l.code}>{l.name}</Menu.Item>;
                  })}

                  {/* 新增一个Menu，key是new写死的 */}
                  <Menu.Item key={"new"}>
                    {t("header.add_new_language")}
                  </Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined />}
            >
              {this.props.language === "zh" ? "中文" : "English"}
            </Dropdown.Button>
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => history.push("register")}>
                {t("header.register")}
              </Button>
              <Button onClick={() => history.push("signIn")}>
                {t("header.signin")}
              </Button>
            </Button.Group>
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
  }
}

// withRouter 是一个高阶组件，可以将不是通过路由渲染的组件，传递路由信息
// withTranslation()高阶组件，来给HomePageComponent组件传递t函数，用于国际化
// connect(mapStateToProps, mapDispatchToProps)是一个高阶组件，用于连接redux和组件
export const Header = connect(mapStateToProps, mapDispatchToProps)(
  withTranslation()(withRouter(HeaderComponnet))
);
