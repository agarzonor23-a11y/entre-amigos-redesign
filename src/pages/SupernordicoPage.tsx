import AllyPageTemplate from "@/components/landing/AllyPageTemplate";
import heroImg from "@/assets/hero-supernordico.png";

const SupernordicoPage = () => (
  <AllyPageTemplate
    allyName="Supernórdico"
    tagline="Equipa tu negocio con la calidad Supernórdico"
    description="Solicita tu crédito y adquiere equipos de refrigeración diseñados para durar. Supermercados y equipos comerciales."
    heroImage={heroImg}
    heroImageAlt="Comerciante junto a refrigerador comercial"
    solicitudLink="https://www.entreamigos.co/solicitud-supernordico"
    whatsappLink="https://app.entreamigos.co/3Cxy3ZR"
    products={[]}
    features={[
      "Diseñado para microempresarios o independientes.",
      "Desde $1.000.000 de pesos colombianos.",
      "Plazo de 1 a 36 meses según tu perfil.",
      "Edad: entre 23 y 63 años.",
      "Solicitud 100% digital en minutos.",
      "Montos y plazos flexibles.",
      "Sin cobro por consulta ni estudio de crédito.",
      "Acceso a certificados y extractos fácilmente.",
    ]}
    steps={[
      "Solicita tu crédito y diligencia tu información financiera.",
      "Personaliza la oferta según el plazo y monto que necesites.",
      "Valida quién eres con un video y tu cédula.",
      "Firma digitalmente, fácil, rápido y 100% en línea.",
      "Responde una llamada para validar tu información.",
    ]}
    faqs={[
      { q: "¿Cómo puedo pagar el crédito?", a: "Puedes realizar tus pagos por internet, en sucursales del Banco Caja Social con el código de convenio 15900833, o por medio de Efecty con el código de convenio 113023." },
      { q: "¿Puedo tener otro crédito al mismo tiempo?", a: "Sí, dependiendo de tu capacidad de endeudamiento." },
    ]}
  />
);

export default SupernordicoPage;
