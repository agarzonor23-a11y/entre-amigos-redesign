import AllyPageTemplate from "@/components/landing/AllyPageTemplate";
import heroImg from "@/assets/hero-farmatizate-new.png";

const FarmatizatePage = () => (
  <AllyPageTemplate
    allyName="Farmatízate"
    tagline="¡Te damos la bienvenida a Entre Amigos!"
    description="Somos una financiera digital de la Fundación Grupo Social que busca brindar créditos fáciles y desde la comodidad de tu negocio. Club del Droguista."
    heroImage={heroImg}
    heroImageAlt="Farmacéutico en su droguería"
    note="*Cada crédito tiene condiciones y beneficios diferentes según tu perfil de riesgo."
    solicitudLink="https://incursor.entreamigos.co/nuevo-credito/MC/introduccion/FMA?promoterCode=FMA001"
    whatsappLink="https://app.entreamigos.co/3Cxy3ZR"
    products={[
      {
        title: "Microcrédito",
        description: "Para personas naturales (cédula) que sean independientes y quieran un crédito para su negocio.",
        amount: "Montos de hasta $2.000.000",
        link: "https://incursor.entreamigos.co/nuevo-credito/MC/introduccion/FMA?promoterCode=FMA001",
      },
      {
        title: "Impulsacrédito",
        description: "Para personas naturales (cédula) que sean empleados que quieran un crédito para sus proyectos propios.",
        amount: "Montos de hasta $2.000.000",
        link: "https://incursor.entreamigos.co/nuevo-credito/MC/introduccion/FMA?promoterCode=FMA001",
      },
    ]}
    features={[
      "Diseñado para microempresarios o independientes.",
      "Montos de hasta $2.000.000 de pesos colombianos.",
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

export default FarmatizatePage;
