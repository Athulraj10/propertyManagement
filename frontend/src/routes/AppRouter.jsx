import { Route, Routes } from "react-router-dom";
import { Paths } from "./path";
import { HomePage } from "../pages/Home";
import Register from "../components/newUser/Register";
import Login from "../components/Login/Login";
import { Layout } from "../pages/Layout";
import AdminLogin from "../components/Admin/login/AdminLogin";
import PropertyList from "../components/Admin/Dashboard/PropertyList/PropertyList";
import LeadList from "../components/Admin/Dashboard/LeadPages/LeadList/LeadLIst";
import Index from "../components/Admin/Dashboard/Index";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={Paths.home} element={<HomePage />} />
        <Route path={Paths.register} element={<Register />} />
        <Route path={Paths.login} element={<Login />} />

        <Route path={Paths.adminLogin} element={<AdminLogin />} />
        <Route path={Paths.adminDashboard} element={<Index />} />
        <Route path={Paths.propertiesAdmin} element={<PropertyList />} />
        <Route path={Paths.leads} element={<LeadList />} />
      </Route>
    </Routes>
  );
};
