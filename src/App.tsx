
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import AccessControl from "./pages/AccessControl";
import Permissions from "./pages/Permissions";
import Authentication from "./pages/Authentication";
import AuditLogs from "./pages/AuditLogs";
import Reports from "./pages/Reports";
import Monitoring from "./pages/Monitoring";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/users" element={<Layout><Users /></Layout>} />
          <Route path="/roles" element={<Layout><Roles /></Layout>} />
          <Route path="/access-control" element={<Layout><AccessControl /></Layout>} />
          <Route path="/permissions" element={<Layout><Permissions /></Layout>} />
          <Route path="/authentication" element={<Layout><Authentication /></Layout>} />
          <Route path="/audit-logs" element={<Layout><AuditLogs /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/monitoring" element={<Layout><Monitoring /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
