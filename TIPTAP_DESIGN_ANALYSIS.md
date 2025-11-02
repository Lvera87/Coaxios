# Análisis de Diseño - Tiptap.dev
**Fecha**: 26 de octubre de 2025  
**Analizado con**: Chrome DevTools + Snapshot  
**Referencia**: https://tiptap.dev/

---

## 📊 Resumen Ejecutivo

El sitio de Tiptap presenta un diseño **minimalista, moderno y profesional** con enfoque en:
- ✨ Experiencia visual limpia con mucho whitespace
- 🎯 Jerarquía visual clara
- 🔵 Paleta de colores limitada (blanco, gris, azul)
- 📱 Layout responsivo y fluido
- ♿ Accesibilidad bien implementada

---

## 🎨 Paleta de Colores

### Colores Primarios
- **Blanco**: `#FFFFFF` - Fondo principal
- **Azul Primario**: `#0066FF` o similar - Botones, acentos, links
- **Gris Oscuro**: `#1F2937` o `#111827` - Texto principal
- **Gris Claro**: `#E5E7EB` o `#F3F4F6` - Backgrounds secundarios

### Colores Secundarios
- **Gris Neutral**: Para bordes y dividers
- **Verde/Rojo**: Para states (success, error)
- **Amarillo**: Para warnings

---

## 🏗️ Estructura General de la Página

### 1. **Header/Navigation**
```
├── Logo (left)
├── Main Navigation
│   ├── Features (dropdown)
│   ├── Customers
│   ├── Enterprise
│   ├── Pricing
│   └── Docs
└── Secondary Navigation (right)
    ├── GitHub Star Count (33.1k)
    ├── Contact Sales
    └── Sign Up
```

**Características:**
- Sticky/Fixed (position)
- Minimal styling, mostly transparent
- Links en gris oscuro
- Botones con hover effects sutiles

---

### 2. **Hero Section**
**Headline Principal:**
```
"Build AI-native editors faster 🚀 with production-ready tools"
```

**Elementos:**
- Título h1 grande (48-64px)
- Subtítulo o descripción breve
- Interactive Tabs (Notion-like UI, Simple UI, Headless)
- Embedded iframe con demo interactivo del editor

**Estilo:**
- Fondo blanco
- Texto en gris oscuro
- Emoji integrado en headline
- Tabs con animation smooth

---

### 3. **Customer Logos Carousel**
**Mostrado:**
- Grid de 8-12 logos/empresas
- En blanco y negro o gris
- Carousel automático con scroll
- Logos: Substack, Ahrefs, Storyblok, GitLab, Hebbia, Thomson Reuters, etc.

**Comportamiento:**
- Auto-scroll infinito
- Responsive (1-2-3 columnas según breakpoint)
- Hover effect: slight zoom o brillo

---

### 4. **Tiptap Suite - Features Section**
**Estructura:**
```
Título: "Create your editor with the features you want"
Descripción: "Tiptap is the headless and open source editor framework..."

Tarjetas de Características (3-4):
├── Editor (Open source)
├── Collaboration (Paid - Try for free)
├── Content AI (Paid - Try for free)
└── Documents/Extensions
```

**Estilo de Tarjetas:**
- Fondo blanco con subtle border o shadow
- Padding generoso (24-32px)
- Icon o emoji grande
- Title (h3)
- Description (16-18px)
- "Learn more" link

---

### 5. **Características Destacadas**
Carousel con badges:
- "Modular to expand"
- "Headless"
- "Fully customizable"
- "Scalable to max"
- "Platform or On premises"

---

### 6. **Testimonials/Quotes Section**
**Formato:**
```
Quote: "The flexibility to customize..."
Company Logo: GitLab
Category: "DevSecOps platform"
```

**Estilo:**
- Fondo ligeramente gris
- Blockquote styling
- Company logo pequeño
- Carousel con 3-4 testimonios

---

### 7. **UI Components Section**
**Título:** "Launch faster with Tiptap UI Components"

**Templates mostrados:**
- Notion-like template (Paid)
- Simple editor template (Free)
- Comments template (In development)

**Cada tarjeta:**
- Imagen preview/thumbnail
- Título
- Descripción
- Badge (Free/Paid/In development)
- Button (Preview / More details)

---

### 8. **Release Notes**
**Estructura:**
- Título: "Release notes"
- Carousel horizontal
- Últimas 3-4 releases
- Cada una con:
  - Fecha
  - Título/Headline
  - "All" link

---

### 9. **CTA Final - Developer's Launchpad**
**Diseño:**
- Sección destacada con fondo diferente
- Título: "Developer's launchpad"
- Subtítulo: "Code with clarity..."
- Button: "Documentation"
- Full-width o casi full-width

---

### 10. **Footer**
**Columnas:**
1. **Product**
   - Editor
   - Collaboration
   - Content AI
   - Documents
   - Pricing

2. **Company**
   - Enterprise
   - Blog
   - Contact us

3. **Docs**
   - Editor
   - Hocuspocus
   - Extensions
   - Examples

4. **Resources**
   - Release notes
   - Alternatives
   - Experiments
   - ROI calculator
   - MIT license
   - Security
   - Trust center
   - Pro license

**Bottom Footer:**
- Social media links (GitHub, Discord, Twitter, LinkedIn, Bluesky, YouTube)
- Copyright
- Legal links (Status, Privacy, Terms, Legal notice)
- Security badges (SOC 2, GDPR, Y Combinator)

---

## 📐 Tipografía

### Tamaños
- **H1 (Hero)**: 48-56px, bold/700
- **H2 (Secciones)**: 32-40px, bold/600-700
- **H3 (Subsecciones)**: 24-28px, bold/600
- **Body**: 16px, regular/400
- **Small/Caption**: 12-14px, regular/400
- **Links**: 14-16px, underline on hover

### Fuentes
- **Sans-serif moderno**: Probablemente Inter, System, o similar
- **Consistencia**: Una sola familia tipográfica

---

## 🎯 Espaciado (Whitespace)

### Padding
- **Section padding**: 40-60px top/bottom, 20-32px left/right
- **Card padding**: 24-32px
- **Button padding**: 12-16px x 20-28px

### Margins
- **H1 to text**: 24px gap
- **H2 to content**: 16-20px gap
- **Between sections**: 40-60px

### Gap (Grid/Flex)
- **Card grids**: 16-24px gap
- **List items**: 12-16px gap

---

## 🎨 Componentes Clave

### Botones
**Primario:**
- Fondo azul (`#0066FF`)
- Texto blanco
- Padding: 12px 20px
- Border-radius: 6-8px
- Hover: darker blue o shadow
- Font-weight: 600

**Secundario:**
- Border azul + texto azul
- Background transparente
- Hover: background azul claro

**Tertiary/Text:**
- Solo texto azul
- Hover: underline

### Cards
- Background: blanco
- Border: 1px gris claro O shadow sutil
- Border-radius: 8-12px
- Hover: slight shadow increase, transform scale-105

### Badges
- Background: gris claro o color específico
- Padding: 4-8px x 12-16px
- Border-radius: 20px (pillow/rounded)
- Font-size: 12-14px

### Tabs/Pillars
- Inactive: gris claro background, texto gris
- Active: gris más oscuro o azul, underline o filled
- Hover: smooth transition

---

## 📱 Responsive Design

### Breakpoints (típico Tailwind)
- **Mobile (< 640px)**: 1 columna
- **Tablet (640-1024px)**: 2 columnas
- **Desktop (> 1024px)**: 3-4 columnas

### Ajustes por tamaño
- Font sizes reducen en mobile
- Padding/margin se reducen
- Grid columns se ajustan
- Navigation puede convertirse en hamburger

---

## ✨ Efectos y Animaciones

### Hover Effects
- Slight shadow increase on cards
- Color transition on links (250-300ms)
- Slight scale transform (1.02-1.05)

### Transitions
- Duración: 200-300ms
- Timing: ease-in-out
- Smooth scroll behavior

### Scroll Carousels
- Auto-scroll lento (permanente)
- Manual arrows para navegar
- Fade effects en bordes

---

## 🎬 Elementos Visuales Especiales

### Emojis
- Integrados en headlines
- 🚀, ✨, 🎯, 📊, etc.
- Tamaño: ligeramente más grande que el texto

### Interactive Demo
- Iframe embebido mostrando editor funcional
- Permite interacción en vivo
- Ejemplo de "Notion-like" template

### Carousels/Sliders
- Logos de empresas
- Features highlights
- Testimonials
- Release notes

---

## 🌐 Accesibilidad

- ✅ Semantic HTML (header, nav, main, footer, section)
- ✅ ARIA roles (region roledescription="carousel", etc.)
- ✅ Button y link distinguidos correctamente
- ✅ Color contrast adecuado
- ✅ Focus visible en elementos interactivos
- ✅ Keyboard navigation soportado

---

## 💡 Inspiraciones para Coaxios HomePage

### Adoptar:
1. ✅ Minimalismo y whitespace generoso
2. ✅ Jerarquía visual clara con tamaños grandes
3. ✅ Paleta de colores limitada y coherente
4. ✅ Tarjetas limpias con sutiles efectos hover
5. ✅ Carousels para mostrar casos de uso/clientes
6. ✅ Sections bien separadas con buen spacing
7. ✅ CTA prominentes pero no agresivos
8. ✅ Footer rico en información

### Evitar:
- ❌ Demasiados colores o gradientes agresivos
- ❌ Mucho contenido amontonado
- ❌ Fuentes múltiples o incoherentes
- ❌ Animaciones excesivas o distractivas
- ❌ CTAs por todas partes

---

## 🔧 Stack Técnico Probable

- **CSS Framework**: Tailwind CSS (por estructura y utilities)
- **Tipografía**: Font moderno sans-serif (Inter, System, etc.)
- **Componentes**: React/Next.js o similar
- **Animaciones**: CSS transitions + posiblemente Framer Motion
- **Carousels**: Swiper.js o Embla Carousel

---

## 📋 Estructura HTML Típica

```html
<header>
  <nav><!-- Nav items --></nav>
</header>

<main>
  <section class="hero"><!-- Hero content --></section>
  
  <section class="customers">
    <!-- Logo carousel -->
  </section>
  
  <section class="features">
    <h2>Título</h2>
    <div class="cards"><!-- Feature cards --></div>
  </section>
  
  <section class="testimonials">
    <!-- Carousel de quotes -->
  </section>
  
  <section class="ui-components">
    <!-- UI component templates -->
  </section>
  
  <section class="cta">
    <!-- Call to action -->
  </section>
</main>

<footer>
  <!-- Footer content en columnas -->
</footer>
```

---

## 🎯 Recomendaciones para Coaxios

### 1. Simplificar la HomePage anterior
- Remover los gradientes azules fuertes
- Aumentar el whitespace
- Hacer título más grande y bold

### 2. Crear secciones principales
- **Hero**: Headline impactante + subtítulo + CTA
- **Features**: 3-4 cards con características clave
- **Testimonials/Customers**: Logos o casos de éxito
- **Products/Solutions**: Grid de productos
- **CTA Final**: Sección con "Comenzar ahora"
- **Footer**: Información y links

### 3. Estilo Visual
- Font-size H1: 48-56px
- Colores: Blanco bg, gris oscuro texto, azul acentos
- Cards: Shadow sutil, border-radius 8px
- Buttons: 12px 20px padding, 6px border-radius

### 4. Animations
- Hover cards: shadow + scale-105
- Links: color smooth transition
- Scroll: suave

---

## 📸 Referencias Visuales

El diseño es **clean, professional, y scalable**. Perfecto para SaaS moderno.
Enfatiza claridad sobre complejidad visual.

