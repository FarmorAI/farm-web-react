import {RouteObject} from "react-router-dom";
import {lazy, Suspense} from "react";


// Lazy Loding
const ProductPage = lazy(() => import("../pages/product/ProductListPage"));

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
];