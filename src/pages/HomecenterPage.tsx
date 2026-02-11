import AllyPageTemplate from "@/components/landing/AllyPageTemplate";
import heroImg from "@/assets/hero-homecenter.png";

const HomecenterPage = () => (
  <AllyPageTemplate
    allyName="Homecenter"
    tagline="Construye o remodela tu casa o negocio"
    description="Compra los materiales necesarios para tu proyecto en las 42 tiendas de Homecenter. Sodimac Corona."
    heroImage={heroImg}
    heroImageAlt="Trabajador en tienda Homecenter"
    solicitudLink="https://incursor.entreamigos.co/solicita-tu-credito?promoterCode=HC001"
    whatsappLink="https://app.entreamigos.co/3Cxy3ZR"
    products={[
      {
        title: "Microcrédito",
        description: "Ideal para microempresarios, independientes o negociantes.",
        amount: "Desde $300.000 hasta $10.000.000 — Plazos hasta 36 meses",
        link: "https://incursor.entreamigos.co/solicita-tu-credito?promoterCode=HC001&utm_product_type=microcredito",
      },
      {
        title: "Productivo Plus",
        description: "Crédito para personas naturales que quieran crecer su negocio.",
        amount: "Desde $2.000.000 hasta $15.000.000 — Plazos hasta 36 meses",
        link: "https://incursor.entreamigos.co/solicita-tu-credito?promoterCode=HC001&utm_product_type=creditocomercial",
      },
      {
        title: "Crédito Rotativo",
        description: "Crédito para personas registradas en el Círculo de Especialistas. ¡Sin intereses!",
        amount: "Desde $1.000.000 hasta $8.000.000 — Plazos de 1 a 2 meses",
        link: "https://incursor.entreamigos.co/solicita-tu-credito?promoterCode=HC001&utm_product_type=creditorotativo",
      },
    ]}
    features={[
      "Diseñado para microempresarios o independientes.",
      "Desde $300.000 hasta $15.000.000 según producto y perfil.",
      "Plazo de 1 a 36 meses según tu perfil.",
      "Edad: entre 23 y 63 años.",
      "Solicitud 100% digital en minutos.",
      "Sin cobro por consulta ni estudio de crédito.",
      "Montos y plazos flexibles.",
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
      { q: "¿Dónde me desembolsan el dinero del crédito?", a: "El dinero se desembolsa directamente en Homecenter para que puedas comprar los materiales que necesites." },
      { q: "¿Cómo puedo pagar el crédito?", a: "Puedes realizar tus pagos por internet, en sucursales del Banco Caja Social con el código de convenio 15900833, o por medio de Efecty con el código de convenio 113023." },
      { q: "¿Puedo tener otro crédito al mismo tiempo?", a: "Sí, dependiendo de tu capacidad de endeudamiento." },
    ]}
  />
);

export default HomecenterPage;
