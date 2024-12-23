import { Button, Form, FormProps, Input, InputNumber, message, Select, Space, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CategoryModel, CategoryOption, ProductFormField } from '../models/products';
import { LeftOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const api = import.meta.env.VITE_PRODUCTS_URL;

const normFile = (e: any) => {
    return e?.file.originFileObj;
};

export default function CreateProduct() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState<CategoryOption[]>([]);

    useEffect(() => {
        fetch(api + "categories")
            .then(res => res.json())
            .then(data => {
                const items = data as CategoryModel[];
                setCategories(items.map(x => {
                    return { label: x.name, value: x.id };
                }));
            })
    }, []);

    const onSubmit: FormProps<ProductFormField>['onFinish'] = (item) => {

        console.log(item);

        const form = new FormData();

        for (const key in item) {
            form.append(key, (item as any)[key]);
        }

        axios.post(api, form).then(res => {
            if (res.status === 200) {
                message.success("Product created successfuly!");
                navigate("/products");
            }
        }).catch(err => {
            message.error("Something went wrong!");
            console.log(err);
        });
    }

    return (
        <div>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}></Button>

            <h2>Create New Product</h2>

            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 19,
                }}
                layout="horizontal"
                onFinish={onSubmit}
            >
                <Form.Item<ProductFormField> label="Title" name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item<ProductFormField> label="Price" name="price">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<ProductFormField> label="Discount" name="discount">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<ProductFormField> label="Quantity" name="quantity">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<ProductFormField> label="Category" name="categoryId">
                    <Select options={categories}></Select>
                </Form.Item>
                <Form.Item<ProductFormField> label="Description" name="description">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item<ProductFormField> label="Image" name="image" valuePropName="file" getValueFromEvent={normFile}>
                    <Upload maxCount={1}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
                {/* <Form.Item<ProductFormField> label="Image" name="imageUrl">
                    <Input />
                </Form.Item> */}
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Space>
                        <Button type="default" htmlType="reset">
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}
