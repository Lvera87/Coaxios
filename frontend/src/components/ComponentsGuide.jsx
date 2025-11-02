import React from 'react';

/**
 * Guía de Componentes Reutilizables para Coaxios
 * Basada en el análisis de tiptap.dev
 * Fecha: 26 de octubre de 2025
 */

// ============================================================================
// COMPONENTES DE BOTONES
// ============================================================================

export const ButtonPrimary = ({ children, onClick, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);

export const ButtonSecondary = ({ children, onClick, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-8 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);

export const ButtonText = ({ children, onClick, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="text-blue-600 font-semibold hover:underline transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);

// ============================================================================
// COMPONENTES DE TARJETAS
// ============================================================================

export const FeatureCard = ({ icon, title, description, hover = true }) => (
  <div className={`p-6 border border-gray-200 rounded-lg transition-all duration-300 ${hover ? 'hover:shadow-lg hover:border-blue-300' : ''}`}>
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const BenefitItem = ({ icon, title, description }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white font-bold">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

// ============================================================================
// COMPONENTES DE SECCIONES
// ============================================================================

export const SectionHeader = ({ title, subtitle, maxWidth = 'max-w-2xl' }) => (
  <div className="text-center mb-16">
    <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
    {subtitle && (
      <p className={`text-xl text-gray-600 ${maxWidth} mx-auto`}>
        {subtitle}
      </p>
    )}
  </div>
);

export const HeroSection = ({ title, subtitle, primaryCTA, secondaryCTA, maxWidth = 'max-w-4xl' }) => (
  <section className="py-20 px-4 sm:px-6 lg:px-8">
    <div className={`${maxWidth} mx-auto text-center`}>
      <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {primaryCTA && (
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
            {primaryCTA}
          </button>
        )}
        {secondaryCTA && (
          <button className="px-8 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 hover:shadow-md transition-all duration-300">
            {secondaryCTA}
          </button>
        )}
      </div>
    </div>
  </section>
);

export const CTASection = ({ title, subtitle, primaryCTA, secondaryCTA, fullWidth = false }) => (
  <section className={`py-20 px-4 sm:px-6 lg:px-8 ${fullWidth ? '' : ''}`}>
    <div className={`${fullWidth ? '' : 'max-w-4xl mx-auto'} text-center`}>
      <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      {subtitle && (
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {primaryCTA && (
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300 text-lg">
            {primaryCTA}
          </button>
        )}
        {secondaryCTA && (
          <button className="px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 text-lg">
            {secondaryCTA}
          </button>
        )}
      </div>
    </div>
  </section>
);

// ============================================================================
// COMPONENTES DE GRILLAS
// ============================================================================

export const FeatureGrid = ({ children, columns = 4 }) => {
  const colMap = {
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${colMap[columns]} gap-6`}>
      {children}
    </div>
  );
};

export const BenefitGrid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    {children}
  </div>
);

// ============================================================================
// COMPONENTES DE DIVISORES
// ============================================================================

export const Divider = () => (
  <div className="border-t border-gray-200"></div>
);

export const SectionWrapper = ({ children, bgColor = 'white', hasTop = true, hasBottom = true }) => {
  const bgMap = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900',
  };

  return (
    <>
      {hasTop && <Divider />}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${bgMap[bgColor]}`}>
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </section>
      {hasBottom && <Divider />}
    </>
  );
};

// ============================================================================
// COMPONENTES DE CONTENEDOR
// ============================================================================

export const Container = ({ children, maxWidth = 'max-w-6xl' }) => (
  <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
    {children}
  </div>
);

// ============================================================================
// COMPONENTES DE TIPOGRAFÍA
// ============================================================================

export const Heading1 = ({ children, className = '' }) => (
  <h1 className={`text-5xl sm:text-6xl font-bold text-gray-900 leading-tight ${className}`}>
    {children}
  </h1>
);

export const Heading2 = ({ children, className = '' }) => (
  <h2 className={`text-4xl font-bold text-gray-900 ${className}`}>
    {children}
  </h2>
);

export const Heading3 = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

export const Paragraph = ({ children, size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'text-sm text-gray-600',
    md: 'text-base text-gray-600',
    lg: 'text-lg text-gray-600',
    xl: 'text-xl text-gray-600',
  };

  return (
    <p className={`${sizeMap[size]} ${className}`}>
      {children}
    </p>
  );
};

// ============================================================================
// COMPONENTES DE ICONO CON BADGE
// ============================================================================

export const Badge = ({ children, variant = 'primary' }) => {
  const variantMap = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${variantMap[variant]}`}>
      {children}
    </span>
  );
};

// ============================================================================
// EJEMPLO DE USO
// ============================================================================

/*
import {
  ButtonPrimary,
  ButtonSecondary,
  FeatureCard,
  FeatureGrid,
  SectionHeader,
  HeroSection,
  CTASection,
  SectionWrapper,
  Container,
  Divider,
  BenefitItem,
  BenefitGrid,
} from './ComponentsGuide.jsx';

export default function Example() {
  return (
    <>
      <HeroSection
        title="Gestión integrada para tus proyectos 🚀"
        subtitle="Coaxios es una plataforma moderna..."
        primaryCTA="Comenzar ahora"
        secondaryCTA="Ver documentación"
      />

      <SectionWrapper bgColor="white">
        <SectionHeader title="Características principales" />
        <FeatureGrid columns={4}>
          <FeatureCard icon="⚡" title="Rendimiento" description="..." />
          <FeatureCard icon="🔒" title="Seguridad" description="..." />
        </FeatureGrid>
      </SectionWrapper>

      <SectionWrapper bgColor="gray">
        <SectionHeader title="¿Por qué elegir Coaxios?" />
        <BenefitGrid>
          <BenefitItem icon="✓" title="Fácil de usar" description="..." />
          <BenefitItem icon="✓" title="Escalable" description="..." />
        </BenefitGrid>
      </SectionWrapper>

      <CTASection
        title="¿Listo para comenzar?"
        subtitle="Únete a equipos..."
        primaryCTA="Crear cuenta gratis"
        secondaryCTA="Contactar ventas"
      />
    </>
  );
}
*/
