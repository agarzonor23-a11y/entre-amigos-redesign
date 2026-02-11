import AllyPageTemplate from "@/components/landing/AllyPageTemplate";
import heroImg from "@/assets/hero-automundial.png";

const AutomundialPage = () => (
  <AllyPageTemplate
    allyName="AutoMundial"
    tagline="Crédito rotativo para productos de tu vehículo"
    description="Somos más que llantas. Crédito rotativo para la adquisición de productos automotrices para tu vehículo o negocio."
    heroImage={heroImg}
    heroImageAlt="Propietario de taller automotriz"
    solicitudLink="/solicitud-automundial"
    whatsappLink="https://www.entreamigos.co/contacto-automundial"
    products={[]}
    features={[
      "Diseñado para microempresarios o independientes.",
      "Desde $1 hasta $20 millones para persona natural. Hasta $35 millones para persona jurídica.",
      "Compras mínimas de $300.000 diferidas a 3, 6, 9 o 12 meses.",
      "Edad: entre 23 y 63 años.",
      "Solicitud 100% digital en minutos.",
      "Montos y plazos flexibles.",
      "Sin cobro por consulta ni estudio de crédito.",
      "Acceso a certificados y extractos fácilmente.",
    ]}
    steps={[
      "Requiere el acompañamiento de un asesor.",
      "Solicita tu crédito y diligencia tu información financiera.",
      "Personaliza la oferta según el plazo y monto que necesites.",
      "Valida quién eres con un video y tu cédula.",
      "Firma digitalmente, fácil, rápido y 100% en línea.",
      "Responde una llamada para validar tu información.",
    ]}
    faqs={[
      { q: "¿Dónde me desembolsan el dinero?", a: "Tu crédito se desembolsa directamente en AutoMundial para que puedas adquirir los productos que necesites." },
      { q: "¿Cómo puedo pagar el crédito?", a: "Puedes realizar tus pagos por internet, en sucursales del Banco Caja Social con el código de convenio 15900833, o por medio de Efecty con el código de convenio 113023." },
      { q: "¿Puedo tener otro crédito al mismo tiempo?", a: "Sí, dependiendo de tu capacidad de endeudamiento." },
    ]}
  />
);

export default AutomundialPage;
