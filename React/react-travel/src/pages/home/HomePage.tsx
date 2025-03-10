import React from "react";
import {BusinessPartners, Carousel, ProductCollection, SideMenu,} from "../../components";
import {Col, Row, Spin, Typography} from "antd";
import sideImage from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import {withTranslation, WithTranslation} from "react-i18next";
import {connect} from "react-redux";
import {RootState} from "../../redux/store";
import {giveMeDataActionCreator} from "../../redux/recommendProducts/recommendProductsActions";
import {MainLayout} from "../../layouts/mainLayout";

// 从store中获取数据，
const mapStateToProps = (state: RootState) => {
    return {
        loading: state.recommendProducts.loading,
        error: state.recommendProducts.error,
        productList: state.recommendProducts.productList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        giveMeData: () => {
            // 这里的dispatch是一个函数,会交给redux-thunk处理,redux-thunk会拦截这个函数
            dispatch(giveMeDataActionCreator());
        },
    };
};

type PropsType = WithTranslation &  // 国际化props类型
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends React.Component<PropsType> {

    componentDidMount() {
        this.props.giveMeData();
    }

    render() {
        // console.log(this.props.t)
        const {t, productList, loading, error} = this.props;

        // 如果正在加载中
        if (loading) {
            return (
                <Spin
                    size="large"
                    style={{
                        marginTop: 200,
                        marginBottom: 200,
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                    }}
                />
            );
        }

        // 如果发生错误
        if (error) {
            return <div>网站出错：{error}</div>;
        }

        return (
            <MainLayout>
                <Row style={{marginTop: 20}}>
                    <Col span={6}>
                        <SideMenu/>
                    </Col>
                    <Col span={18}>
                        <Carousel/>
                    </Col>
                </Row>

                {/* 爆款推荐 */}
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="warning">
                            {t("home_page.hot_recommended")}
                        </Typography.Title>
                    }
                    sideImage={sideImage}
                    products={productList[0].touristRoutes}
                />

                <ProductCollection
                    title={
                        <Typography.Title level={3} type="danger">
                            {t("home_page.new_arrival")}
                        </Typography.Title>
                    }
                    sideImage={sideImage2}
                    products={productList[1].touristRoutes}
                />

                <ProductCollection
                    title={
                        <Typography.Title level={3} type="success">
                            {t("home_page.domestic_travel")}
                        </Typography.Title>
                    }
                    sideImage={sideImage3}
                    products={productList[2].touristRoutes}
                />

                {/* 合作企业 */}
                <BusinessPartners/>
            </MainLayout>
        );
    }
}

// 使用withTranslation()高阶函数，来给HomePageComponent组件传递t函数，用于国际化
export const HomePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(HomePageComponent));
