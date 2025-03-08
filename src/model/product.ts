export interface ProductForm{
    name: string;
    variety: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: File | null;
    previewUrl: string,
}

export interface ProductDto{

    productId: number;
    name: string;
    variety: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
    category: string | null;


}
