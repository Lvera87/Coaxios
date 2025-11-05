import { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Edit2, CheckCircle, FileText, Building2, TrendingUp, Sparkles, X, ChevronDown, Search } from 'lucide-react';
import ProgressBar from '../../components/onboarding/ProgressBar';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

// Formateo para valores en SMMLV (mostramos unidad: SMMLV)
const formatSMMLV = (value) => {
  if (value === undefined || value === null) return '-';
  try {
    return new Intl.NumberFormat('es-CO').format(value) + ' SMMLV';
  } catch (e) {
    return String(value) + ' SMMLV';
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-CO', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

const formatPercentage = (value) => {
  if (!value) return '0%';
  return `${(value * 100).toFixed(2)}%`;
};

// Mock data: Perfil Central
const mockPerfilCentral = {
  razon_social: 'Nexus Ingeniería S.A.S.',
  nit: '9001234567',
  tipo_sociedad: 'Sociedad por Acciones Simplificada',
  duracion_sociedad: 'Indefinida',
  domicilio_principal: 'Medellín, Antioquia',
  representante_legal: 'David Alejandro Correa Pérez',
  rep_legal_suplente: 'Carolina Vélez Gómez',
  cedula_rep_legal: '1.123.456.789',
  facultades_rep_legal: 'Hasta 5.000 SMMLV',
  fecha_renov_cc: '2024-03-27',
  fecha_expedicion_cc_actual: '2024-07-14',
  fecha_renov_rup: '2024-04-04',
  indice_liquidez: 1.85,
  indice_endeudamiento: 0.45,
  capital_trabajo_smmlv: 1250, // en SMMLV
  rentabilidad_patrimonio_roe: 0.18,
  rentabilidad_activo_roa: 0.11,
  ano_fiscal_reportado: 2023,
  tamano_empresa: 'Mediana Empresa',
};

// Mock data: Biblioteca de Experiencias
// Tabla 2: Registro General de Contratos (valores en SMMLV)
const mockExperiencias = [
  // Generado: 50 proyectos de muestra, variados por tipo y sector.
  // Cada objeto sigue la estructura esperada por la UI y los helpers.
  {
    id_rup: 'RUP-001',
    contratante: 'Ministerio de Transporte',
    celebrado_por: 'Consorcio Vial Andino',
    nombre_contratista: 'Consorcio Vial Andino',
    participacion_porcentaje: 60,
    tipo_proyecto: 'Infraestructura',
    objetivo: 'Rehabilitación y reforzamiento de la calzada principal en la vía troncal del departamento, mejorando la capacidad estructural y la seguridad vial.',
    valor_smmlv: 4200,
    ano_fin: 2024,
    fecha_inicio: '2021-02-15',
    fecha_fin: '2024-01-30',
    capacidades: [
      {
        id_capacidad: 'cap_RUP001_01',
        codigo_unspsc: 72151000,
        nombre_actividad: 'Construcción y mantenimiento de vías',
        codigos_detalle: ['11|10|15|00','11|10|16|00','11|10|20|00'],
        id_documento_soporte: 'RUP-001_soporte_vial.pdf',
        estado_detalle: 'Completo y Verificado',
      }
    ],
    id_documento_soporte: 'RUP-001_contrato.pdf',
    estado_verificacion: 'Verificado',
  },
  {
    id_rup: 'RUP-002',
    contratante: 'Alcaldía Mayor de Bogotá - Secretaría de Educación',
    celebrado_por: 'Nexus Ingeniería S.A.S.',
    nombre_contratista: 'Nexus Ingeniería S.A.S.',
    participacion_porcentaje: 100,
    tipo_proyecto: 'Construcción (Educación)',
    objetivo: 'Construcción de obras complementarias y adecuaciones en establecimientos educativos para garantizar accesibilidad y capacidad de servicio.',
    valor_smmlv: 950,
    ano_fin: 2021,
    fecha_inicio: '2019-04-01',
    fecha_fin: '2021-09-30',
    capacidades: [
      {
        id_capacidad: 'cap_RUP002_01',
        codigo_unspsc: 72144000,
        nombre_actividad: 'Trabajos de terminación y acabados',
        codigos_detalle: ['11|12|15|00','11|12|16|00'],
        id_documento_soporte: 'RUP-002_soporte_terminacion.pdf',
        estado_detalle: 'Completo y Verificado',
      }
    ],
    id_documento_soporte: 'RUP-002_contrato.pdf',
    estado_verificacion: 'Verificado',
  },
  {
    id_rup: 'RUP-003',
    contratante: 'Empresas Públicas de Medellín - EPM',
    celebrado_por: 'Constructora Andina S.A.S.',
    nombre_contratista: 'Constructora Andina S.A.S.',
    participacion_porcentaje: 50,
    tipo_proyecto: 'Infraestructura',
    objetivo: 'Rehabilitación de redes hidráulicas y reposición de pavimentos en zona urbana con metodología de mínima perturbación.',
    valor_smmlv: 1800,
    ano_fin: 2022,
    fecha_inicio: '2020-03-10',
    fecha_fin: '2022-07-22',
    capacidades: [
      {
        id_capacidad: 'cap_RUP003_01',
        codigo_unspsc: 30191800,
        nombre_actividad: 'Servicios de rehabilitación de redes',
        codigos_detalle: ['21|05|10|00'],
        id_documento_soporte: null,
        estado_detalle: 'Pendiente',
      }
    ],
    id_documento_soporte: null,
    estado_verificacion: 'Auto-generado',
  },
  // A continuación se generan proyectos de muestra (RUP-004 a RUP-050)
  {
    id_rup: 'RUP-004',
    contratante: 'Aeropuertos de Antioquia',
    celebrado_por: 'Nexus Ingeniería S.A.S.',
    nombre_contratista: 'Nexus Ingeniería S.A.S.',
    participacion_porcentaje: 100,
    tipo_proyecto: 'Mantenimiento aeroportuario',
    objetivo: 'Mantenimiento mayor de pistas y sistemas asociados para garantizar operación segura durante temporada alta.',
    valor_smmlv: 1250,
    ano_fin: 2020,
    fecha_inicio: '2019-01-15',
    fecha_fin: '2020-11-30',
    capacidades: [
      { id_capacidad: 'cap_RUP004_01', codigo_unspsc: 72154000, nombre_actividad: 'Mantenimiento de pistas', codigos_detalle: ['11|15|10|00'], id_documento_soporte: 'RUP-004_soporte.pdf', estado_detalle: 'Completo y Verificado' }
    ],
    id_documento_soporte: 'RUP-004_contrato.pdf',
    estado_verificacion: 'Verificado',
  },
  {
    id_rup: 'RUP-005',
    contratante: 'Ministerio de Tecnologías - MINTIC',
    celebrado_por: 'SoftSolutions S.A.S.',
    nombre_contratista: 'SoftSolutions S.A.S.',
    participacion_porcentaje: 100,
    tipo_proyecto: 'Software',
    objetivo: 'Desarrollo e implementación de plataforma web de gestión documental y expedientes digitales para procesos de contratación pública.',
    valor_smmlv: 450,
    ano_fin: 2023,
    fecha_inicio: '2022-01-10',
    fecha_fin: '2023-12-20',
    capacidades: [
      { id_capacidad: 'cap_RUP005_01', codigo_unspsc: 43231500, nombre_actividad: 'Desarrollo de software a medida', codigos_detalle: ['43|23|15|00'], id_documento_soporte: 'RUP-005_soporte_sw.pdf', estado_detalle: 'Completo y Verificado' }
    ],
    id_documento_soporte: 'RUP-005_contrato.pdf',
    estado_verificacion: 'Verificado',
  },
  {
    id_rup: 'RUP-006',
    contratante: 'Hospital Universitario San José',
    celebrado_por: 'Servicios Médicos Integrales S.A.S.',
    nombre_contratista: 'Servicios Médicos Integrales S.A.S.',
    participacion_porcentaje: 100,
    tipo_proyecto: 'Consultoría',
    objetivo: 'Asesoría técnica para optimización de procesos clínicos y control de infecciones intrahospitalarias.',
    valor_smmlv: 220,
    ano_fin: 2019,
    fecha_inicio: '2018-05-01',
    fecha_fin: '2019-10-30',
    capacidades: [
      { id_capacidad: 'cap_RUP006_01', codigo_unspsc: 86101600, nombre_actividad: 'Asesoría en gestión asistencial', codigos_detalle: ['86|10|16|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }
    ],
    id_documento_soporte: null,
    estado_verificacion: 'Verificado',
  },
  {
    id_rup: 'RUP-007',
    contratante: 'Universidad Nacional de Colombia',
    celebrado_por: 'Consorcio Campus Moderno',
    nombre_contratista: 'Consorcio Campus Moderno',
    participacion_porcentaje: 40,
    tipo_proyecto: 'Infraestructura Universitaria',
    objetivo: 'Construcción de edificio de laboratorios y aulas especializadas con alta demanda de infraestructura técnica.',
    valor_smmlv: 3000,
    ano_fin: 2022,
    fecha_inicio: '2019-09-01',
    fecha_fin: '2022-06-15',
    capacidades: [
      { id_capacidad: 'cap_RUP007_01', codigo_unspsc: 72151000, nombre_actividad: 'Construcción de estructuras', codigos_detalle: ['11|10|15|00'], id_documento_soporte: 'RUP-007_labores.pdf', estado_detalle: 'Completo y Verificado' }
    ],
    id_documento_soporte: 'RUP-007_contrato.pdf',
    estado_verificacion: 'Verificado',
  },
  {
    id_rup: 'RUP-008',
    contratante: 'Gobernación de Antioquia',
    celebrado_por: 'Consorcio Gestión Hídrica',
    nombre_contratista: 'Consorcio Gestión Hídrica',
    participacion_porcentaje: 70,
    tipo_proyecto: 'Hidrosanitario',
    objetivo: 'Instalación y mejora de acueductos veredales para garantizar potabilidad y continuidad del servicio.',
    valor_smmlv: 780,
    ano_fin: 2020,
    fecha_inicio: '2018-11-12',
    fecha_fin: '2020-05-30',
    capacidades: [
      { id_capacidad: 'cap_RUP008_01', codigo_unspsc: 30191800, nombre_actividad: 'Instalación de redes hidráulicas', codigos_detalle: ['21|05|10|00'], id_documento_soporte: 'RUP-008_soporte.pdf', estado_detalle: 'Completo y Verificado' }
    ],
    id_documento_soporte: 'RUP-008_contrato.pdf',
    estado_verificacion: 'Verificado',
  },
  {
    id_rup: 'RUP-009',
    contratante: 'Alcaldía Municipal de Pasto',
    celebrado_por: 'Construcciones del Sur S.A.S.',
    nombre_contratista: 'Construcciones del Sur S.A.S.',
    participacion_porcentaje: 100,
    tipo_proyecto: 'Mantenimiento Urbano',
    objetivo: 'Intervenciones en plazas y corredores peatonales con mobiliario urbano y pavimentos permeables.',
    valor_smmlv: 320,
    ano_fin: 2017,
    fecha_inicio: '2016-02-01',
    fecha_fin: '2017-12-20',
    capacidades: [
      { id_capacidad: 'cap_RUP009_01', codigo_unspsc: 72151500, nombre_actividad: 'Pavimentación y obras públicas', codigos_detalle: ['11|15|15|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }
    ],
    id_documento_soporte: null,
    estado_verificacion: 'Verificado',
  },
  {
    id_rup: 'RUP-010',
    contratante: 'Ministerio de Salud',
    celebrado_por: 'BioServicios S.A.S.',
    nombre_contratista: 'BioServicios S.A.S.',
    participacion_porcentaje: 100,
    tipo_proyecto: 'Suministro y Capacitación',
    objetivo: 'Suministro de equipos biomédicos y capacitación técnica al personal hospitalario para su correcta operación y mantenimiento.',
    valor_smmlv: 210,
    ano_fin: 2018,
    fecha_inicio: '2017-03-15',
    fecha_fin: '2018-11-30',
    capacidades: [
      { id_capacidad: 'cap_RUP010_01', codigo_unspsc: 42171600, nombre_actividad: 'Suministro de equipos médicos', codigos_detalle: ['42|17|16|00'], id_documento_soporte: 'RUP-010_soporte.pdf', estado_detalle: 'Completo y Verificado' }
    ],
    id_documento_soporte: 'RUP-010_contrato.pdf',
    estado_verificacion: 'Verificado',
  },
  // Resto de proyectos (11-50): variedad en tipo, cliente y alcance
  {
    id_rup: 'RUP-011', contratante: 'Alcaldía de Cali', celebrado_por: 'Consorcio Movilidad Cali', nombre_contratista: 'Consorcio Movilidad Cali', participacion_porcentaje: 60, tipo_proyecto: 'Movilidad', objetivo: 'Mejoramiento de corredores viales y señalización urbana.', valor_smmlv: 860, ano_fin: 2021, fecha_inicio: '2019-06-01', fecha_fin: '2021-04-30', capacidades: [{ id_capacidad: 'cap_RUP011_01', codigo_unspsc: 72151000, nombre_actividad: 'Obras viales', codigos_detalle: ['11|10|15|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-012', contratante: 'Instituto Nacional de Vías - INVÍAS', celebrado_por: 'Consorcio Ruta Segura', nombre_contratista: 'Consorcio Ruta Segura', participacion_porcentaje: 30, tipo_proyecto: 'Infraestructura', objetivo: 'Rehabilitación de puente y mejoramiento de terraplén para aumentar vida útil estructural.', valor_smmlv: 2650, ano_fin: 2023, fecha_inicio: '2020-05-10', fecha_fin: '2023-02-28', capacidades: [{ id_capacidad: 'cap_RUP012_01', codigo_unspsc: 72151000, nombre_actividad: 'Construcción de puentes', codigos_detalle: ['11|10|15|00','11|10|18|00'], id_documento_soporte: 'RUP-012_soporte.pdf', estado_detalle: 'Completo y Verificado' }], id_documento_soporte: 'RUP-012_contrato.pdf', estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-013', contratante: 'Empresa de Acueducto y Alcantarillado', celebrado_por: 'Aguas y Soluciones S.A.S.', nombre_contratista: 'Aguas y Soluciones S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Hidrosanitario', objetivo: 'Construcción de planta de tratamiento de aguas residuales con proceso biológico y unidad de desinfección.', valor_smmlv: 1900, ano_fin: 2020, fecha_inicio: '2018-02-01', fecha_fin: '2020-09-30', capacidades: [{ id_capacidad: 'cap_RUP013_01', codigo_unspsc: 30191800, nombre_actividad: 'Plantas de tratamiento', codigos_detalle: ['21|05|20|00'], id_documento_soporte: null, estado_detalle: 'Pendiente' }], id_documento_soporte: null, estado_verificacion: 'Auto-generado'},
  { id_rup: 'RUP-014', contratante: 'Ministerio de Cultura', celebrado_por: 'Gestión Cultural S.A.S.', nombre_contratista: 'Gestión Cultural S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Rehabilitación patrimonial', objetivo: 'Intervención y restauración de inmueble de valor histórico-cultural para uso público.', valor_smmlv: 430, ano_fin: 2016, fecha_inicio: '2015-06-01', fecha_fin: '2016-11-30', capacidades: [{ id_capacidad: 'cap_RUP014_01', codigo_unspsc: 72144500, nombre_actividad: 'Restauración arquitectónica', codigos_detalle: ['11|12|45|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-015', contratante: 'Secretaría de Salud Departamental', celebrado_por: 'BioCapacitaciones Ltda.', nombre_contratista: 'BioCapacitaciones Ltda.', participacion_porcentaje: 100, tipo_proyecto: 'Capacitación', objetivo: 'Programa de capacitación en gestión de riesgos y manejo de emergencias hospitalarias.', valor_smmlv: 95, ano_fin: 2019, fecha_inicio: '2019-01-10', fecha_fin: '2019-12-20', capacidades: [{ id_capacidad: 'cap_RUP015_01', codigo_unspsc: 86101600, nombre_actividad: 'Capacitación y formación', codigos_detalle: ['86|10|16|00'], id_documento_soporte: 'RUP-015_certificado.pdf', estado_detalle: 'Completo y Verificado' }], id_documento_soporte: 'RUP-015_contrato.pdf', estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-016', contratante: 'Corporación Autónoma Regional', celebrado_por: 'Ecosistemas S.A.S.', nombre_contratista: 'Ecosistemas S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Consultoría Ambiental', objetivo: 'Estudios de impacto ambiental y plan de manejo para obras de infraestructura.', valor_smmlv: 140, ano_fin: 2022, fecha_inicio: '2021-05-01', fecha_fin: '2022-09-15', capacidades: [{ id_capacidad: 'cap_RUP016_01', codigo_unspsc: 86101500, nombre_actividad: 'Consultoría ambiental', codigos_detalle: ['86|10|15|00'], id_documento_soporte: null, estado_detalle: 'Pendiente' }], id_documento_soporte: null, estado_verificacion: 'Auto-generado'},
  { id_rup: 'RUP-017', contratante: 'Empresa Privada - AgroIndustrias S.A.', celebrado_por: 'ServiAgro Ltda.', nombre_contratista: 'ServiAgro Ltda.', participacion_porcentaje: 100, tipo_proyecto: 'Mantenimiento Industrial', objetivo: 'Mantenimiento preventivo y correctivo de plantas productivas y sistemas de control.', valor_smmlv: 380, ano_fin: 2018, fecha_inicio: '2017-02-15', fecha_fin: '2018-12-01', capacidades: [{ id_capacidad: 'cap_RUP017_01', codigo_unspsc: 72161500, nombre_actividad: 'Mantenimiento industrial', codigos_detalle: ['12|16|15|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-018', contratante: 'Alcaldía de Barranquilla', celebrado_por: 'Consorcio Obras Caribe', nombre_contratista: 'Consorcio Obras Caribe', participacion_porcentaje: 55, tipo_proyecto: 'Infraestructura', objetivo: 'Intervenciones en muelles y trabajos marítimos para garantizar operatividad portuaria.', valor_smmlv: 2100, ano_fin: 2021, fecha_inicio: '2019-03-01', fecha_fin: '2021-08-30', capacidades: [{ id_capacidad: 'cap_RUP018_01', codigo_unspsc: 72153000, nombre_actividad: 'Obras portuarias', codigos_detalle: ['11|15|30|00'], id_documento_soporte: 'RUP-018_soporte.pdf', estado_detalle: 'Completo y Verificado' }], id_documento_soporte: 'RUP-018_contrato.pdf', estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-019', contratante: 'Ministerio de Educación', celebrado_por: 'EducaSoluciones S.A.S.', nombre_contratista: 'EducaSoluciones S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Software/Educación', objetivo: 'Plataforma de LMS y capacitación a docentes para gestión de contenidos y evaluación.', valor_smmlv: 310, ano_fin: 2020, fecha_inicio: '2019-07-01', fecha_fin: '2020-12-20', capacidades: [{ id_capacidad: 'cap_RUP019_01', codigo_unspsc: 43231500, nombre_actividad: 'Plataformas educativas', codigos_detalle: ['43|23|15|00'], id_documento_soporte: 'RUP-019_soporte.pdf', estado_detalle: 'Completo y Verificado' }], id_documento_soporte: 'RUP-019_contrato.pdf', estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-020', contratante: 'Empresa de Servicios Públicos - EMS', celebrado_por: 'InfraServicios S.A.S.', nombre_contratista: 'InfraServicios S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Redes de Energía', objetivo: 'Rehabilitación y expansión de redes de distribución eléctrica en zonas rurales.', valor_smmlv: 720, ano_fin: 2023, fecha_inicio: '2021-07-01', fecha_fin: '2023-03-15', capacidades: [{ id_capacidad: 'cap_RUP020_01', codigo_unspsc: 26121600, nombre_actividad: 'Servicios eléctricos', codigos_detalle: ['26|12|16|00'], id_documento_soporte: null, estado_detalle: 'Pendiente' }], id_documento_soporte: null, estado_verificacion: 'Auto-generado'},
  { id_rup: 'RUP-021', contratante: 'Alcaldía de Manizales', celebrado_por: 'Consorcio Vial Central', nombre_contratista: 'Consorcio Vial Central', participacion_porcentaje: 45, tipo_proyecto: 'Infraestructura', objetivo: 'Construcción de ciclo-rutas y pavimentos permeables para movilidad sostenible.', valor_smmlv: 560, ano_fin: 2019, fecha_inicio: '2018-01-10', fecha_fin: '2019-12-20', capacidades: [{ id_capacidad: 'cap_RUP021_01', codigo_unspsc: 72151500, nombre_actividad: 'Construcción de pavimentos', codigos_detalle: ['11|15|15|00'], id_documento_soporte: 'RUP-021_soporte.pdf', estado_detalle: 'Completo y Verificado' }], id_documento_soporte: 'RUP-021_contrato.pdf', estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-022', contratante: 'Ministerio de Comercio', celebrado_por: 'Consultoría Mercados S.A.S.', nombre_contratista: 'Consultoría Mercados S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Consultoría', objetivo: 'Estudios de mercado y formulación de políticas para apoyo a microempresas.', valor_smmlv: 85, ano_fin: 2017, fecha_inicio: '2016-04-01', fecha_fin: '2017-10-30', capacidades: [{ id_capacidad: 'cap_RUP022_01', codigo_unspsc: 86101500, nombre_actividad: 'Consultoría de mercados', codigos_detalle: ['86|10|15|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-023', contratante: 'Fuerza Pública - Ejército Nacional', celebrado_por: 'Seguridad y Orden S.A.S.', nombre_contratista: 'Seguridad y Orden S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Mantenimiento', objetivo: 'Intervenciones en infraestructura logística y mejora de hangares.', valor_smmlv: 410, ano_fin: 2018, fecha_inicio: '2017-06-15', fecha_fin: '2018-12-10', capacidades: [{ id_capacidad: 'cap_RUP023_01', codigo_unspsc: 72154000, nombre_actividad: 'Mantenimiento de pistas y hangares', codigos_detalle: ['11|15|40|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-024', contratante: 'Empresa de Transporte Urbano', celebrado_por: 'Movilidad Sostenible S.A.S.', nombre_contratista: 'Movilidad Sostenible S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Software', objetivo: 'Desarrollo de sistema de gestión de flotas y telemetría para optimización de rutas.', valor_smmlv: 270, ano_fin: 2022, fecha_inicio: '2021-02-01', fecha_fin: '2022-10-01', capacidades: [{ id_capacidad: 'cap_RUP024_01', codigo_unspsc: 43231700, nombre_actividad: 'Sistemas de gestión de flotas', codigos_detalle: ['43|23|17|00'], id_documento_soporte: 'RUP-024_soporte.pdf', estado_detalle: 'Completo y Verificado' }], id_documento_soporte: 'RUP-024_contrato.pdf', estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-025', contratante: 'Secretaría de Cultura Municipal', celebrado_por: 'Arte & Patrimonio Ltda.', nombre_contratista: 'Arte & Patrimonio Ltda.', participacion_porcentaje: 100, tipo_proyecto: 'Cultural', objetivo: 'Programas de intervención artística y adecuación de espacios culturales comunitarios.', valor_smmlv: 75, ano_fin: 2016, fecha_inicio: '2015-03-01', fecha_fin: '2016-09-30', capacidades: [{ id_capacidad: 'cap_RUP025_01', codigo_unspsc: 86101800, nombre_actividad: 'Servicios culturales y artísticos', codigos_detalle: ['86|10|18|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-026', contratante: 'Empresa Minera Nacional', celebrado_por: 'MinaSoluciones S.A.S.', nombre_contratista: 'MinaSoluciones S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Mantenimiento Minero', objetivo: 'Mantenimiento de chancadores y sistemas de transporte en planta de beneficio.', valor_smmlv: 660, ano_fin: 2020, fecha_inicio: '2018-08-01', fecha_fin: '2020-06-30', capacidades: [{ id_capacidad: 'cap_RUP026_01', codigo_unspsc: 72161500, nombre_actividad: 'Mantenimiento y montaje industrial', codigos_detalle: ['12|16|15|00'], id_documento_soporte: null, estado_detalle: 'Pendiente' }], id_documento_soporte: null, estado_verificacion: 'Auto-generado'},
  { id_rup: 'RUP-027', contratante: 'Hospital Regional', celebrado_por: 'InfraSalud S.A.S.', nombre_contratista: 'InfraSalud S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Obras Hospitalarias', objetivo: 'Ampliación de áreas de atención y modernización de redes críticas hospitalarias.', valor_smmlv: 1250, ano_fin: 2021, fecha_inicio: '2019-10-01', fecha_fin: '2021-12-31', capacidades: [{ id_capacidad: 'cap_RUP027_01', codigo_unspsc: 72151000, nombre_actividad: 'Construcción de edificios hospitalarios', codigos_detalle: ['11|10|15|00'], id_documento_soporte: 'RUP-027_soporte.pdf', estado_detalle: 'Completo y Verificado' }], id_documento_soporte: 'RUP-027_contrato.pdf', estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-028', contratante: 'Universidad Tecnológica', celebrado_por: 'Laboratorios y Sistemas S.A.S.', nombre_contratista: 'Laboratorios y Sistemas S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Equipamiento', objetivo: 'Suministro e instalación de equipos de laboratorio para investigación académica.', valor_smmlv: 310, ano_fin: 2018, fecha_inicio: '2017-04-15', fecha_fin: '2018-12-10', capacidades: [{ id_capacidad: 'cap_RUP028_01', codigo_unspsc: 56101500, nombre_actividad: 'Suministro de equipos de laboratorio', codigos_detalle: ['56|10|15|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-029', contratante: 'Empresa Portuaria', celebrado_por: 'Puerto y Logística S.A.S.', nombre_contratista: 'Puerto y Logística S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Logística', objetivo: 'Optimización de procesos logísticos en terminal portuaria, incluida señalización y sistemas de control.', valor_smmlv: 1450, ano_fin: 2022, fecha_inicio: '2020-09-01', fecha_fin: '2022-05-31', capacidades: [{ id_capacidad: 'cap_RUP029_01', codigo_unspsc: 56102500, nombre_actividad: 'Sistemas logísticos', codigos_detalle: ['56|10|25|00'], id_documento_soporte: 'RUP-029_soporte.pdf', estado_detalle: 'Completo y Verificado' }], id_documento_soporte: 'RUP-029_contrato.pdf', estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-030', contratante: 'Agencia Nacional de Infraestructura', celebrado_por: 'Consorcio Vial Norte', nombre_contratista: 'Consorcio Vial Norte', participacion_porcentaje: 35, tipo_proyecto: 'Infraestructura', objetivo: 'Intervención integral en corredor estratégico con diseño geotécnico avanzado para estabilización de taludes.', valor_smmlv: 5000, ano_fin: 2025, fecha_inicio: '2022-03-01', fecha_fin: '2025-09-30', capacidades: [{ id_capacidad: 'cap_RUP030_01', codigo_unspsc: 72151000, nombre_actividad: 'Estabilización de taludes y obras complementarias', codigos_detalle: ['11|10|15|00','11|10|19|00'], id_documento_soporte: 'RUP-030_soporte.pdf', estado_detalle: 'En Proceso' }], id_documento_soporte: 'RUP-030_contrato.pdf', estado_verificacion: 'Pendiente Revisión'},
  { id_rup: 'RUP-031', contratante: 'Ministerio de Vivienda', celebrado_por: 'Vivienda Social S.A.S.', nombre_contratista: 'Vivienda Social S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Vivienda', objetivo: 'Construcción de vivienda de interés social con especificaciones térmicas y de eficiencia energética.', valor_smmlv: 2100, ano_fin: 2020, fecha_inicio: '2018-01-10', fecha_fin: '2020-12-20', capacidades: [{ id_capacidad: 'cap_RUP031_01', codigo_unspsc: 72151000, nombre_actividad: 'Construcción de vivienda', codigos_detalle: ['11|10|15|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-032', contratante: 'Secretaría de Movilidad', celebrado_por: 'Gestión Traffic S.A.S.', nombre_contratista: 'Gestión Traffic S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Consultoría Movilidad', objetivo: 'Diseño y modelación de flujo vehicular para implementación de zona de baja velocidad en corredores céntricos.', valor_smmlv: 140, ano_fin: 2019, fecha_inicio: '2018-03-01', fecha_fin: '2019-11-15', capacidades: [{ id_capacidad: 'cap_RUP032_01', codigo_unspsc: 86101500, nombre_actividad: 'Consultoría técnica', codigos_detalle: ['86|10|15|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-033', contratante: 'Ministerio de Agricultura', celebrado_por: 'AgroInnovación S.A.S.', nombre_contratista: 'AgroInnovación S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Capacitación', objetivo: 'Programa de transferencia tecnológica para productores rurales en manejo de cultivos de alto valor.', valor_smmlv: 60, ano_fin: 2017, fecha_inicio: '2017-01-10', fecha_fin: '2017-12-20', capacidades: [{ id_capacidad: 'cap_RUP033_01', codigo_unspsc: 86101600, nombre_actividad: 'Programas de transferencia tecnológica', codigos_detalle: ['86|10|16|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-034', contratante: 'Empresa de Energía', celebrado_por: 'Redes y Potencia S.A.S.', nombre_contratista: 'Redes y Potencia S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Energía', objetivo: 'Instalación de subestación y modernización de tableros de control para mejorar confiabilidad.', valor_smmlv: 980, ano_fin: 2021, fecha_inicio: '2019-11-01', fecha_fin: '2021-10-30', capacidades: [{ id_capacidad: 'cap_RUP034_01', codigo_unspsc: 26121600, nombre_actividad: 'Instalaciones eléctricas', codigos_detalle: ['26|12|16|00'], id_documento_soporte: 'RUP-034_soporte.pdf', estado_detalle: 'Completo y Verificado' }], id_documento_soporte: 'RUP-034_contrato.pdf', estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-035', contratante: 'Corporación del Acueducto', celebrado_por: 'Hidro & Agua S.A.S.', nombre_contratista: 'Hidro & Agua S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Hidrosanitario', objetivo: 'Ampliación de redes de acueducto y construcción de tanques de almacenamiento para suministro continuo.', valor_smmlv: 1450, ano_fin: 2020, fecha_inicio: '2018-06-01', fecha_fin: '2020-08-31', capacidades: [{ id_capacidad: 'cap_RUP035_01', codigo_unspsc: 30191800, nombre_actividad: 'Sistemas de acueducto', codigos_detalle: ['21|05|10|00'], id_documento_soporte: null, estado_detalle: 'Pendiente' }], id_documento_soporte: null, estado_verificacion: 'Auto-generado'},
  { id_rup: 'RUP-036', contratante: 'Alcaldía de Tunja', celebrado_por: 'Construcciones Andinas Ltda.', nombre_contratista: 'Construcciones Andinas Ltda.', participacion_porcentaje: 100, tipo_proyecto: 'Restauración', objetivo: 'Restauración de infraestructura municipal e implementación de sistemas de gestión del riesgo.', valor_smmlv: 260, ano_fin: 2016, fecha_inicio: '2015-02-01', fecha_fin: '2016-12-15', capacidades: [{ id_capacidad: 'cap_RUP036_01', codigo_unspsc: 72144500, nombre_actividad: 'Restauración de infraestructura', codigos_detalle: ['11|12|45|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-037', contratante: 'Ministerio de Defensa', celebrado_por: 'Seguridad Nacional S.A.S.', nombre_contratista: 'Seguridad Nacional S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Obras y Seguridad', objetivo: 'Implementación de medidas de seguridad física y obras civiles en instalaciones estratégicas.', valor_smmlv: 890, ano_fin: 2019, fecha_inicio: '2018-07-01', fecha_fin: '2019-12-31', capacidades: [{ id_capacidad: 'cap_RUP037_01', codigo_unspsc: 72154000, nombre_actividad: 'Obras de seguridad', codigos_detalle: ['11|15|40|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-038', contratante: 'Empresa de Telecomunicaciones', celebrado_por: 'RedesConexión S.A.S.', nombre_contratista: 'RedesConexión S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Telecom', objetivo: 'Despliegue de infraestructura de fibra óptica para conectividad de banda ancha en zonas rurales.', valor_smmlv: 640, ano_fin: 2022, fecha_inicio: '2020-02-01', fecha_fin: '2022-07-31', capacidades: [{ id_capacidad: 'cap_RUP038_01', codigo_unspsc: 26111700, nombre_actividad: 'Instalación de redes de comunicación', codigos_detalle: ['26|11|17|00'], id_documento_soporte: 'RUP-038_soporte.pdf', estado_detalle: 'Completo y Verificado' }], id_documento_soporte: 'RUP-038_contrato.pdf', estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-039', contratante: 'Operador de Transporte', celebrado_por: 'TransInfra S.A.S.', nombre_contratista: 'TransInfra S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Mantenimiento', objetivo: 'Mantenimiento preventivo y reposición de pavimentos en rutas urbanas principales.', valor_smmlv: 340, ano_fin: 2018, fecha_inicio: '2017-03-01', fecha_fin: '2018-11-30', capacidades: [{ id_capacidad: 'cap_RUP039_01', codigo_unspsc: 72151500, nombre_actividad: 'Mantenimiento de pavimentos', codigos_detalle: ['11|15|15|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-040', contratante: 'Ministerio de Ciencia', celebrado_por: 'Innovación y Desarrollo S.A.S.', nombre_contratista: 'Innovación y Desarrollo S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'I+D', objetivo: 'Proyecto de investigación aplicada en materiales de construcción sostenibles.', valor_smmlv: 160, ano_fin: 2020, fecha_inicio: '2019-01-15', fecha_fin: '2020-12-15', capacidades: [{ id_capacidad: 'cap_RUP040_01', codigo_unspsc: 81101500, nombre_actividad: 'Investigación y desarrollo', codigos_detalle: ['81|10|15|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-041', contratante: 'Gobernación del Valle', celebrado_por: 'Consorcio Salud Valle', nombre_contratista: 'Consorcio Salud Valle', participacion_porcentaje: 50, tipo_proyecto: 'Salud Pública', objetivo: 'Implementación de unidad móvil de atención primaria y campañas de vacunación en zonas rurales.', valor_smmlv: 290, ano_fin: 2017, fecha_inicio: '2016-05-01', fecha_fin: '2017-12-20', capacidades: [{ id_capacidad: 'cap_RUP041_01', codigo_unspsc: 86101600, nombre_actividad: 'Servicios de salud móvil', codigos_detalle: ['86|10|16|00'], id_documento_soporte: 'RUP-041_soporte.pdf', estado_detalle: 'Completo y Verificado' }], id_documento_soporte: 'RUP-041_contrato.pdf', estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-042', contratante: 'Ministerio de Ambiente', celebrado_por: 'Gestión Verde S.A.S.', nombre_contratista: 'Gestión Verde S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Reforestación', objetivo: 'Programa de reforestación y protección de cuencas hidrográficas con indicadores de seguimiento técnico.', valor_smmlv: 130, ano_fin: 2018, fecha_inicio: '2017-02-01', fecha_fin: '2018-11-30', capacidades: [{ id_capacidad: 'cap_RUP042_01', codigo_unspsc: 86101500, nombre_actividad: 'Programas de reforestación', codigos_detalle: ['86|10|15|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-043', contratante: 'Alcaldía de Ibagué', celebrado_por: 'InfraIbagué S.A.S.', nombre_contratista: 'InfraIbagué S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Obras Públicas', objetivo: 'Construcción de ciclo-infraestructura y corredores peatonales con criterios de inclusión.', valor_smmlv: 470, ano_fin: 2019, fecha_inicio: '2018-03-01', fecha_fin: '2019-10-31', capacidades: [{ id_capacidad: 'cap_RUP043_01', codigo_unspsc: 72151500, nombre_actividad: 'Obras peatonales', codigos_detalle: ['11|15|15|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-044', contratante: 'Ministerio de Transporte', celebrado_por: 'Consorcio Puentes del Norte', nombre_contratista: 'Consorcio Puentes del Norte', participacion_porcentaje: 40, tipo_proyecto: 'Infraestructura', objetivo: 'Diseño y construcción de puente vehicular con criterios sísmicos y optimización estructural.', valor_smmlv: 3750, ano_fin: 2024, fecha_inicio: '2021-05-01', fecha_fin: '2024-03-31', capacidades: [{ id_capacidad: 'cap_RUP044_01', codigo_unspsc: 72151000, nombre_actividad: 'Diseño y construcción de puentes', codigos_detalle: ['11|10|15|00','11|10|17|00'], id_documento_soporte: 'RUP-044_soporte.pdf', estado_detalle: 'En Proceso' }], id_documento_soporte: 'RUP-044_contrato.pdf', estado_verificacion: 'Pendiente Revisión'},
  { id_rup: 'RUP-045', contratante: 'Agencia de Desarrollo Rural', celebrado_por: 'AgroDesarrollo S.A.S.', nombre_contratista: 'AgroDesarrollo S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Agrícola', objetivo: 'Programas de riego tecnificado y acompañamiento productivo para comunidades rurales.', valor_smmlv: 220, ano_fin: 2020, fecha_inicio: '2019-02-01', fecha_fin: '2020-12-15', capacidades: [{ id_capacidad: 'cap_RUP045_01', codigo_unspsc: 86101700, nombre_actividad: 'Asesoría agrícola', codigos_detalle: ['86|10|17|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-046', contratante: 'Instituto Nacional de Tránsito', celebrado_por: 'Seguridad Vial Ltda.', nombre_contratista: 'Seguridad Vial Ltda.', participacion_porcentaje: 100, tipo_proyecto: 'Capacitación', objetivo: 'Capacitación a conductores y funcionarios en protocolos de seguridad vial y gestión de flotas.', valor_smmlv: 55, ano_fin: 2016, fecha_inicio: '2016-01-10', fecha_fin: '2016-12-20', capacidades: [{ id_capacidad: 'cap_RUP046_01', codigo_unspsc: 86101600, nombre_actividad: 'Capacitación y formación', codigos_detalle: ['86|10|16|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-047', contratante: 'Gobernación de Cundinamarca', celebrado_por: 'InfraCundi S.A.S.', nombre_contratista: 'InfraCundi S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Infraestructura', objetivo: 'Mejoramiento de drenajes urbanos y construcción de obras de mitigación de riesgo.', valor_smmlv: 980, ano_fin: 2021, fecha_inicio: '2019-05-01', fecha_fin: '2021-09-30', capacidades: [{ id_capacidad: 'cap_RUP047_01', codigo_unspsc: 72151500, nombre_actividad: 'Obras de drenaje', codigos_detalle: ['11|15|15|00'], id_documento_soporte: 'RUP-047_soporte.pdf', estado_detalle: 'Completo y Verificado' }], id_documento_soporte: 'RUP-047_contrato.pdf', estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-048', contratante: 'Empresa de Transporte Intermunicipal', celebrado_por: 'TransBogotá S.A.S.', nombre_contratista: 'TransBogotá S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Software', objetivo: 'Plataforma de venta y control de pasajes con integración a medios de pago y telemetría.', valor_smmlv: 360, ano_fin: 2022, fecha_inicio: '2021-06-01', fecha_fin: '2022-12-01', capacidades: [{ id_capacidad: 'cap_RUP048_01', codigo_unspsc: 43231500, nombre_actividad: 'Desarrollo de aplicaciones', codigos_detalle: ['43|23|15|00'], id_documento_soporte: 'RUP-048_soporte.pdf', estado_detalle: 'Completo y Verificado' }], id_documento_soporte: 'RUP-048_contrato.pdf', estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-049', contratante: 'Servicio Nacional de Aprendizaje - SENA', celebrado_por: 'Formación y Talento S.A.S.', nombre_contratista: 'Formación y Talento S.A.S.', participacion_porcentaje: 100, tipo_proyecto: 'Capacitación', objetivo: 'Programas de formación técnico-profesional para jóvenes del sector construcción.', valor_smmlv: 120, ano_fin: 2019, fecha_inicio: '2018-04-01', fecha_fin: '2019-11-30', capacidades: [{ id_capacidad: 'cap_RUP049_01', codigo_unspsc: 86101600, nombre_actividad: 'Capacitación técnica', codigos_detalle: ['86|10|16|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'},
  { id_rup: 'RUP-050', contratante: 'Ministerio de Comercio', celebrado_por: 'Desarrollo PYME Ltda.', nombre_contratista: 'Desarrollo PYME Ltda.', participacion_porcentaje: 100, tipo_proyecto: 'Consultoría', objetivo: 'Asesoría integral para internacionalización de pymes con diagnóstico, plan de acción y acompañamiento.', valor_smmlv: 130, ano_fin: 2018, fecha_inicio: '2017-05-01', fecha_fin: '2018-12-01', capacidades: [{ id_capacidad: 'cap_RUP050_01', codigo_unspsc: 86101500, nombre_actividad: 'Consultoría estratégica', codigos_detalle: ['86|10|15|00'], id_documento_soporte: null, estado_detalle: 'Completo y Verificado' }], id_documento_soporte: null, estado_verificacion: 'Verificado'}
];

// Nota: las capacidades (UNSPSC) se han movido dentro de cada experiencia en `mockExperiencias`.

// Componente Tabla 1: Perfil Central (mejorado)
function TablaPerfil({ data, onEdit }) {
  const [activeTab, setActiveTab] = useState('juridica');

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Perfil Central de la Empresa</h2>
        </div>
        <p className="text-blue-100 text-sm">Información jurídica y financiera consolidada</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex px-8">
          <button
            onClick={() => setActiveTab('juridica')}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'juridica'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Información Jurídica
          </button>
          <button
            onClick={() => setActiveTab('financiera')}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'financiera'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Capacidad Financiera
          </button>
          <button
            onClick={() => setActiveTab('documentos')}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'documentos'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Documentos
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-8">
        {/* Información Jurídica */}
        {activeTab === 'juridica' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {[
              { label: 'Razón Social', key: 'razon_social', value: data.razon_social },
              { label: 'NIT', key: 'nit', value: data.nit },
              { label: 'Tipo Sociedad', key: 'tipo_sociedad', value: data.tipo_sociedad },
              { label: 'Duración Sociedad', key: 'duracion_sociedad', value: data.duracion_sociedad },
              { label: 'Domicilio Principal', key: 'domicilio_principal', value: data.domicilio_principal },
              { label: 'Representante Legal', key: 'representante_legal', value: data.representante_legal },
              { label: 'Representante Legal Suplente', key: 'rep_legal_suplente', value: data.rep_legal_suplente },
              { label: 'Cédula Rep. Legal', key: 'cedula_rep_legal', value: data.cedula_rep_legal },
              { label: 'Facultades Rep. Legal', key: 'facultades_rep_legal', value: data.facultades_rep_legal },
            ].map(({ label, key, value }) => (
              <div key={key} className="group bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 hover:shadow-md transition-all">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-medium mb-1">{label}</p>
                    <p className="text-base font-semibold text-gray-900">{value || '-'}</p>
                  </div>
                  <button
                    onClick={() => onEdit('juridica', key)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Capacidad Financiera */}
        {activeTab === 'financiera' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-xl border border-purple-100 mb-4">
              <p className="text-sm text-purple-600 font-semibold">Año Fiscal: {data.ano_fiscal_reportado}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Tamaño Empresa', key: 'tamano_empresa', value: data.tamano_empresa },
                { label: 'Índice de Liquidez', key: 'indice_liquidez', value: data.indice_liquidez, format: (v) => v.toFixed(2) },
                { label: 'Índice de Endeudamiento', key: 'indice_endeudamiento', value: data.indice_endeudamiento, format: formatPercentage },
                { label: 'Capital de Trabajo (SMMLV)', key: 'capital_trabajo_smmlv', value: data.capital_trabajo_smmlv, format: formatSMMLV },
                { label: 'Rentabilidad Patrimonio (ROE)', key: 'rentabilidad_patrimonio_roe', value: data.rentabilidad_patrimonio_roe, format: formatPercentage },
                { label: 'Rentabilidad Activo (ROA)', key: 'rentabilidad_activo_roa', value: data.rentabilidad_activo_roa, format: formatPercentage },
              ].map(({ label, key, value, format }) => (
                <div key={key} className="group bg-gradient-to-br from-purple-50 to-white p-4 rounded-xl border border-purple-100 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 font-medium mb-1">{label}</p>
                      <p className="text-base font-semibold text-gray-900">{format ? format(value) : value || '-'}</p>
                    </div>
                    <button
                      onClick={() => onEdit('financiera', key)}
                      className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documentos de Referencia */}
        {activeTab === 'documentos' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {[
              { label: 'Última renovación C. de C.', date: data.fecha_renov_cc, icon: '📄' },
              { label: 'Expedición C. de C. (último certificado)', date: data.fecha_expedicion_cc_actual, icon: '📋' },
              { label: 'Última renovación RUP', date: data.fecha_renov_rup, icon: '📑' },
            ].map(({ label, date, icon }) => (
              <div key={label} className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{icon}</div>
                <p className="text-sm text-gray-600 font-medium mb-2">{label}</p>
                <p className="text-lg font-bold text-gray-900">{formatDate(date)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Nota: la tabla de capacidades fue removida. Las capacidades (UNSPSC) ahora se muestran dentro de la Tabla de Experiencias.

// Componente Tabla 2: Biblioteca de Experiencias (con TanStack Table)
function TablaExperiencias({ experiencias, onEdit }) {
  const [expandedIds, setExpandedIds] = useState({});

  const toggleExpanded = (id) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id_rup',
        header: 'Contrato (RUP)',
        cell: info => <p className="font-semibold text-gray-900 text-sm">{info.getValue()}</p>,
      },
      {
        accessorKey: 'contratante',
        header: 'Entidad',
        cell: info => <span className="text-sm text-gray-700">{info.getValue()}</span>,
      },
      {
        accessorKey: 'nombre_contratista',
        header: 'Contratista',
        cell: info => <span className="text-sm text-gray-700">{info.getValue() || '-'}</span>,
      },
      {
        accessorKey: 'participacion_porcentaje',
        header: 'Participación',
        cell: info => <span className="text-sm text-gray-700">{info.getValue() ? `${info.getValue()}%` : '-'}</span>,
      },
      {
        accessorKey: 'valor_smmlv',
        header: 'Valor (SMMLV)',
        cell: info => <p className="font-bold text-gray-900">{formatSMMLV(info.getValue())}</p>,
      },
      {
        id: 'periodo',
        header: 'Período',
        accessorFn: row => `${row.fecha_inicio} - ${row.fecha_fin}`,
        cell: info => (
          <span className="text-sm text-gray-700">
            {formatDate(info.row.original.fecha_inicio)} a {formatDate(info.row.original.fecha_fin)}
          </span>
        ),
      },
      {
        id: 'acciones',
        header: 'Acciones',
        cell: info => (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => toggleExpanded(info.row.original.id_rup)}
              className={`p-2 rounded-lg transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                expandedIds[info.row.original.id_rup]
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-purple-50'
              }`}
              title={expandedIds[info.row.original.id_rup] ? 'Ocultar códigos UNSPSC' : 'Ver códigos UNSPSC'}
            >
              <ChevronDown className={`w-4 h-4 transform transition-transform ${expandedIds[info.row.original.id_rup] ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => onEdit('experiencia', info.row.original.id_rup)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all inline-flex"
              title="Editar experiencia"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        ),
      },
    ],
    [expandedIds, onEdit]
  );

  const table = useReactTable({
    data: experiencias,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Biblioteca de Experiencias Acreditadas</h2>
        </div>
        <p className="text-purple-100 text-sm">Contratos ejecutados y certificados ({experiencias.length})</p>
      </div>

      {/* Tabla responsiva */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className={`px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wide ${
                      header.column.id === 'valor_smmlv' || header.column.id === 'acciones' ? 'text-center' : 'text-left'
                    } ${header.column.getCanSort() ? 'cursor-pointer select-none hover:bg-gray-100' : ''}`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <>
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className={`px-6 py-4 ${
                        cell.column.id === 'valor_smmlv' ? 'text-right' : cell.column.id === 'acciones' ? 'text-center' : ''
                      }`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>

                {/* Fila expandida con capacidades */}
                {row.original.capacidades && row.original.capacidades.length > 0 && expandedIds[row.original.id_rup] && (
                  <tr key={`caps-${row.original.id_rup}`} className="bg-gray-50">
                    <td colSpan={7} className="px-6 py-4">
                      <div className="space-y-3">
                        {row.original.capacidades.map((cap) => (
                          <div key={cap.id_capacidad} className="bg-white p-3 rounded-lg shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <p className="text-sm font-semibold">{cap.nombre_actividad}</p>
                                <p className="text-xs text-gray-500 mb-2">Soporte: {cap.id_documento_soporte || '—'}</p>

                                {/* Grid de códigos segmentados */}
                                {cap.codigos_detalle && cap.codigos_detalle.length > 0 && (
                                  <div className="grid grid-cols-3 gap-2">
                                    {cap.codigos_detalle.map((cd, idx) => (
                                      <div key={idx} className="px-2 py-1 border rounded-lg bg-gray-50 text-sm text-gray-700 text-center">
                                        {cd}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="text-xs font-medium text-gray-700">{cap.estado_detalle}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="px-8 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Mostrando {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} a{' '}
            {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, experiencias.length)} de{' '}
            {experiencias.length} registros
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {'<<'}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {'<'}
            </button>
            <span className="px-3 py-2 text-sm text-gray-700">
              Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {'>'}
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {'>>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal de edición genérico
function ModalEdicion({ isOpen, title, fields, onSave, onClose }) {
  const [formData, setFormData] = useState(fields);

  useEffect(() => {
    setFormData(fields || {});
  }, [fields]);

  if (!isOpen) return null;

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl animate-in slide-in-from-bottom-4 duration-300 mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <div className="space-y-4 mb-6">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                {key.replace(/_/g, ' ')}
              </label>
              <input
                type="text"
                value={value || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          ))}
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:shadow-lg transition-all"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResumenPage() {
  const [perfilData, setPerfilData] = useState(mockPerfilCentral);
  const [experienciasData, setExperienciasData] = useState(mockExperiencias);
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, section: null, data: null, title: '' });

  const handleEdit = (section, key) => {
    if (section === 'juridica' || section === 'financiera') {
      const fieldsToEdit = section === 'juridica'
        ? {
            razon_social: perfilData.razon_social,
            nit: perfilData.nit,
            tipo_sociedad: perfilData.tipo_sociedad,
            duracion_sociedad: perfilData.duracion_sociedad,
            domicilio_principal: perfilData.domicilio_principal,
            representante_legal: perfilData.representante_legal,
            rep_legal_suplente: perfilData.rep_legal_suplente,
          }
        : {
            ano_fiscal_reportado: perfilData.ano_fiscal_reportado,
            tamano_empresa: perfilData.tamano_empresa,
            indice_liquidez: perfilData.indice_liquidez,
            indice_endeudamiento: perfilData.indice_endeudamiento,
            capital_trabajo_smmlv: perfilData.capital_trabajo_smmlv,
            rentabilidad_patrimonio_roe: perfilData.rentabilidad_patrimonio_roe,
            rentabilidad_activo_roa: perfilData.rentabilidad_activo_roa,
          };

      setEditModal({
        isOpen: true,
        section,
        data: fieldsToEdit,
        title: section === 'juridica' ? 'Editar Información Jurídica' : 'Editar Capacidad Financiera',
      });
    } else if (section === 'experiencia') {
      const exp = experienciasData.find(e => e.id_rup === key);
      if (exp) {
        setEditModal({
          isOpen: true,
          section,
          data: { ...exp },
          title: `Editar Experiencia: ${exp.id_rup}`,
        });
      }
    }
  };

  const handleSaveEdit = (updatedData) => {
    if (editModal.section === 'juridica' || editModal.section === 'financiera') {
      setPerfilData(prev => ({ ...prev, ...updatedData }));
    } else if (editModal.section === 'experiencia') {
      setExperienciasData(prev =>
        prev.map(exp => (exp.id_rup === updatedData.id_rup ? updatedData : exp))
      );
    }
  };

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        // Guardar las experiencias en sessionStorage para que la página de Certificaciones las consuma
        sessionStorage.setItem('onboarding_experiencias', JSON.stringify(experienciasData));
      } catch (e) {
        // Si falla el almacenamiento, continuar sin persistencia
        console.warn('No se pudo guardar experiencias en sessionStorage', e);
      }
      window.location.href = '/onboarding/certificaciones';
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <ProgressBar currentStep={2} totalSteps={3} stepTitle="Resumen" />

      <div className="flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-6xl space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-500/30 transform hover:scale-105 transition-transform duration-300">
                  <Sparkles className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-3">
              Resumen de tu <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Perfil Empresarial</span>
            </h1>
            <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
              Revisa y edita la información consolidada de tu empresa. Todos los campos son editables.
            </p>
          </div>

          {/* Tabla 1: Perfil Central */}
          <TablaPerfil data={perfilData} onEdit={handleEdit} />

          {/* Tabla 2: Experiencias */}
          <TablaExperiencias experiencias={experienciasData} onEdit={handleEdit} />

          {/* Botón Continuar */}
          <div className="flex justify-center mt-12">
            <button
              onClick={handleContinue}
              disabled={loading}
              className={`px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg ${
                !loading
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:shadow-2xl hover:shadow-purple-600/40 hover:-translate-y-1 active:translate-y-0'
                  : 'bg-gray-300 cursor-not-allowed shadow-none'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <span>Continuar a Certificaciones</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      {editModal.isOpen && (
        <ModalEdicion
          isOpen={editModal.isOpen}
          title={editModal.title}
          fields={editModal.data}
          onSave={handleSaveEdit}
          onClose={() => setEditModal({ isOpen: false, section: null, data: null, title: '' })}
        />
      )}
    </div>
  );
}
