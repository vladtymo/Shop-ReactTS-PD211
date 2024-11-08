export interface ProductModel {
    id: number;
    title: string;
    quantity: number;
    price: number;
    discount: number;
    imageUrl: string;
    description?: string;
    categoryName?: string;
}