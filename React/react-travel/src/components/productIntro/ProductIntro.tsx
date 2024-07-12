import styles from "./ProductIntro.module.css";
import React from "react";
import { Typography, Carousel, Image, Rate, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface PropsType {
  title: string;
  shortDescription: string;
  price: string | number;
  coupons: string;  // 优惠券
  points: string; // 积分
  discount: string; // 折扣
  rating: string | number;  // 评分
  pictures: string[];
}

// 定义表格的列，两列
const columns: ColumnsType<RowType> = [
  {
    title: "title", 
    dataIndex: "title",
    key: "title",
    align: "left",
    width: 120,
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
];

// 定义表格的行
interface RowType {
  title: string;
  description: string | number | JSX.Element;
  key: number;
}

export const ProductIntro: React.FC<PropsType> = ({
  title,
  shortDescription,
  price,
  coupons,
  discount,
  rating,
  pictures,
}) => {

  // 表格数据
  const tableDataSource: RowType[] = [
    {
      key: 0,
      title: "路线名称",
      description: title,
    },
    {
      key: 1,
      title: "价格",
      description: (
        <>
          ¥{" "}
          <Typography.Text type="danger" strong>
            {price}
          </Typography.Text>
        </>
      ),
    },
    {
      key: 2,
      title: "限时抢购折扣",
      description: discount ? (
        <>
          ¥ <Typography.Text delete>{price}</Typography.Text>{" "}
          <Typography.Text type="danger" strong>
            ¥ {discount}
          </Typography.Text>
        </>
      ) : (
        "暂无折扣"
      ),
    },
    {
      key: 2,
      title: "领取优惠",
      description: coupons ? discount : "无优惠券可领",
    },
    {
      key: 2,
      title: "线路评价",
      description: (
        <>
          <Rate allowHalf defaultValue={+rating} />
          <Typography.Text style={{ marginLeft: 10 }}>
            {rating} 星
          </Typography.Text>
        </>
      ),
    },
  ];

  return (
    <div className={styles["intro-container"]}>
      {/* 产品名称 */}
      <Typography.Title level={4}>{title}</Typography.Title>
      {/* 产品描述 */}
      <Typography.Text>{shortDescription}</Typography.Text>
      {/* 产品价格和评分 */}
      <div className={styles["intro-detail-content"]}>
        <Typography.Text style={{ marginLeft: 20 }}>
          ¥ <span className={styles["intro-detail-strong-text"]}>{price}</span>{" "}
          /人起
        </Typography.Text>
        <Typography.Text style={{ marginLeft: 50 }}>
          <span className={styles["intro-detail-strong-text"]}>{rating}</span>{" "}
          分
        </Typography.Text>
      </div>

      {/* 图片走马灯组件 */}
      <Carousel autoplay slidesToShow={3}>
        {pictures.map((p) => (
          <Image height={150} src={p} />
        ))}
      </Carousel>

      {/* 产品信息表格 */}
      <Table<RowType>
        columns={columns} // 表格列
        dataSource={tableDataSource}  // 表格数据
        size="small"
        bordered={false}  // 不显示边框
        pagination={false}  // 不显示分页
        showHeader={false}  // 不显示表头
      />
    </div>
  );
};
