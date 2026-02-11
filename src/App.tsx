import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CompensarPage from "./pages/CompensarPage";
import CematcolPage from "./pages/CematcolPage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import FarmatizatePage from "./pages/FarmatizatePage";
import HomecenterPage from "./pages/HomecenterPage";
import SupernordicoPage from "./pages/SupernordicoPage";
import FacturatechPage from "./pages/FacturatechPage";
import BemovilPage from "./pages/BemovilPage";
import AutomundialPage from "./pages/AutomundialPage";
import SolicitudAutomundialPage from "./pages/SolicitudAutomundialPage";
import ContactPage from "./pages/ContactPage";
import RatesPage from "./pages/RatesPage";
import PaymentPage from "./pages/PaymentPage";
import TermsPage from "./pages/TermsPage";
import DataProtectionPage from "./pages/DataProtectionPage";
import HistoricalRatesPage from "./pages/HistoricalRatesPage";
import BlogPage from "./pages/BlogPage";
import FAQPage from "./pages/FAQPage";
import SimuladorPage from "./pages/SimuladorPage";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <WhatsAppButton />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/aliado/compensar" element={<CompensarPage />} />
          <Route path="/aliado/cematcol" element={<CematcolPage />} />
          <Route path="/aliado/farmatizate" element={<FarmatizatePage />} />
          <Route path="/aliado/homecenter" element={<HomecenterPage />} />
          <Route path="/aliado/supernordico" element={<SupernordicoPage />} />
          <Route path="/aliado/facturatech" element={<FacturatechPage />} />
          <Route path="/aliado/bemovil" element={<BemovilPage />} />
          <Route path="/aliado/automundial" element={<AutomundialPage />} />
          <Route path="/solicitud-automundial" element={<SolicitudAutomundialPage />} />
          <Route path="/quienes-somos" element={<AboutPage />} />
          <Route path="/ayuda" element={<ContactPage />} />
          <Route path="/tasas-precios-comisiones" element={<RatesPage />} />
          <Route path="/como-pagar" element={<PaymentPage />} />
          <Route path="/terminos-y-condiciones" element={<TermsPage />} />
          <Route path="/proteccion-de-datos" element={<DataProtectionPage />} />
          <Route path="/historico-de-tasas" element={<HistoricalRatesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/preguntas-frecuentes" element={<FAQPage />} />
          <Route path="/simulador" element={<SimuladorPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
