import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Breadcrumbs from "@/components/landing/Breadcrumbs";

const sections = [
  {
    title: "1. Introducción",
    content: `A continuación, encuentra los términos y condiciones y de uso (los "Términos y Condiciones") del sitio web www.entreamigos.co y sus aplicaciones móvil como cualquier aplicativo (conjuntamente el "Sitio") proveído por ENTRE AMIGOS O ENTRE AMIGOS S.A.S. (la "Compañía") directamente o a través de terceros. Los Términos y Condiciones, conjuntamente con la Política de Protección de Datos Personales de la Compañía (la "Política de Protección de Datos Personales"), forman un contrato entre la Compañía y el Cliente (el "Cliente") que establece las condiciones de uso a través de las cuales el Cliente puede acceder a los contenidos y servicios de la Compañía y/o del Sitio como la utilización de cualquiera de los productos o servicios disponibles o accesibles a través del Sitio.

En los presentes Términos y Condiciones, cuando nos referimos a la Compañía, se incluye por referencia a sus accionistas, administradores, inversionistas, empleados o cualquier persona natural o jurídica que represente a la misma. Dependiendo del contexto, la Compañía puede también hacer referencia a los servicios, productos, sitio web, aplicaciones móviles, contenido o cualquier material que la Compañía provea en el Sitio o fuera del mismo.

En los presentes Términos y Condiciones, cuando nos referimos a Cliente, se incluye, pero sin limitarse, a cualquier persona que tenga una relación contractual o comercial con la Compañía siendo cliente de esta, como cualquier persona que no sea cliente ni tenga un contrato, un producto y/o servicio de la Compañía, pero acceda, use, solicite el Sitio y/o cualquier servicio de la Compañía. Todo uso del Sitio, que incluye, pero sin limitarse a, cualquier servicio del mismo y/o de la Compañía, está sujeto a los Términos y Condiciones como a las condiciones complementarias y subsidiarias determinadas por la Compañía, e informadas a los Clientes a través del Sitio, debiendo también respetarse todas las demás leyes o reglamentaciones nacionales o internacionales aplicables y la Política de Privacidad.`,
  },
  {
    title: "2. Aceptación de los Términos y Condiciones",
    content: `Al acceder, usar o navegar en el Sitio, en forma ocasional o frecuente o de cualquier manera, y/o utilizar alguno de los servicios prestados por la Compañía y/o al registrarse en el Sitio, y/o usar cualquiera de los servicios que la Compañía pueda poner a disposición del Cliente en el Sitio, usted como Cliente está aceptando y por lo mismo se obliga a cumplir con los Términos y Condiciones.

Por lo anterior, antes de realizar cualquier acceso, acción, navegación o uso en o a través del Sitio, usted como Cliente debe leer cuidadosamente todos los Términos y Condiciones y la Política de Protección de Datos Personales, y si no estuviera de acuerdo, debe abstenerte de seguir usándolo o navegando en el mismo.

Es decir, al realizar cualquier acceso, acción, navegación o uso del Sitio, usted como Cliente está garantizando expresamente que: 1. Acepta y se obliga por los presentes Términos y Condiciones. 2. Que tiene todas las capacidades para aceptar y obligarse por los Términos y Condiciones. El Cliente antes de aceptar los Términos y Condiciones ha tomado pleno conocimiento de los mismos, los ha tenido a la vista y leído con detenimiento.

En el evento de otorgamiento de un crédito por la Compañía a un Cliente, estos Términos y Condiciones hacen parte integral del contrato del crédito, contrato de mutuo, pagaré y/o cualquier acto, instrumento o negocio jurídico del correspondiente crédito, entre la Compañía y el Cliente.`,
  },
  {
    title: "3. Descripción del Sitio",
    content: `A través del Sitio se prestan los servicios de otorgamiento de crédito a los Clientes (contrato de mutuo) y/o los actos relacionados y complementarios del mismo, por la Compañía y de conformidad, entre otros, con las políticas, modelos, análisis y decisiones internas de la Compañía. La Compañía tiene como propósito, el otorgamiento de créditos de conformidad con los requisitos de los Términos y Condiciones, del Sitio y de las políticas, modelos, análisis y decisiones internas de la Compañía.

La modalidad de los créditos que otorga la Compañía, son microcréditos, crédito de consumo y ordinario y créditos de consumo de bajo monto. La clasificación de una operación de crédito en una modalidad particular se hará por parte de la Compañía al momento de la aprobación del correspondiente crédito y permanecerá así hasta su pago. Para poder presentar una solicitud de crédito los Clientes se deben registrar en el Sitio y crear una cuenta en este. La Compañía no tiene la obligación ni compromiso alguno de otorgar un crédito al Cliente, por lo que el otorgamiento del mismo, dependerá de, entre otros, estos Términos y Condiciones, los requerimientos indicados en el Sitio, las políticas, modelos, análisis y decisiones internas de la Compañía, la capacidad, situación y solvencia de la Compañía, así como la residencia y perfil de los Clientes.

La Compañía es una sociedad comercial y privada, y no es una entidad financiera ni es una de las entidades previstas en el estatuto orgánico del sistema financiero, ni una de las empresas vigiladas y/o supervisadas por la Superintendencia Financiera de Colombia, ni una de las empresas vigiladas y/o supervisadas por la Superintendencia de Economía Solidaria. En pro de la transparencia y seguridad de los Clientes y el Sitio, como el buen funcionamiento de este, la Compañía cuenta con procedimientos internos de cumplimiento, además de contar con estrictas normas de autorregulación.

La Compañía no proporciona ningún tipo de servicio de asesoría financiera ni cuenta con agentes o asesores que ofrezcan servicios de asesoría o gestión financiera.`,
  },
  {
    title: "4. Uso del Sitio y de los Servicios",
    content: `A través del Sitio, la Compañía podrá acceder a las siguientes funcionalidades del dispositivo del Cliente: navegador web del dispositivo móvil para realizar la solicitud de productos y para obtener la información de conexión e información del dispositivo, teléfono para el envío de SMS con OTP para validación del número celular, cámara para la validación del documento de identificación y autenticación biométrica. La Compañía podrá optar por todos los mecanismos, métodos, factores y/o tecnologías indicados en los presentes Términos y Condiciones, así como todos aquellos adicionales, que estime convenientes para el adecuado uso del Sitio y/o para los servicios del Sitio y/o la Compañía, incluyendo pero sin limitarse para las funcionalidades de autenticación del Clientes y la creación y/o uso de la firma electrónica y claves.

La cuenta de un Cliente en el Sitio es personal, única e intransferible. El registro, aceptación de estos Términos y Condiciones y manejo de la cuenta es exclusiva potestad del Cliente Registrado titular de la cuenta.

La Compañía podrá, a su exclusiva voluntad, agregar otros servicios adicionales a los actualmente soportados u otro tipo de créditos, o dejar de soportar uno o más de los actualmente soportados, si así lo estima conveniente, no siendo una obligación para Compañía agregar créditos, ofrecer créditos ni dejar de soportar otros servicios distintos a los actuales.

Es responsabilidad del Cliente contar con los medios de comunicación necesarios y adecuados, para navegar en el Sitio como para usar y utilizar los servicios ofrecidos, no siendo responsabilidad de la Compañía, la disponibilidad ni la confiabilidad de los dispositivos, equipos o medios de comunicación que utilice el Cliente. El Cliente se obliga a mantener actualizados los navegadores web, antivirus y demás sistemas o herramientas, para un correcto funcionamiento y visualización de los contenidos del Sitio.`,
  },
  {
    title: "5. Condiciones Generales",
    content: `Cualquier acto que adelanten la Compañía y el Cliente de forma electrónica y/o no presencial, así como la información contenida en los presentes Términos y Condiciones goza de plena validez a la luz del artículo 5 de la Ley 527 de 1999 y demás normas jurídicas de validez, uso y equivalencia funcional de medios electrónicos, por medio de las cuales se reconoce jurídicamente los efectos de los mensajes de datos.

El Cliente acepta y reconoce, que los contratos, pagarés y en general documentos que contengan cualquier contrato y/o negocio entre la Compañía y el Cliente se firmarán a través del método de firma electrónica establecido y provisto por la Compañía, y reconocerá, en el evento de usar esa firma electrónica, la validez jurídica, confiabilidad, apropiabilidad, autenticidad e integridad de la firma usada por el Cliente como del correspondiente mensaje de datos como demás atributos y requerimientos de conformidad con la Ley 527 de 1999 y el Decreto 2364 de 2012.

1. Reconoce y acepta que en los Términos y Condiciones se establecen las reglas de un contrato jurídico, válido y vinculante.

2. Que para los contratos, actos y/o negocios jurídicos de crédito entre el Cliente y la Compañía se usarán mensajes de datos como documentos y medios electrónicos, reconociendo y aceptando el Cliente los métodos, tecnologías, sistemas, herramientas y factores previstos por la Compañía y/o el Sitio.

3. El uso, navegación y acceso del Sitio sólo está disponible para las personas jurídicas y/o naturales que sean mayores de dieciocho (18) años, que tengan capacidad legal para contratar, que residan en territorio colombiano, que sean titulares de una cuenta bancaria, de un correo electrónico personal y de un número de celular personal.

4. La Compañía en cualquier momento y a su solo arbitrio, podrá disponer la suspensión o inhabilitación temporal o definitiva para el acceso del Cliente al Sitio.

5. El Cliente que decida solicitar un crédito, deberá registrarse en el Sitio.

6. Al registrarse se obliga a entregar información veraz, correcta y actualizada.

7. Al registrarse, acepta la responsabilidad de mantener control de la seguridad de cualquier información, IDs, contraseñas o cualquier código que utilice para acceder al Sitio.

8. El Cliente acepta ser el único responsable de mantener su dirección de correo electrónico, domicilio y número de celular y demás datos del Sitio, actualizados en el perfil de su cuenta.`,
  },
  {
    title: "6. Registro y Cuenta",
    content: `9. En caso de encontrar o sospechar de alguna actividad inadecuada relacionada a la cuenta, la Compañía podrá solicitarle información adicional, incluyendo autenticación de documentos, o congelar cualquier acción para ser revisadas.

10. La cuenta que un Cliente cree en el Sitio es personal, única e intransferible, y está prohibido que un mismo Cliente Registrado inscriba o tenga más de una cuenta a nombre propio, o permita que a través de su cuenta, terceros puedan acceder a los servicios ofrecidos por la Compañía, sin la pertinente autorización previa por parte de la Compañía.

12. No obstante poseer estrictos controles de seguridad en el Sitio, el Cliente declara que no utilizará cuentas ajenas ni ayudará a terceros a obtener acceso a las mismas sin autorización previa y expresa de la Compañía.

13. El uso no autorizado de otras cuentas que no sean la propia, resultará en la suspensión o cierre inmediato de todas las cuentas involucradas.

14. El Cliente acepta y declara que no usará su cuenta ni el Sitio para realizar actividades ilegales o criminales de ningún tipo, incluyendo pero no limitado al lavado de activos o dinero, financiamiento del terrorismo, terrorismo financiero, hackeos maliciosos, ni transgresión de las disposiciones previstas en las normas jurídicas.

15. Como Cliente, acepta que está prohibida la venta, cesión o transferencia de la cuenta.

16. La Compañía se reserva el derecho de rechazar cualquier solicitud de registro o de cancelar una cuenta previamente aceptada, sin que esté obligado a comunicar o exponer las razones de su decisión y sin que ello genere algún derecho a indemnización o resarcimiento a dicho Cliente.

17. La Compañía podrá remitir al Cliente un OTP (One Time Password) a través de mensaje de texto (SMS) y/o correos electrónicos con el fin de registrarse y/o activar la cuenta y/o acceder a cualquier servicio del Sitio.

18. La Compañía se reserva el derecho de rechazar cualquier solicitud de registro en el Sitio, así como el de cancelar una activación o cuenta previamente aceptada, sin que esté obligado a comunicar o exponer las razones de su decisión.

19. La Política de Protección de Datos Personales es parte integral de los Términos y Condiciones.

20. La Compañía como los Clientes reconocen y aceptan el uso de mensajes de datos, firmas digitales y/o electrónicas.

21. El Cliente se compromete a navegar y usar el Sitio y a utilizar el contenido del mismo de buena fe.

22. Adicional a la información suministrada para el registro, el Cliente suministrará otros datos personales, principalmente datos de ingresos, egresos, situación financiera, situación laboral, tipo de vivienda, actividad económica, estrato socioeconómico, estado civil.

23. El suministro de cualquier dato e información por el Cliente es voluntario, por lo que el Cliente puede negarse al suministro de la misma, sin perjuicio que dicha negación puede dar lugar a la denegación de los servicios y/o funcionalidades del Sitio y/o de la Compañía.

24. La Compañía presume que los datos suministrados por el Cliente, han sido suministrados por su titular o por una persona debidamente autorizada, que son correctos y exactos, y que pertenecen a una persona mayor de edad. Corresponde al Cliente la actualización de sus propios datos.

25. El Cliente se obliga a no ejecutar y/o realizar operaciones y/o actos que pongan en riesgo, o generen daños, a la operación del Sitio.`,
  },
  {
    title: "7. Solicitud, Aprobación y Aceptación del Crédito",
    content: `37. El Cliente, luego de ingresar a su cuenta del Sitio y ser debidamente autenticado y verificado, podrá solicitar a la Compañía un microcrédito, un crédito de consumo o un crédito de consumo de bajo monto, de conformidad con las condiciones y términos del Sitio y de la Compañía. El Cliente no deberá indicar en su solicitud si la solicitud es para un microcrédito, para un crédito de consumo y ordinario o para un crédito de consumo de bajo monto, definiéndose automáticamente de acuerdo al perfil y al destino del crédito informado.

38. La Compañía también se reserva el derecho exclusivo de decidir a qué Clientes otorgar créditos y las condiciones en que podría otorgar los mismos.

39. En caso de aprobación del crédito solicitado por el Cliente a la Compañía, se informarán las condiciones en que podría otorgar el mismo.

40. Los créditos se otorgarán a un plazo máximo de 36 meses de conformidad con la solicitud de crédito del Cliente y el análisis adelantado por la Compañía. Expresamente se deja indicado que no existe obligación del Cliente de un mínimo de cuotas de pago.

41. El Cliente podrá solicitar y consultar todos los documentos relacionados con el contrato de crédito, pagaré y/o demás documentos que incorporarán las condiciones del crédito.

42. El Cliente podrá solicitar en cualquier momento a la Compañía la explicación de cómo se ha calculado la cuota así como la fórmula o fórmulas que aplicó para obtener los valores cobrados.

43. En el evento que al momento de presentarse una solicitud de crédito, el Cliente sea parte de un proceso judicial o se encuentre en mora respecto a cualquier obligación, deberá manifestar dicha situación a la Compañía.

44. Con la solicitud del crédito, el Cliente declara y garantiza a la Compañía que no se encuentra en listas de la OFAC ni similares, que sus activos no provienen de actividades ilegales, y que cuenta con recursos suficientes para atender oportunamente el pago de sus obligaciones.

45. Una vez recibida la solicitud de crédito, la Compañía dará una respuesta negativa o positiva en un plazo máximo de 15 días calendario. El Cliente acepta y reconoce que la Compañía no tiene la obligación de aceptar la solicitud de crédito ni de otorgar el crédito.

46. La Compañía podrá hacer visitas domiciliarias a los Clientes para validar cualquier dato o información suministrado.

47. El Cliente acepta que la negación de una solicitud de un crédito por la Compañía no tiene que estar motivada ni justificada.

48. En el evento que una vez presentada una solicitud de crédito por el Cliente, no reciba respuesta en el término de 15 días calendario, se entenderá que la solicitud ha sido rechazada.`,
  },
  {
    title: "8. Condiciones del Crédito",
    content: `49. En el evento que la Compañía acepte la solicitud de crédito del Cliente, comunicará las condiciones del mismo: (i) el monto del préstamo, (ii) la tasa de interés efectiva anual aplicable, (iii) el plazo acordado, (iv) el monto y la fecha de pago, (v) el sistema de amortización del capital y de los intereses, (vi) la cantidad, periodicidad y monto de los pagos a realizar, (viii) los gastos extra, cargos, seguros o adicionales, si los hubiere.

50. El desembolso correspondiente se hará única y exclusivamente a una cuenta de ahorros o corriente definida por el Cliente.

51. El Cliente, una vez recibida la aprobación, comunicará a la Compañía a través del Sitio la aceptación de la misma, incluyendo los términos y condiciones del crédito.

52. El Cliente, al comunicar la aceptación, reconoce y acepta que deberá a la Compañía la suma indicada en la aprobación, discriminada en: monto del préstamo, intereses remuneratorios, y los gastos extra, acceso a la plataforma, gastos de administración, cargos, seguros o adicionales, si los hubiere.

La Compañía incluirá comisiones mipyme en el evento de microcréditos cuyo monto no supere los veinticinco (25) salarios mínimos mensuales legales vigentes. El Usuario puede acceder voluntariamente a solicitar un seguro y/o garantía para cubrir el pago del crédito, incluyendo seguro de vida expedido a favor de la Compañía. El Cliente no está obligado a contratar el seguro con las compañías indicadas por la Compañía.

53. Durante toda la vigencia del crédito, desde la fecha de desembolso y hasta el pago total del capital, se causarán intereses remuneratorios sobre el capital pendiente de pago, según el porcentaje definido por la Compañía mensualmente y de acuerdo al perfil del Cliente.

54. La tasa de interés remuneratorio será cobrada en cada una de las cuotas que se determinen para el crédito otorgado.

55. Los intereses se calcularán desde la fecha del desembolso y hasta la fecha de pago total, tomando como base un año de trescientos sesenta y cinco (365) días.

56. La Compañía puede libremente ofrecer a otros Clientes una tasa de interés menor o mejores condiciones.

57. El Cliente deberá firmar electrónicamente los documentos que disponga la Compañía (contrato de crédito o mutuo, pagaré, carta de instrucciones) a través de la firma electrónica aceptada y reconocida por el Cliente.

58. La Compañía tratará de desembolsar el crédito en un plazo no mayor a veinticuatro horas hábiles.

59. El Cliente podrá retractarse del otorgamiento del crédito dentro de los cinco (5) días contados a partir de la firma del contrato de crédito, debiendo pagar a la Compañía el capital recibido como los intereses causados dentro de los treinta días siguientes a su decisión de retracto.

60. Todos los pagos deberán hacerse directamente por el Cliente a la Compañía, en la cuenta o forma indicada por la Compañía.

61. Si la Compañía recibe fondos insuficientes, se imputarán primero a comisiones, gastos y tarifas vencidos; segundo, a intereses vencidos (primero mora, luego remuneratorios); y tercero, a capital vencido.

62. Todos los pagos serán hechos en pesos colombianos.

64. El Cliente podrá prepagar total o parcialmente cualquier obligación sin sanciones económicas, cláusulas penales ni exigirse el pago de intereses no causados.

65. La Compañía se obliga a suministrar, a solicitud del Cliente, información completa y precisa sobre las cuotas pagadas y cualquier pago efectuado.`,
  },
  {
    title: "9. Mora e Intereses",
    content: `66. El Cliente incurrirá en mora de pleno derecho y en forma automática, sin necesidad de reconvención judicial ni requerimiento alguno, en caso que el capital y/o los intereses no sean pagados en la fecha de su vencimiento. Todas las cantidades vencidas causarán interés a la tasa máxima de interés moratoria permitida por la ley.

67. En el evento de mora, la Compañía podrá declarar vencida y exigir el pago anticipado de cualquier suma derivada del crédito, con la aceleración de las demás obligaciones a cargo del Cliente.

68. La Compañía podrá adoptar las medidas y gestiones necesarias para la ejecución o cobro judicial o extrajudicial de las obligaciones, y cobrar gastos administrativos y/o gastos de cobranza debidamente soportados.

69. La Compañía podrá directamente o a través de terceros, remitir comunicaciones electrónicas o físicas al Cliente, hacerle llamadas telefónicas, como adelantar cualquier gestión de cobranza en el evento de incumplimiento.

70. El Cliente informará inmediatamente a la Compañía cualquier situación o circunstancia que pueda causar retraso de sus obligaciones o que afecte su situación financiera.`,
  },
  {
    title: "10. Normativa Aplicable",
    content: `71. La Compañía, en todo momento, cumplirá con las normas vigentes en la República de Colombia, incluyendo, sin limitación, las normas fiscales. Igualmente, el Cliente cumplirá con las normas vigentes.

72. El Cliente acepta la plena validez de las notificaciones enviadas y recibidas a través del Sitio, correo electrónico, mensaje de datos y/o mensajes de texto.

73. El Cliente acepta que los datos y documentos generados puedan ser estampados cronológicamente para certificar su existencia.

74. El Cliente acepta que los datos y documentos generados dentro del Sitio sean almacenados en un archivo confiable de datos.`,
  },
  {
    title: "11. Cesión y Terminación",
    content: `75. La Compañía podrá ceder cuentas por cobrar, créditos y/u obligaciones a cualquier tercero, incluyendo entidades financieras, sin necesidad del consentimiento del Cliente.

76. Los Clientes pueden terminar este acuerdo y cerrar sus cuentas en el Sitio una vez se encuentren al día con todas las obligaciones contraídas.

77. La Compañía podrá, sin previo aviso, limitar, suspender o terminar el servicio y las cuentas, prohibir el acceso al Sitio, restringir o remover contenido almacenado.

78. La Compañía podrá suspender o cerrar cuentas por razones como: acceso no autorizado, conductas fraudulentas, actividades ilegales, incumplimiento de Términos y Condiciones, falta de pago, dificultades operacionales, o requerimiento de autoridad gubernamental.

79. La Compañía se reserva el derecho a cancelar y/o cerrar cuentas que no hayan podido ser verificadas satisfactoriamente.

80. La suspensión o cierre de una cuenta no afectará el pago de las obligaciones contraídas.

84. En el evento de terminación del contrato de crédito por la Compañía, esta deberá dar un preaviso de cinco (5) días calendario.

85. El Cliente podrá terminar cualquier contrato con la Compañía con un preaviso de cinco (5) días calendario, siempre que se encuentre a paz y salvo.`,
  },
  {
    title: "12. Propiedad Intelectual",
    content: `86. La Compañía no se responsabiliza por cualquier daño, perjuicio o pérdida al Cliente causados por fallas en el sistema, en el servidor, en Internet o en el Sitio. La Compañía no garantiza el acceso y uso continuado o ininterrumpido del Sitio.

87. Todo el material en el Sitio es de propiedad de la Compañía y está protegido por derechos de autor, derechos de marca, derechos de propiedad intelectual y otras leyes internacionales aplicables. El Cliente puede revisar, imprimir y/o descargar copias del material para fines exclusivamente personales, informativos y de usos no comerciales.

88. La marca y logo de la Compañía usados en el Sitio son propiedad de la Compañía. El software, textos, informes, imágenes, gráficos, información, precios, videos y audios utilizados en el Sitio son propiedad de la Compañía. Estos no deben ser copiados, reproducidos, modificados, republicados ni distribuidos de manera comercial.

89. Como Cliente acepta que la Compañía se reserve el derecho de darle acceso a algunas personas para acceder a información específica a través de API o Widgets.

90. Si no podemos entregar o prestar los servicios por razones ajenas a nuestro control, incluyendo fuerza mayor, cambios regulatorios o sanciones, no nos hacemos responsables ante los Clientes.`,
  },
  {
    title: "13. Modificaciones",
    content: `91. La Compañía se reserva el derecho a modificar estos Términos y Condiciones, en cualquier momento, y esos cambios serán efectivos a partir del momento de su publicación en el Sitio. La Compañía se compromete a hacer esfuerzos razonables por informar los cambios materiales. Si realizados los cambios, los Clientes continúan usando y accediendo al Sitio, significará que aceptan dichos cambios.`,
  },
  {
    title: "14. Contacto",
    content: `92. Si tiene alguna duda, reclamo, comentario o sugerencia respecto a estos Términos y Condiciones, a sus derechos y obligaciones desprendidos de estos Términos y Condiciones y/o el uso del Sitio y sus servicios y/o su cuenta, le solicitamos contactarnos a comunicaciones@entreamigos.co.

93. Estos Términos y Condiciones estarán regidos en todos sus puntos por las leyes vigentes en la República Colombia. Los presentes Términos y Condiciones se actualizaron el veinte (20) de enero de 2023.`,
  },
];

const INITIAL_VISIBLE = 4;

const TermsPage = () => {
  const [expanded, setExpanded] = useState(false);
  const visibleSections = expanded ? sections : sections.slice(0, INITIAL_VISIBLE);

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
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Última actualización: 20 de enero de 2023
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="space-y-8">
          <AnimatePresence mode="sync">
            {visibleSections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i < INITIAL_VISIBLE ? i * 0.05 : 0 }}
                className="bg-card border border-border rounded-3xl p-6 md:p-8"
              >
                <h2 className="text-xl md:text-2xl font-extrabold text-foreground mb-4">{section.title}</h2>
                <div className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-10"
          >
            <div className="relative">
              {/* Fade overlay */}
              <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
              <button
                onClick={() => setExpanded(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-base shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:scale-[1.02]"
              >
                Ver todos los términos ({sections.length - INITIAL_VISIBLE} secciones más)
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-10"
          >
            <button
              onClick={() => {
                setExpanded(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-card border border-border text-foreground font-bold text-base hover:border-primary/30 transition-all"
            >
              Mostrar menos
              <ChevronDown className="w-5 h-5 rotate-180" />
            </button>
          </motion.div>
        )}

        {/* Concurso adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-teal-light to-pink-light rounded-3xl p-8 text-center"
        >
          <h3 className="text-xl font-bold text-foreground mb-3">Conoce los términos y condiciones del concurso para entrega de vídeo promocional</h3>
          <p className="text-muted-foreground text-sm mb-5">
            Los microempresarios tienen una gran oportunidad de venta en una época como diciembre, por eso, en Entre Amigos S.A.S. premiaremos a uno de nuestros seguidores con un vídeo promocional para su negocio.
          </p>
          <a
            href="https://cdn.prod.website-files.com/649301ad3054cda1d6959775/653c42c9bdeacd544a9fc567_Te%CC%81rminos%20y%20condiciones%20del%20concurso%20para%20entrega%20de%20video%20promocional.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-teal-dark transition-colors"
          >
            Descarga aquí los TYC del concurso
          </a>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPage;