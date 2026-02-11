import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Breadcrumbs from "@/components/landing/Breadcrumbs";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-br from-teal-light via-background to-pink-light">
        <div className="container mx-auto px-6 text-center">
          <Breadcrumbs items={[{ label: "Términos y Condiciones" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-semibold text-primary mb-6">
              📄 Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              Términos y <span className="text-gradient">Condiciones</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none text-muted-foreground leading-relaxed
            prose-headings:text-foreground prose-strong:text-foreground
            prose-h2:text-2xl prose-h2:font-extrabold prose-h2:mt-12 prose-h2:mb-4
            prose-p:mb-4"
        >
          <h2>1. Introducción</h2>
          <p>A continuación, encuentra los términos y condiciones y de uso (los "Términos y Condiciones") del sitio web www.entreamigos.co y sus aplicaciones móvil como cualquier aplicativo (conjuntamente el "Sitio") proveído por ENTRE AMIGOS O ENTRE AMIGOS S.A.S. (la "Compañía") directamente o a través de terceros. Los Términos y Condiciones, conjuntamente con la Política de Protección de Datos Personales de la Compañía, forman un contrato entre la Compañía y el Cliente que establece las condiciones de uso a través de las cuales el Cliente puede acceder a los contenidos y servicios de la Compañía y/o del Sitio.</p>

          <h2>2. Aceptación de los Términos y Condiciones</h2>
          <p>Al acceder, usar o navegar en el Sitio, en forma ocasional o frecuente o de cualquier manera, y/o utilizar alguno de los servicios prestados por la Compañía y/o al registrarse en el Sitio, usted como Cliente está aceptando y por lo mismo se obliga a cumplir con los Términos y Condiciones.</p>
          <p>Al realizar cualquier acceso, acción, navegación o uso del Sitio, usted como Cliente está garantizando expresamente que: <strong>1.</strong> Acepta y se obliga por los presentes Términos y Condiciones. <strong>2.</strong> Que tiene todas las capacidades para aceptar y obligarse por los Términos y Condiciones.</p>

          <h2>3. Descripción del Sitio</h2>
          <p>A través del Sitio se prestan los servicios de otorgamiento de crédito a los Clientes (contrato de mutuo) y/o los actos relacionados y complementarios del mismo, por la Compañía. La modalidad de los créditos que otorga la Compañía son microcréditos, crédito de consumo y ordinario y créditos de consumo de bajo monto.</p>
          <p>La Compañía es una sociedad comercial y privada, y no es una entidad financiera ni es una de las entidades previstas en el estatuto orgánico del sistema financiero. La Compañía no proporciona ningún tipo de servicio de asesoría financiera.</p>

          <h2>4. Uso del Sitio y de los Servicios</h2>
          <p>A través del Sitio, la Compañía podrá acceder a las siguientes funcionalidades del dispositivo del Cliente: navegador web del dispositivo móvil para realizar la solicitud de productos, teléfono para el envío de SMS con OTP para validación del número celular, cámara para la validación del documento de identificación y autenticación biométrica.</p>
          <p>La cuenta de un Cliente en el Sitio es personal, única e intransferible.</p>

          <h2>5. Condiciones Generales</h2>
          <p>Cualquier acto que adelanten la Compañía y el Cliente de forma electrónica y/o no presencial goza de plena validez a la luz del artículo 5 de la Ley 527 de 1999 y demás normas jurídicas.</p>

          <div className="bg-teal-light/50 rounded-2xl p-6 my-8 space-y-3">
            <p><strong>3.</strong> El uso, navegación y acceso del Sitio sólo está disponible para personas mayores de dieciocho (18) años, que tengan capacidad legal para contratar, que residan en territorio colombiano, que sean titulares de una cuenta bancaria, un correo electrónico personal y un número de celular personal.</p>
            <p><strong>5.</strong> El Cliente que decida solicitar un crédito, deberá registrarse en el Sitio.</p>
            <p><strong>6.</strong> Al registrarse se obliga a entregar información veraz, correcta y actualizada.</p>
            <p><strong>7.</strong> Al registrarse, acepta la responsabilidad de mantener control de la seguridad de cualquier información, IDs, contraseñas o cualquier código que utilice para acceder al Sitio.</p>
          </div>

          <h2>6. Registro y Cuenta</h2>
          <p><strong>10.</strong> La cuenta es personal, única e intransferible. Está prohibido que un mismo Cliente tenga más de una cuenta a nombre propio.</p>
          <p><strong>14.</strong> El Cliente acepta que no usará su cuenta ni el Sitio para realizar actividades ilegales o criminales de ningún tipo.</p>
          <p><strong>16.</strong> La Compañía se reserva el derecho de rechazar cualquier solicitud de registro o de cancelar una cuenta previamente aceptada.</p>

          <h2>7. Solicitud, Aprobación y Aceptación del Crédito</h2>
          <p><strong>37.</strong> El Cliente podrá solicitar a la Compañía un microcrédito, un crédito de consumo o un crédito de consumo de bajo monto.</p>
          <p><strong>38.</strong> La Compañía se reserva el derecho exclusivo de decidir a qué Clientes otorgar créditos.</p>
          <p><strong>40.</strong> Los créditos se otorgarán a un plazo máximo de 36 meses.</p>
          <p><strong>45.</strong> La Compañía dará respuesta en un plazo máximo de 15 días calendario.</p>

          <h2>8. Condiciones del Crédito</h2>
          <p><strong>49.</strong> En caso de aceptación, la Compañía comunicará: el monto del préstamo, la tasa de interés efectiva anual, el plazo acordado, el monto y fecha de pago, el sistema de amortización, la cantidad y periodicidad de pagos, y los gastos adicionales.</p>
          <p><strong>50.</strong> El desembolso se hará única y exclusivamente a una cuenta de ahorros o corriente definida por el Cliente.</p>
          <p><strong>59.</strong> El Cliente podrá retractarse dentro de los cinco (5) días contados a partir de la firma del contrato.</p>
          <p><strong>64.</strong> El Cliente podrá prepagar total o parcialmente sin sanciones económicas ni cláusulas penales.</p>

          <h2>9. Mora e Intereses</h2>
          <p><strong>66.</strong> El Cliente incurrirá en mora de pleno derecho y en forma automática si el capital y/o los intereses no son pagados en la fecha de vencimiento.</p>
          <p><strong>67.</strong> La Compañía podrá declarar vencida y exigir el pago anticipado de cualquier suma derivada del crédito.</p>

          <h2>10. Propiedad Intelectual</h2>
          <p><strong>87.</strong> Todo el material en el Sitio es de propiedad de la Compañía y está protegido por derechos de autor y otras leyes internacionales aplicables.</p>

          <h2>11. Modificaciones</h2>
          <p><strong>91.</strong> La Compañía se reserva el derecho a modificar estos Términos y Condiciones en cualquier momento. Si los Clientes continúan usando el Sitio, significará que aceptan dichos cambios.</p>

          <h2>12. Contacto</h2>
          <p><strong>92.</strong> Si tiene alguna duda, reclamo, comentario o sugerencia respecto a estos Términos y Condiciones, contáctenos a <a href="mailto:comunicaciones@entreamigos.co" className="text-primary hover:underline">comunicaciones@entreamigos.co</a>.</p>
          <p><strong>93.</strong> Estos Términos y Condiciones estarán regidos por las leyes vigentes en la República de Colombia. Actualizados el <strong>veinte (20) de enero de 2023</strong>.</p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPage;
