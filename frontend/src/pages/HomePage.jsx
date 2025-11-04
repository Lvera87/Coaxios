import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from '../Assets/Logo Coaxios.webp';
import {
  Users,
  Library,
  Briefcase,
  ShieldCheck,
  Zap,
  Bell,
  Search,
  BookUser,
  LayoutGrid,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Componente de Botón Reutilizable ---
function Button({ variant = 'primary', children, className = '', ...props }) {
  const baseStyles = 'px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 shadow-sm';
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100',
    secondary: 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 hover:shadow-xl hover:border-blue-700 hover:-translate-y-1',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 shadow-none'
  };
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

// --- Componente de Card Reutilizable ---
function Card({ children, elevated = false, className = '' }) {
  const baseStyles = 'bg-white rounded-2xl border transition-all duration-300 p-6 hover:scale-[1.02]';
  const elevatedStyles = elevated 
    ? 'border-blue-100 shadow-lg hover:shadow-xl hover:shadow-blue-600/10 hover:border-blue-200' 
    : 'border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300';
  return (
    <div className={`${baseStyles} ${elevatedStyles} ${className}`}>
      {children}
    </div>
  );
}

// --- Componente de Sección ---
function SectionTitle({ title, subtitle, centered = true }) {
  const containerClass = centered ? 'text-center' : '';
  return (
    <div className={`mb-16 max-w-3xl ${containerClass} ${centered ? 'mx-auto' : ''}`}>
      <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 font-medium leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// --- Componente de la Homepage ---
function HomePage() {
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // --- Contexto GSAP para una mejor gestión y limpieza ---
    const ctx = gsap.context(() => {

      // Animación de la sección Hero (Entrada principal)
      gsap.timeline()
        .from('#hero-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
        .from('#hero-subtitle', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.6')
        .from('#hero-cta', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.4');

      // --- Función genérica para animar elementos al hacer scroll ---
      const animateOnScroll = (trigger, elements, vars) => {
        gsap.to(elements, {
          ...vars,
          scrollTrigger: {
            trigger: trigger,
            start: 'top 75%',
            end: 'top 25%',
            toggleActions: 'play none none none',
            scrub: false,
            markers: false
          },
        });
      };

      // Animación para la sección de Puntos de Dolor
      animateOnScroll('#pain-section', '#pain-section h2, #pain-section .pain-point-item', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Animación para la sección de la Solución
      animateOnScroll('#solution-section', '#solution-section .solution-block', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
      
      // Animación para la sección de Características
       animateOnScroll('#features-section', '#features-section .feature-card', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
      });
      
      // Animación para el Testimonio
      animateOnScroll('#testimonial-section', '#testimonial-section > div', {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'expo.out',
      });
      
      // Animación para la Visión a Futuro
      animateOnScroll('#future-section', '#future-section > div', {
         opacity: 1,
         y: 0,
         duration: 1,
         ease: 'power3.out',
      });
      
       // Animación para el CTA Final
       animateOnScroll('#cta-section', '#cta-section > div', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'expo.out',
       });

    }, containerRef);

    // --- Limpieza ---
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 antialiased text-gray-900">
      
      {/* --- Navegación --- */}
      <header className={`sticky top-0 z-50 transition-all duration-500 bg-white/98 backdrop-blur-xl border-b border-gray-200 ${isScrolled ? 'shadow-lg shadow-gray-200/50' : 'shadow-sm shadow-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center h-20">
          <a href="#" className="flex items-center gap-2 group">
            <img src={Logo} alt="Coaxios" className="h-9 w-auto transition-transform duration-300 group-hover:scale-105" />
          </a>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#solucion" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">La Solución</a>
            <a href="#caracteristicas" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">Características</a>
            <a href="#vision" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">Visión</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-50">Iniciar Sesión</button>
            <Button className="shadow-md" onClick={() => navigate('/registro')}>Crear Cuenta Gratis</Button>
          </div>
        </nav>
      </header>

      {/* --- Hero Section --- */}
      <section className="min-h-[92vh] flex items-center justify-center pt-24 pb-24 px-6 lg:px-8 text-center relative overflow-hidden">
        {/* Decoración de fondo mejorada */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-subtle"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-subtle" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute w-px h-32 bg-gradient-to-b from-transparent via-blue-200 to-transparent top-0 left-1/4 opacity-20"></div>
            <div className="absolute w-px h-32 bg-gradient-to-b from-transparent via-blue-200 to-transparent bottom-0 right-1/4 opacity-20"></div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6 text-sm font-medium text-blue-700">
            <Zap className="w-4 h-4" />
            <span>La plataforma que transforma tu forma de licitar</span>
          </div>
          <h1 id="hero-title" className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            Tú Armas la Propuesta. <br /> 
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">No Persigues los Papeles.</span>
          </h1>
          <p id="hero-subtitle" className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
            Coaxios es la plataforma que te da control. Accede a las <strong className="text-gray-900 font-bold">Bibliotecas de Experiencia</strong> autorizadas de tus socios para construir la licitación a tu ritmo.
          </p>
          <div id="hero-cta" className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button className="text-lg" onClick={() => navigate('/registro')}>
              <span className="flex items-center gap-2">
                Reclama tu Autonomía - Empieza Gratis
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
            <Button variant="secondary" className="text-lg">
              <span className="flex items-center gap-2">
                Ver Demo
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </span>
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Sin tarjeta de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Configuración en 5 minutos</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- De la Fricción a la Fluidez --- */}
      <section id="pain-section" className="py-28 px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-orange-50 border border-orange-200 rounded-full mb-6 text-sm font-semibold text-orange-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>El 78% de los contratistas pierden +5 horas coordinando documentos</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
              Si esto te suena familiar, necesitas Coaxios.
            </h2>
            <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-3xl mx-auto">
              Transforma tu flujo de trabajo de coordinación caótica a arquitectura estratégica
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                before: "Cadenas de emails y llamadas para conseguir la documentación de siempre y tiempos de espera.",
                after: "Accedes a los Archivos de tu socio y lo usas al instante. Se acabaron las esperas. Céntrate en las particularidades del proyecto.",
                icon: Bell,
                metric: "-80% tiempo",
                metricColor: "green"
              },
              {
                before: "reenviar las certificaciones por correo o en grupos de WhatsApp para darse cuenta que esa experiencia no aplica.",
                after: "Buscas por la palabra clave y tienes cada experiencia relevante en segundos con la posibilidad de poder revisar en primera mano si aplica.",
                icon: Search,
                metric: "-90% búsquedas",
                metricColor: "blue"
              },
              {
                before: "Empezar cada propuesta desde cero, armando la misma estructura una y otra vez",
                after: "Ensamblas el 80% de documentos base en minutos. ahorrando tiempo para organizar y buscar potenciales socios con la experiencia que necesitas.",
                icon: LayoutGrid,
                metric: "+10x velocidad",
                metricColor: "purple"
              }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              const colorMap = {
                green: { badge: 'bg-green-50 text-green-700 border-green-200', icon: 'text-green-600', hover: 'group-hover:shadow-green-200/50' },
                blue: { badge: 'bg-blue-50 text-blue-700 border-blue-200', icon: 'text-blue-600', hover: 'group-hover:shadow-blue-200/50' },
                purple: { badge: 'bg-purple-50 text-purple-700 border-purple-200', icon: 'text-purple-600', hover: 'group-hover:shadow-purple-200/50' }
              };
              const colors = colorMap[item.metricColor];
              return (
                <Card key={idx} elevated className="pain-point-item group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-0 group-hover:opacity-5 rounded-full blur-2xl transition-opacity duration-500" style={{backgroundImage: `linear-gradient(to bottom right, rgb(34, 197, 94), rgb(59, 130, 246))`}}></div>
                  
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${colors.badge} border rounded-full text-xs font-bold mb-5 relative z-10`}>
                    <span>{item.metric}</span>
                  </div>

                  <div className="flex justify-center mb-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-orange-200/50">
                      <IconComponent className="w-8 h-8 text-orange-600 transition-transform duration-300 group-hover:rotate-6" />
                    </div>
                  </div>
                  
                  <div className="space-y-5 relative z-10">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                        <p className="text-xs font-bold text-red-600 uppercase tracking-wider">Antes</p>
                      </div>
                      <p className="text-gray-700 font-medium leading-relaxed">{item.before}</p>
                    </div>
                    
                    <div className="relative">
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3">
                        <ArrowRight className="w-4 h-4 text-blue-600 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <p className={`text-xs font-bold ${colors.icon} uppercase tracking-wider`}>Ahora</p>
                      </div>
                      <p className="text-gray-700 font-medium leading-relaxed">{item.after}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-2 transition-all duration-300 group-hover:gap-3">
                      <span>Ver cómo funciona</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- La Plataforma Diseñada para el Líder --- */}
      <section id="solucion" className="py-28 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            title="La Plataforma Diseñada para el Líder"
            subtitle="Dos pilares que transforman tu rol"
          />
          <div id="solution-section" className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {[
              {
                icon: Library,
                title: "Tu Biblioteca Central",
                description: "Aquí viven tus activos fundamentales y reutilizables. Tu RUP, Cámara de Comercio, y tu historial completo de experiencias, digitalizado y listo para la acción.",
                color: "blue"
              },
              {
                icon: Briefcase,
                title: "El Espacio de Propuesta",
                description: "Un área de trabajo limpia para cada licitación. Aquí ensamblas los activos de tu Biblioteca y cargas los documentos únicos del proyecto: hojas de vida, cartas de compromiso, etc.",
                color: "cyan"
              }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <Card key={idx} elevated className="solution-block p-10 lg:p-12 group hover:border-blue-300">
                  <div className="flex items-start gap-5 mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-200/50`}>
                      <IconComponent className={`w-10 h-10 text-blue-600 transition-transform duration-300 group-hover:rotate-6`} />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mt-2">{item.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 font-medium leading-relaxed">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* --- Características Clave --- */}
      <section id="caracteristicas" className="py-28 px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30">
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            title="Herramientas para Liderar"
            subtitle="Cada característica está diseñada para darte control absoluto"
          />
          <div id="features-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookUser,
                title: "Bibliotecas Compartidas",
                description: "Construye un ecosistema donde la experiencia combinada de tu red está a tu alcance.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: ShieldCheck,
                title: "Permisos de Confianza",
                description: "Tus socios te dan acceso una sola vez a sus documentos recurrentes.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: Search,
                title: "Búsqueda de Capacidades",
                description: "Encuentra al instante qué socio tiene la experiencia exacta que necesitas.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Bell,
                title: "Alertas Proactivas",
                description: "Anticipa los vencimientos de tus documentos y los de tus socios.",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <Card key={idx} className="feature-card flex flex-col p-8 group hover:border-blue-300 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500 -translate-y-16 translate-x-16`}></div>
                  <div className="mb-5 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-200/50">
                      <IconComponent className="w-7 h-7 text-blue-600 transition-transform duration-300 group-hover:rotate-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{feature.title}</h3>
                  <p className="text-gray-600 font-medium flex-grow leading-relaxed relative z-10">{feature.description}</p>
                  <div className="mt-5 flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700 cursor-pointer transition-all duration-300 group-hover:gap-3 gap-2 relative z-10">
                    <span>Conocer más</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* --- Visión a Futuro --- */}
      <section id="future-section" className="py-28 px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 text-sm font-medium text-blue-400">
            <Zap className="w-4 h-4" />
            <span>Próximamente</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black mb-6 tracking-tight leading-tight">
            El Futuro es Colaborativo.<br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Y lo estamos construyendo.</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
            Organizar tu información es solo el primer paso. En las próximas fases, 
            Coaxios se convertirá en la primera red de contratistas basada en datos.
          </p>
          <div className="bg-gray-800/80 border border-gray-700 rounded-3xl p-10 max-w-3xl mx-auto backdrop-blur-sm hover:bg-gray-800/90 hover:border-gray-600 transition-all duration-500 shadow-2xl group">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-2 rounded-full text-xs font-bold mb-6 tracking-wide uppercase shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow duration-300">
              Motor de Matchmaking
            </div>
            <p className="text-lg text-gray-200 font-normal leading-relaxed">
              Usa nuestro motor de matchmaking para encontrar al aliado estratégico perfecto para tu próximo 
              consorcio o unión temporal, basándote en experiencia real y complementaria.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Alianzas estratégicas</span>
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Matching inteligente</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* --- CTA Final --- */}
      <section id="cta-section" className="py-28 px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              Deja de Coordinar. <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">Empieza a Liderar.</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Toma el control de tus propuestas, empodera tu rol y dale a tu equipo la estructura para ganar.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10">
              <Button className="text-lg py-4 px-12 shadow-xl" onClick={() => navigate('/registro')}>
                <span className="flex items-center gap-2">
                  Toma el Control - Empieza Gratis
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
              <Button variant="secondary" className="text-lg py-4 px-12">
                <span className="flex items-center gap-2">
                  Agendar Demo
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </span>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Accede desde cualquier lugar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Soporte 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Cancela cuando quieras</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;