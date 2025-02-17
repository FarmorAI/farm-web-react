import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

// Lazy Loding
const PaymentPage = lazy(() => import("../pages/payment/PaymentPage"));

// Routes export
export const paymentRoutes: RouteObject[] = [
   {
      path: "payment",
      element: (
         <Suspense fallback={<div>Loading...</div>}>
            <PaymentPage />
         </Suspense>
      )
   }
];