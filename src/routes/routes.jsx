import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import ShoppingList from "../pages/ShoppingList"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shoppinglist",
        element: <ShoppingList />,
      },
    ],
  },
]);

export default router;
