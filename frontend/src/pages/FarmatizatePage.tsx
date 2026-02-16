import AllyPageTemplate from "@/components/landing/AllyPageTemplate";
import heroImg from "@/assets/hero-farmatizate-new.png";

const FarmatizatePage = () => (
  <AllyPageTemplate
    allyName="Farmatízate"
    tagline="¡Impulsa el crecimiento de tu Droguería!"
    description="Olvídate del papeleo y las filas. Accede a financiación 100% digital diseñada exclusivamente para propietarios y empleados del sector farmacéutico."
    heroImage={heroImg}
    heroImageAlt="Farmacéutico atendiendo su droguería con una sonrisa"
    note="*Exclusivo para afiliados a Farmatízate en zonas de cobertura."
    solicitudLink="https://incursor.entreamigos.co/nuevo-credito/MC/introduccion/FMA?promoterCode=FMA001"
    whatsappLink="https://app.entreamigos.co/3Cxy3ZR"
    products={[
      {
        title: "Microcrédito (Negocio)",
        description: "¡No pierdas ventas por falta de inventario! Surté tu farmacia, remodela o expande tu negocio hoy mismo.",
        amount: "Hasta $2.000.000 para invertir ya",
        link: "https://incursor.entreamigos.co/nuevo-credito/MC/introduccion/FMA?promoterCode=FMA001",
      },
      {
        title: "Impulsacrédito (Personal)",
        description: "¿Trabajas en una farmacia? Cumple tus metas personales (estudio, viajes, hogar) con un crédito ágil.",
        amount: "Hasta $2.000.000 de libre inversión",
        link: "https://incursor.entreamigos.co/nuevo-credito/MC/introduccion/FMA?promoterCode=FMA001",
      },
    ]}
    features={[
      "Aprobación en minutos.",
      "Sin codeudor ni garantías reales.",
      "Trámite 100% desde tu celular.",
      "Desembolso directo a tu cuenta.",
      "Plazos cómodos hasta 36 meses.",
      "Estudio de crédito gratuito.",
      "Mejora tu historial crediticio.",
      "Soporte personalizado por WhatsApp.",
    ]}
    steps={[
      "Ingresa al formulario y compártenos tus datos básicos.",
      "Recibe tu oferta ideal (monto y plazo) al instante.",
      "Confirma tu identidad con un video selfie seguro.",
      "Firma tu pagaré digitalmente (sin imprimir nada).",
      "¡Listo! Recibe el dinero en tu cuenta bancaria.",
    ]}
    faqs={[
      { q: "¿Cómo puedo pagar el crédito?", a: "Puedes realizar tus pagos por internet, en sucursales del Banco Caja Social con el código de convenio 15900833, o por medio de Efecty con el código de convenio 113023." },
      { q: "¿Puedo tener otro crédito al mismo tiempo?", a: "Sí, dependiendo de tu capacidad de endeudamiento." },
    ]}
  />
);

export default FarmatizatePage;
