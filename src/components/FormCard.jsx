import React from "react";
import { Card, Col, Row } from "antd";
import FormItem from "./FormItem";

function FormCard() {
  return (
    <div className='app-form'>
      <Row>
        <Col span={12} offset={6}>
          <Card Card title='Add Inventory' bordered={false}>
            <FormItem></FormItem>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default FormCard;
