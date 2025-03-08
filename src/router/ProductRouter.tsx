import {RouteObject} from "react-router-dom";
import {lazy, Suspense} from "react";


// Lazy Loding
const ProductPage = lazy(() => import("../pages/product/ProductListPage"));
const ProductRegisterPage = lazy(() => import("../pages/product/ProductRegisterPage"));
const ProductDetailPage = lazy(() => import("../pages/product/ProductDetailPage"));
const ProductCartPage = lazy(() => import("../pages/product/ProductCartPage"));

// Routes export
export const productRouter: RouteObject[] = [
    {
        path: "product/list",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <ProductPage/>
            </Suspense>
        )
    },
    {
        path: "product/register",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <ProductRegisterPage/>
            </Suspense>
        )
    },
    {
        path: "product/:productId",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <ProductDetailPage/>
            </Suspense>
        )
    },
    {
        path: "product/cart",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <ProductCartPage/>
            </Suspense>
        )
    },
];