export interface ProductModel {
    id: number;
    title: string;
    quantity: number;
    price: number;
    discount: number;
    imageUrl: string;
    description?: string;
    categoryId: number;
    categoryName?: string;
}

export type ProductFormField = {
    id: number;
    title: string;
    quantity: number;
    price: number;
    discount: number;
    // imageUrl: string;
    image?: File;
    description?: string;
    categoryId: number;
};

export interface CategoryModel {
    id: number;
    name: string;
}

export interface CategoryOption {
    value: number;
    label: string;
}

