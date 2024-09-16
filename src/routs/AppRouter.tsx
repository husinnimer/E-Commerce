import ErrorPage from "@pages/ErrorPage";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LottieHandler } from "@components/feedback/lottieHandler/LottieHandler";
import ProtectedRoute from "@components/Auth/ProtectedRoute";

const MainLayout = lazy(() => import("@layouts/MainLayout/MianLayout"));
const ProfileLayout = lazy(
  () => import("@layouts/ProfileLayout/PriofileLayout")
);
const Home = lazy(() => import("@pages/Home"));
const Categories = lazy(() => import("@pages/Categories"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Products = lazy(() => import("@pages/Product"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Profile = lazy(() => import("@pages/Profile"));
const Oreder = lazy(() => import("@pages/Orders"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <LottieHandler type="loading" message="Loading Please Wait..." />
        }
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={
              <LottieHandler type="loading" message="Loading Please Wait..." />
            }
          >
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="loading" message="Loading Please Wait..." />
            }
          >
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <Suspense
              fallback={
                <LottieHandler
                  type="loading"
                  message="Loading Please Wait..."
                />
              }
            >
              <Wishlist />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="loading" message="Loading Please Wait..." />
            }
          >
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "categories/product/:prefix",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="loading" message="Loading Please Wait..." />
            }
          >
            <Products />
          </Suspense>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },

      {
        path: "login",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="loading" message="Loading Please Wait..." />
            }
          >
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense
            fallback={
              <LottieHandler type="loading" message="Loading Please Wait..." />
            }
          >
            <Register />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Suspense
              fallback={
                <LottieHandler
                  type="loading"
                  message="Loading Please Wait..."
                />
              }
            >
              <ProfileLayout />
            </Suspense>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense
                fallback={
                  <LottieHandler
                    type="loading"
                    message="Loading Please Wait..."
                  />
                }
              >
                <Profile />
              </Suspense>
            ),
          },
          {
            path: "orders",
            element: (
              <Suspense
                fallback={
                  <LottieHandler
                    type="loading"
                    message="Loading Please Wait..."
                  />
                }
              >
                <Oreder />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
