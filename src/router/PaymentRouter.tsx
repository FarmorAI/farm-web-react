import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

// Lazy Loding
const PaymentPage = lazy(() => import("../pages/payment/PaymentPage"));
const PaymentResultPage = lazy(() => import("../pages/payment/PaymentResultPage"));
const CartResultPage = lazy(() => import("../pages/payment/CartResultPage.tsx"));

// Routes export
export const paymentRoutes: RouteObject[] = [
   {
      path: "payment",
      element: (
         <Suspense fallback={<div>Loading...</div>}>
            <PaymentPage />
         </Suspense>
      )
   },
   {
      path: "payment/result",
      element: (
         <Suspense fallback={<div>Loading...</div>}>
            <PaymentResultPage />
         </Suspense>
      )
   },
   {
      path: "cart/payment/result",
      element: (
         <Suspense fallback={<div>Loading...</div>}>
            <CartResultPage/>
         </Suspense>
      )
   }

];