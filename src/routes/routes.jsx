import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import ShoppingList from "../pages/ShoppingList"
import AddPlate from "../pages/AddPlate";


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
      {
        path: "/addPlate",
        element: <AddPlate />
      },
    ],
  },
]);

export default router;
