import AllyPageTemplate from "@/components/landing/AllyPageTemplate";
import heroImg from "@/assets/hero-facturatech-new.png";

const FacturatechPage = () => (
  <AllyPageTemplate
    allyName="Facturatech"
    tagline="Crédito digital fácil y rápido para tu negocio"
    description="Facturación electrónica. Tenemos opciones de crédito para personas naturales y jurídicas. Solo disponible en ciudades con cobertura de nuestros promotores."
    heroImage={heroImg}
    heroImageAlt="Empresario trabajando en facturación electrónica"
    note="*No disponible a nivel nacional, solo en ciudades con cobertura de promotores."
    solicitudLink="https://incursor.entreamigos.co/nuevo-credito/MC/introduccion/FTEC?promoterCode=FTEC001"
    whatsappLink="https://app.entreamigos.co/3Cxy3ZR"
    products={[
      {
        title: "Microcrédito",
        description: "Para personas naturales (cédula) que quieren hacer crecer su negocio con un crédito digital, fácil y rápido.",
        amount: "Montos de hasta $15.000.000",
        link: "https://incursor.entreamigos.co/nuevo-credito/MC/introduccion/FTEC?promoterCode=FTEC001",
      },
      {
        title: "Productivo Plus",
        description: "Para personas jurídicas (SAS, Ltda., etc.) que buscan un crédito empresarial con montos más altos.",
        amount: "Montos de hasta $35.000.000",
        link: "https://www.entreamigos.co/creditopersonajuridica",
      },
    ]}
    features={[
      "Para personas naturales y jurídicas.",
      "Montos de hasta $35.000.000.",
      "Plazo de 2 a 36 meses según tu perfil.",
      "Solicitud 100% digital en minutos.",
      "Sin cobro por consulta ni estudio de crédito.",
      "Montos y plazos flexibles.",
      "Acceso a certificados y extractos fácilmente.",
      "Solo para ciudadanos colombianos.",
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

export default FacturatechPage;
