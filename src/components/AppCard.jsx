import React from "react";
import { Card, Col, Row } from "antd";
import TableItem from "./TableItem";

function AppCard() {
  return (
    <div className='app-card'>
      <Row>
        <Col span={12} offset={6}>
          <Card title='Inventory List' bordered={false}>
            <TableItem></TableItem>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AppCard;
