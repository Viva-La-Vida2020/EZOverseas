import { Box, Typography } from "@mui/material";
import React from "react";

import styles from "./serviceTable.module.css";

interface ServiceItem {
  category: string;
  showCategory: boolean;
  rowSpan?: number;
  type: string;
  basic: boolean;
  advanced: boolean;
  vip: boolean;
}

const ServiceTable: React.FC = () => {
  const dataList: ServiceItem[] = [
    {
      category: "适途顾问",
      showCategory: true,
      rowSpan: 3,
      type: "测试结果评估",
      basic: true,
      advanced: true,
      vip: true,
    },
    {
      category: "适途顾问",
      showCategory: false,
      type: "学业背景评估",
      basic: true,
      advanced: true,
      vip: true,
    },
    {
      category: "适途顾问",
      showCategory: false,
      type: "家庭意见评估",
      basic: true,
      advanced: true,
      vip: true,
    },
    {
      category: "适途咨询师",
      showCategory: true,
      rowSpan: 8,
      type: "兴趣点挖掘",
      basic: false,
      advanced: true,
      vip: true,
    },
    {
      category: "适途咨询师",
      showCategory: false,
      type: "专业匹配沟通",
      basic: false,
      advanced: true,
      vip: true,
    },
    {
      category: "适途咨询师",
      showCategory: false,
      type: "专业对应行业情况",
      basic: false,
      advanced: true,
      vip: true,
    },
    {
      category: "适途咨询师",
      showCategory: false,
      type: "专业对口职业分析",
      basic: false,
      advanced: true,
      vip: true,
    },
    {
      category: "适途咨询师",
      showCategory: false,
      type: "课外活动规划",
      basic: false,
      advanced: false,
      vip: true,
    },
    {
      category: "适途咨询师",
      showCategory: false,
      type: "选校方案",
      basic: false,
      advanced: false,
      vip: true,
    },
    {
      category: "适途咨询师",
      showCategory: false,
      type: "留学规划",
      basic: false,
      advanced: false,
      vip: true,
    },
    {
      category: "适途咨询师",
      showCategory: false,
      type: "私人定制深度报告",
      basic: false,
      advanced: false,
      vip: true,
    },
    {
      category: "适途专业导师",
      showCategory: true,
      rowSpan: 5,
      type: "深度专业介绍",
      basic: true,
      advanced: true,
      vip: true,
    },
    {
      category: "适途专业导师",
      showCategory: false,
      type: "专业课程概况",
      basic: true,
      advanced: true,
      vip: true,
    },
    {
      category: "适途专业导师",
      showCategory: false,
      type: "面试经验分享",
      basic: true,
      advanced: true,
      vip: true,
    },
    {
      category: "适途专业导师",
      showCategory: false,
      type: "大学生活分析",
      basic: true,
      advanced: true,
      vip: true,
    },
    {
      category: "适途专业导师",
      showCategory: false,
      type: "职场经验介绍",
      basic: true,
      advanced: true,
      vip: true,
    },
  ];

  return (
    <Box sx={{ pt: 5, pb: 5 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        适途服务类型
      </Typography>
      <div className={styles.serviceTableDiv}>
        <div className={styles.tableWrapper}>
          <table>
            <tr>
              <th className={styles.firstColumn}></th>
              <th className={styles.secondColumn}>
                <h4>项目类型</h4>
              </th>
              <th className={styles.thirdColumn}>
                <h4>基础多对一服务</h4>
                <span>
                  <p>适合对目标专业有较清晰方向的同学</p>
                </span>
              </th>
              <th className={styles.fourColumn}>
                <h4>精品多对一服务</h4>
                <span>
                  <p>适合对目标专业有基本方向的同学</p>
                </span>
              </th>
              <th className={styles.thirdColumn}>
                <h4>VIP定制服务</h4>
                <span>
                  <p>适合对目标专业基本没有方向的同学</p>
                </span>
              </th>
            </tr>
            {dataList.map((item: ServiceItem, index: number) => (
              <tr key={`service_table_row_${index}`}>
                {item.showCategory ? (
                  <th rowSpan={item.rowSpan} className={styles.firstColumn}>
                    <span>{item.category}</span>
                  </th>
                ) : null}
                <th className={styles.orangeCell}>{item.type}</th>
                <td className={styles.greyCell}>{item.basic ? "Y" : ""}</td>
                <td className={styles.lightOrangeCell}>
                  {item.advanced ? "Y" : ""}
                </td>
                <td className={styles.greyCell}>{item.vip ? "Y" : ""}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </Box>
  );
};
export default ServiceTable;
