import AllyPageTemplate from "@/components/landing/AllyPageTemplate";
import heroImg from "@/assets/hero-bemovil.png";

const BemovilPage = () => (
  <AllyPageTemplate
    allyName="Bemovil"
    tagline="Crédito a tu medida para tu negocio de recargas"
    description="Plataforma de pagos. Crédito para pago de recargas, corresponsales, servicios públicos, SOAT y mucho más."
    heroImage={heroImg}
    heroImageAlt="Comerciante en punto de recargas"
    solicitudLink="https://bemovil.net/"
    whatsappLink="https://www.entreamigos.co/contacto-bemovil"
    requirements={[
      "Correo electrónico personal, con mínimo 4 meses de existencia.",
      "Tu documento de identidad original.",
      "Celular (Smartphone) con línea activa y WhatsApp personal.",
      "Registro y cuenta activa con Bemovil.",
    ]}
    products={[]}
    features={[
      "Diseñado para microempresarios o independientes.",
      "Desde $1 hasta $2.500.000 de pesos colombianos.",
      "Compras mínimas de $500.000, diferidos semanal o diariamente.",
      "Edad: entre 22 y 65 años.",
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
      { q: "¿Dónde me desembolsan el dinero?", a: "Tu crédito se desembolsa directamente en tu cuenta de Bemovil para que puedas realizar recargas y pagos." },
      { q: "¿Cómo puedo pagar el crédito?", a: "Puedes realizar tus pagos por internet, en sucursales del Banco Caja Social con el código de convenio 15900833, o por medio de Efecty con el código de convenio 113023." },
      { q: "¿Puedo tener otro crédito al mismo tiempo?", a: "Sí, dependiendo de tu capacidad de endeudamiento." },
    ]}
  />
);

export default BemovilPage;
