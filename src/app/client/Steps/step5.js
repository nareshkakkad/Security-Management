import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Form, Input, Select, Space, Typography, Upload } from 'antd';
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
                span: 6,
            }}
            wrapperCol={{
                span: 18,
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
            <Form.List name="items">
                {(fields, { add, remove }) => (
                    <div
                        style={{
                            display: 'flex',
                            rowGap: 16,
                            flexDirection: 'column',
                        }}
                    >
                        <Button type="dashed" onClick={() => add()} block>
                            + Add Item
                        </Button>
                        {fields.map((field) => (
                            <Card
                                size="small"
                                title={`Report ${field.name + 1}`}
                                key={field.key}
                                extra={
                                    <CloseOutlined
                                        onClick={() => {
                                            remove(field.name);
                                        }}
                                    />
                                }
                            >
                                <div className="flex justify-center">
                                    <Form.Item label="Notes" name='notes' className='w-8/12'>
                                        <TextArea rows={10} />
                                    </Form.Item>
                                    <input
                                        label="Attach File"
                                        type="file"
                                        title='Upload File'
                                        onChange={fileUplaod}
                                        style={{ marginLeft: "25%" }}
                                    />
                                </div>
                            </Card>
                        ))}

                    </div>
                )}
            </Form.List>
            <Divider/>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                className='float-right'
            >
                <Button type="primary" htmlType="submit">
                Save Changes
                </Button>
            </Form.Item>
        </Form>
    );
};
export default Step2;