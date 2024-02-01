import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Form, Input, Select, Space, Typography, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const Step4 = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([])
    const [file, setFile] = useState();
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const [item, setItem] = useState()
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem('data');
            const items = data ? JSON.parse(data) : null
            if (items !== null) {
                setItem(items)
            } else {
                setItem()
            }
        } 
    }, [])
    const tost = (type, data) => {
        messageApi?.open({
            type: type,
            content: data,
        });
    };

    let rawInstanceConfig = {
        baseURL: "https://51.20.20.105",
        timeout: 60000,
        headers: {
            "Authorization": `Bearer ${item?.access}`,
            'Content-Type': 'multipart/form-data',
            // 'WebpSupport': (webp_support() ? 'yes' : 'no'),
        }
    };
    const rawInstance = axios.create(rawInstanceConfig);

    const postSite = (body) => {
        return rawInstance.post('https://51.20.20.105/api/v1/site_notes/', body, { withCredentials: true });

    }

 
    const PostData = async (e) => {
        let form = new FormData();
            var ext = file.name.substr(file.name.lastIndexOf('.') + 1);
            if (ext == 'amr' || ext == 'AMR') {
                form.append('Content-Type', 'audio/AMR');
            } else {
                form.append('Content-Type', file.type);
            }
            form.append('name', 'file');
            form.append('filename', file.name);
            form.append('file', file);
            console.log(form)
            const blob = new Blob([file]);
            console.log(blob)
        // e.preventDefault();
        const requestData = {
            "notes": data.note,
            "site_id": props.siteId,
            "notes_attachment": blob,
            "step": 4
        }

        await postSite(requestData).then(async (response) => {
            props.setSiteId(response.data.id)
            tost('success', "Site Details SucessFully Added")

        }).catch(error => {
            tost('error', '')
        }).finally((error) => {
        });
    };

    useEffect(() => {
        if (data?.note !== undefined && data?.note !== null) {
            PostData()
        }
    }, [data])

    const onFinish = (values) => {
        console.log(values , file)
        setData({ ...data, note: values?.notes });
    };
    console.log(data?.file)
    const fileUplaod = (event) => {
        console.log(event.target.files[0])
        setFile(event.target.files[0])
        console.log(file)
    }
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
            {contextHolder}
            <Form.Item label="Notes" name='notes' className='w-full'>
                <TextArea rows={10} />
            </Form.Item>
            <input
                label="Attach File"
                type="file"
                onChange={fileUplaod}
                style={{marginLeft : "25%"}}
            />
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
export default Step4;