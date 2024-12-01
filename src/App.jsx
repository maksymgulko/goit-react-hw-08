import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";
import { refreshUser } from "./redux/auth/operations";
import { AppBar } from "./components/AppBar/AppBar";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
  const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));
  const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
  const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing...</b>
  ) : (
    <div className="appForm">
      <AppBar />
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/tasks"
                component={<RegisterPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/tasks" component={<LoginPage />} />
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
