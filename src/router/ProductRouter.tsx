import {RouteObject} from "react-router-dom";
import {lazy, Suspense} from "react";


// Lazy Loding
const ProductPage = lazy(() => import("../pages/product/ProductListPage"));
const ProductRegisterPage = lazy(() => import("../pages/product/ProductRegisterPage"));

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
];