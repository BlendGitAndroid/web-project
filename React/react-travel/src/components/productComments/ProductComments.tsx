import { Comment, Tooltip, List } from "antd";
import React from "react";

// 定义评论组件的属性，data是一个数组，数组中的每个元素是一个对象，对象中包含了评论的作者、头像、内容、创建时间
interface PropsType {
  data: {
    author: string;
    avatar: string;
    content: string;
    createDate: string;
  }[];
}

export const ProductComments: React.FC<PropsType> = ({data}) => {
    return (
      <List
        dataSource={data}
        itemLayout="horizontal"
        renderItem={(item) => {
          return (
            <li>
              <Comment
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.createDate}
              />
            </li>
          );
        }}
      ></List>
    );
}