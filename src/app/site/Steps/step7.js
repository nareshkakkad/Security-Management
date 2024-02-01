import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Form, Input, InputNumber, Select, Space, Typography, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
const Step2 = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([])
    const [file, setFile] = useState();
    const fileUplaod = (event) => {
        console.log(event.target.files[0])
        setFile(event.target.files[0])
        console.log(file)
    }
    const onFinish = (values) => {
        const data = values?.items?.map(item => Object.assign({}, item, { step: '2', site_id: props.siteId }))
        setData(data);
    };
    return (
        <Form
            labelCol={{
                span: 12,
            }}
            wrapperCol={{
                span: 6,
            }}
            form={form}
            name="dynamic_form_complex"
            style={{
                maxWidth: 600,
            }}
            autoComplete="off"
            initialValues={{
                items: [{}],
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="note"
                label="Monday To Thursday (Day => 6:00 to 18:00)"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="note"
                label="Monday To Thursday (Night => 18:00 to 6:00)"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="note"
                label="Friday(12:00 to 18:00)"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="note"
                label="Saturday"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="note"
                label="Sunday"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="note"
                label="Public Holiday"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Divider/>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                className='mt-2 float-right'
            >
                <Button type="primary" htmlType="submit">
                    Save Changes
                </Button>
            </Form.Item>
        </Form>
    );
};
export default Step2;