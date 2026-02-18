import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
    PiggyBank,
    TrendingUp,
    HeartPulse,
    ShieldCheck,
    Bike,
    Store,
    Users,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Briefcase
} from "lucide-react";
import negocioAmigoHero from "@/assets/negocio-amigo-hero.png";
import { SparklesCore } from "@/components/ui/sparkles";
import { StarDoodle, SparkleDoodle, BurstDoodle } from "@/components/ui/hand-drawn-decorations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Negocioamigologo from "@/assets/Negocioamigologo.png";

const NegocioAmigoPage = () => {
    const navigate = useNavigate();
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);


    const services = [
        {
            title: "Ahorros",
            description: "Empieza a construir tu futuro con planes de ahorro diseñados para microempresarios.",
            icon: <PiggyBank className="w-8 h-8 text-white" />,
            link: "https://www.entreamigos.co/negocioamigo---ahorros",
            gradient: "bg-black"
        },
        {
            title: "Créditos para tu negocio",
            description: "Impulsa tu crecimiento con líneas de crédito flexibles y a tu medida.",
            icon: <TrendingUp className="w-8 h-8 text-white" />,
            link: "https://www.entreamigos.co/negocioamigo---creditos",
            gradient: "bg-black"
        },
        {
            title: "Salud Prepagada",
            description: "Cuida de ti y de tu familia con acceso preferencial a servicios de salud.",
            icon: <HeartPulse className="w-8 h-8 text-white" />,
            link: "https://www.entreamigos.co/negocioamigo---salud",
            gradient: "bg-black"
        },
        {
            title: "Seguro Ingreso Seguro",
            description: "Protege tus ingresos ante incapacidades o imprevistos. Tu estabilidad económica no se detiene.",
            icon: <ShieldCheck className="w-8 h-8 text-black" />,
            gradient: "bg-gray-100",
            link: "#inscripcion"
        },
        {
            title: "Crédito Vehículo",
            description: "Financiación para carro o moto, herramienta fundamental para tu transporte o trabajo.",
            icon: <Bike className="w-8 h-8 text-black" />,
            gradient: "bg-gray-100",
            link: "#inscripcion"
        },
        {
            title: "Sistema de Gestión",
            description: "Software especializado para controlar ventas, inventarios y facturación de tu microempresa.",
            icon: <Briefcase className="w-8 h-8 text-black" />,
            gradient: "bg-gray-100",
            link: "#inscripcion"
        }
    ];

    const faqs = [
        {
            question: "¿Qué requisitos necesito para acceder al crédito?",
            answer: "Buscamos facilitar tu acceso. Principalmente necesitas tener tu negocio activo y demostrar ingresos. Contáctanos para un estudio personalizado."
        },
        {
            question: "¿Los seguros cubren a mi familia?",
            answer: "Sí, contamos con opciones de Salud Prepagada y seguros que pueden extenderse a tu núcleo familiar."
        },
        {
            question: "¿Cómo funciona el Sistema de Gestión?",
            answer: "Es una plataforma en la nube que te permite registrar tus ventas y gastos desde cualquier dispositivo, ayudándote a tener el control total de tu negocio."
        },
        {
            question: "¿Tienen cobertura en todo el país?",
            answer: "Actualmente operamos en las principales ciudades y municipios. Déjanos tus datos para confirmar cobertura en tu zona."
        }
    ];

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Custom Header for Negocio Amigo - WHITE BACKGROUND - CENTERED LOGO */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm py-4 px-6 md:px-12 flex justify-between items-center shadow-lg shadow-black/5 border-b border-black/5 transition-all duration-300">
                <Button
                    variant="ghost"
                    className="text-black hover:bg-black/5 font-medium flex-1 justify-start px-0 md:px-4"
                    onClick={() => navigate("/")}
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <span className="hidden md:inline">Volver</span>
                </Button>

                <div className="flex-1 flex justify-center">
                    <img src={Negocioamigologo} alt="Negocio Amigo Logo" className="h-12 md:h-14 w-auto object-contain hover:scale-105 transition-transform" />
                </div>

                <div className="flex-1 flex justify-end">
                    {/* Empty spacer or additional button if needed, keeps logo centered */}
                </div>
            </header>

            {/* ─── HERO ─── */}
            <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden bg-white">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <SparklesCore
                        id="tsparticlesfullpage"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={100}
                        className="w-full h-full absolute inset-0 z-0"
                        particleColor="#000000"
                        particleOffset={100}
                    />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-100/50 rounded-full blur-[120px] z-10" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-50/50 rounded-full blur-[100px] z-10" />

                    {/* Hand Drawn Doodles - Top Right Area - VISIBLE */}
                    <StarDoodle className="absolute top-24 right-[10%] w-12 h-12 text-black/30 z-0 rotate-12" delay={0} />
                    <SparkleDoodle className="absolute top-44 right-[15%] w-8 h-8 text-black/25 z-0" delay={1.5} />
                    <BurstDoodle className="absolute top-20 right-[20%] w-10 h-10 text-black/20 z-0" delay={2} />

                    {/* Hand Drawn Doodles - Bottom Left Area - VISIBLE */}
                    <StarDoodle className="absolute bottom-20 left-[5%] w-16 h-16 text-black/25 z-0 -rotate-12" delay={1} />
                    <SparkleDoodle className="absolute bottom-40 left-[10%] w-10 h-10 text-black/30 z-0" delay={0.5} />
                </div>

                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        {/* Text Content */}
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex-1 max-w-2xl text-center md:text-left">
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-black mb-6 leading-[1.1]">
                                Tu Negocio, <br />
                                <span className="text-gray-600">Tu Esfuerzo,</span> <br />
                                Tu Futuro.
                            </h1>
                            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium">
                                En Negocio Amigo creemos en el poder del trabajo honesto y en los sueños de cada microempresario. Te conectamos con las soluciones que necesitas.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Button
                                    className="bg-black text-white hover:bg-black/80 h-14 px-8 rounded-full text-lg font-bold shadow-xl shadow-black/10 transition-all hover:scale-105"
                                    onClick={() => document.getElementById("inscripcion")?.scrollIntoView({ behavior: "smooth" })}
                                >
                                    ¡Inscríbete Ahora!
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-2 border-black text-black hover:bg-black hover:text-white h-14 px-8 rounded-full text-lg font-bold transition-all"
                                    onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
                                >
                                    Ver Servicios
                                </Button>
                            </div>
                        </motion.div>

                        {/* Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex-1 relative w-full max-w-[500px]"
                        >
                            <div className="absolute inset-0 bg-black/5 rounded-[40px] rotate-3 blur-md transform translate-y-4"></div>
                            <img
                                src={negocioAmigoHero}
                                alt="Negocio Amigo"
                                className="w-full relative z-10 rounded-[32px] shadow-2xl shadow-black/20 border border-black/5 object-cover aspect-[4/3] transform hover:scale-[1.01] transition-transform duration-700"
                            />

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 z-20"
                            >
                                <div className="bg-black/5 p-3 rounded-full">
                                    <Store className="w-6 h-6 text-black" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Aliado</p>
                                    <p className="text-lg font-bold text-black">Estratégico</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* ─── QUIENES SOMOS (About Section) ─── */}
            <section className="py-24 bg-gray-50 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <SparkleDoodle className="inline-block w-10 h-10 text-black/40 mb-4" />
                        <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-8 tracking-tight">
                            ¿Por qué Negocio Amigo?
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
                            "Sabemos que emprender no es fácil: el acceso al crédito es complicado, los seguros parecen un lujo lejano y muchos productos financieros parecen hechos para otros, no para ti. <strong className="font-bold text-black">Por eso creamos Negocio Amigo.</strong>"
                        </p>
                    </div>
                </div>
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                    <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-[80px]" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-[80px]" />
                    <BurstDoodle className="absolute top-1/2 left-10 w-16 h-16 text-black/10" />
                    <StarDoodle className="absolute bottom-20 right-20 w-12 h-12 text-black/10" />
                </div>
            </section>

            {/* ─── SERVICES GRID ─── */}
            <section id="servicios" className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gray-50 rounded-full blur-[120px] -z-10" />

                {/* Hand Drawn Doodles for Services Section - SCATTERED */}
                <StarDoodle className="absolute top-10 left-[5%] w-10 h-10 text-black/20" delay={0.5} />
                <SparkleDoodle className="absolute top-20 right-[8%] w-8 h-8 text-black/20" delay={1} />
                <BurstDoodle className="absolute bottom-1/4 left-[2%] w-12 h-12 text-black/15" delay={2} />
                <StarDoodle className="absolute top-1/2 right-[3%] w-14 h-14 text-black/10 rotate-12" delay={1.5} />
                <SparkleDoodle className="absolute bottom-10 left-[15%] w-9 h-9 text-black/20" delay={0.2} />
                <BurstDoodle className="absolute top-1/3 right-[12%] w-11 h-11 text-black/15" delay={2.5} />

                <div className="container mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 relative z-10">
                        <span className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-2 block">Portafolio</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">
                            Todo lo que necesitas <br /> <span className="text-gray-400">en un solo lugar</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
                        {services.map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Card className="h-full border border-gray-100 hover:border-black/20 hover:shadow-2xl hover:shadow-black/5 transition-all duration-300 cursor-pointer group rounded-[24px] overflow-hidden bg-white flex flex-col">
                                    <div className="p-8 flex flex-col h-full">
                                        <div className={`w-14 h-14 rounded-2xl ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                                            {service.icon}
                                        </div>
                                        <CardTitle className="text-2xl font-bold text-black mb-3">
                                            {service.title}
                                        </CardTitle>
                                        <CardDescription className="text-base text-gray-600 mb-8 leading-relaxed flex-grow">
                                            {service.description}
                                        </CardDescription>
                                        <div className="mt-auto">
                                            <Button
                                                variant="outline"
                                                className="w-full rounded-xl border-2 border-gray-100 hover:border-black hover:bg-black hover:text-white font-bold transition-all group-hover:shadow-lg"
                                                onClick={() => document.getElementById("inscripcion")?.scrollIntoView({ behavior: "smooth" })}
                                            >
                                                ¡Lo quiero!
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FAQ SECTION ─── */}
            <section className="py-24 bg-gray-50 relative">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4">Preguntas Frecuentes</h2>
                        <p className="text-gray-600">Resolvemos tus dudas para que tomas la mejor decisión.</p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <h3 className="font-bold text-lg text-black mb-2 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-black"></div>
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 pl-5 leading-relaxed">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <p className="text-gray-500 mb-4">¿Aún tienes dudas?</p>
                        <a href="https://wa.me/3153520872" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-black font-bold hover:underline">
                            Escríbenos por WhatsApp <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ─── FORM SECTION ─── */}
            <section id="inscripcion" className="py-24 relative overflow-hidden bg-white">
                <div className="absolute inset-0 h-full w-full pointer-events-none">
                    <SparklesCore
                        id="form-sparkles"
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={50}
                        className="w-full h-full"
                        particleColor="#000000"
                        particleOffset={50}
                    />
                </div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-[100px] -z-10" />

                {/* Hand Drawn Doodles for Form Section - INCREASED VISIBILITY */}
                <StarDoodle className="absolute top-10 left-[8%] w-16 h-16 text-black/30 z-0" delay={0.2} />
                <BurstDoodle className="absolute bottom-20 right-[5%] w-20 h-20 text-black/25 z-0" delay={1.2} />
                <SparkleDoodle className="absolute top-1/2 left-[2%] w-12 h-12 text-black/30 z-0" delay={2.5} />
                <StarDoodle className="absolute bottom-10 left-[15%] w-10 h-10 text-black/30 z-0 rotate-45" delay={1.8} />
                <SparkleDoodle className="absolute top-20 right-[15%] w-8 h-8 text-black/20 z-0" delay={0.5} />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                            <span className="inline-block px-4 py-2 rounded-full bg-black text-sm font-semibold text-white mb-4 shadow-lg shadow-black/20">
                                Únete a nosotros
                            </span>
                            <h2 className="text-4xl md:text-6xl font-extrabold text-black tracking-tight mb-6">
                                Inscríbete a <br /><span className="text-gray-400">Negocio Amigo</span>
                            </h2>
                            <p className="text-gray-600 text-xl max-w-2xl mx-auto font-light">
                                Déjanos tus datos, queremos conocerte y ayudarte a potenciar tu negocio hoy mismo.
                            </p>
                        </motion.div>

                        <Card className="border border-gray-100 shadow-2xl shadow-black/10 rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-xl">
                            <CardContent className="p-8 md:p-12">
                                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Gracias por inscribirte. Pronto te contactaremos."); }}>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-black ml-1">Nombre Completo</label>
                                            <input required type="text" className="flex h-14 w-full rounded-2xl border border-gray-200 bg-white/50 px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-black/30 focus:bg-white" placeholder="Ej: Juan Pérez" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-black ml-1">Número de Cédula</label>
                                            <input required type="number" className="flex h-14 w-full rounded-2xl border border-gray-200 bg-white/50 px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-black/30 focus:bg-white" placeholder="Ej: 1234567890" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-black ml-1">Celular</label>
                                            <input required type="tel" className="flex h-14 w-full rounded-2xl border border-gray-200 bg-white/50 px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-black/30 focus:bg-white" placeholder="Ej: 300 123 4567" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-black ml-1">Correo Electrónico</label>
                                            <input required type="email" className="flex h-14 w-full rounded-2xl border border-gray-200 bg-white/50 px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-black/30 focus:bg-white" placeholder="Ej: juan@ejemplo.com" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-black ml-1">Departamento</label>
                                            <input required type="text" className="flex h-14 w-full rounded-2xl border border-gray-200 bg-white/50 px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-black/30 focus:bg-white" placeholder="Ej: Cundinamarca" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-black ml-1">Ciudad / Municipio</label>
                                            <input required type="text" className="flex h-14 w-full rounded-2xl border border-gray-200 bg-white/50 px-5 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-black/30 focus:bg-white" placeholder="Ej: Bogotá" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-black ml-1">¿A qué se dedica tu negocio?</label>
                                        <textarea className="flex min-h-[120px] w-full rounded-2xl border border-gray-200 bg-white/50 px-5 py-4 text-base ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-black/30 focus:bg-white resize-none" placeholder="Descríbenos brevemente tu actividad..." />
                                    </div>

                                    <div className="flex items-start gap-4 pt-2 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                        <input type="checkbox" required id="terms" className="mt-1 h-5 w-5 rounded-md border-gray-300 text-black focus:ring-black cursor-pointer" />
                                        <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                                            Acepto los <a href="/terminos-y-condiciones" className="text-black hover:underline font-bold" target="_blank">términos, condiciones</a> y la <a href="/proteccion-de-datos" className="text-black hover:underline font-bold" target="_blank">política de tratamiento de datos personales</a>. Entiendo que seré contactado para validar mi información.
                                        </label>
                                    </div>

                                    <Button type="submit" size="lg" className="w-full text-lg font-bold h-16 rounded-2xl shadow-xl shadow-black/10 hover:shadow-2xl hover:scale-[1.01] transition-all bg-black hover:bg-black/90 text-white mt-4">
                                        Enviar Inscripción
                                        <CheckCircle2 className="w-6 h-6 ml-2" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Custom Footer for Negocio Amigo */}
            <footer className="bg-white border-t border-gray-100 py-12 px-6">
                <div className="container mx-auto flex flex-col items-center justify-center gap-8">
                    <p className="text-black font-medium text-sm text-center">
                        ©2025 tesi. All rights reserved.
                    </p>
                    <Button
                        onClick={() => navigate("/")}
                        className="bg-black text-white hover:bg-black/90 font-bold px-8 py-6 rounded-full text-base shadow-lg shadow-black/10 hover:shadow-xl hover:scale-105 transition-all"
                    >
                        Entre Amigos
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default NegocioAmigoPage;
