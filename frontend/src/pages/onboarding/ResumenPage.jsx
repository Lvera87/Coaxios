import { useState } from 'react';
import { ArrowRight, Edit2, CheckCircle, FileText, Building2, TrendingUp, Sparkles, X } from 'lucide-react';
import ProgressBar from '../../components/onboarding/ProgressBar';

const formatCurrency = (value) => {
  if (!value) return '$ 0';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
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
  domicilio_principal: 'Medellín, Antioquia',
  representante_legal: 'David Alejandro Correa Pérez',
  cedula_rep_legal: '1.123.456.789',
  facultades_rep_legal: 'Hasta 5.000 SMMLV',
  fecha_renov_cc: '2024-03-28',
  fecha_expedicion_cc: '2024-07-15',
  fecha_renov_rup: '2024-04-05',
  indice_liquidez: 1.85,
  indice_endeudamiento: 0.45,
  capital_trabajo: 1250000000,
  rentabilidad_patrimonio: 0.18,
  rentabilidad_activo: 0.11,
  ano_fiscal_reportado: 2023,
};

// Mock data: Biblioteca de Experiencias
const mockExperiencias = [
  {
    id_experiencia: 'exp_001',
    nombre_proyecto: 'Construcción Puente "La Esmeralda"',
    entidad_contratante: 'Instituto Nacional de Vías - INVÍAS',
    valor_final_cop: 3500000000,
    ano_ejecucion_fin: 2022,
    fecha_inicio: '2021-03-01',
    fecha_fin: '2022-11-15',
    codigos_unspsc: [72151000, 72141000],
    descripcion_codigos: ['Construcción de Puentes', 'Movimiento de tierras'],
    cantidades_obra: '1500 m³ de concreto; 500 ton de acero',
    soporte_pdf_id: null,
    estado_verificacion: 'Auto-generado',
  },
  {
    id_experiencia: 'exp_002',
    nombre_proyecto: 'Ampliación Carretera Medellín - Bogotá',
    entidad_contratante: 'INVÍAS - Contratación Central',
    valor_final_cop: 2800000000,
    ano_ejecucion_fin: 2023,
    fecha_inicio: '2021-08-10',
    fecha_fin: '2023-05-20',
    codigos_unspsc: [72141000, 72142000],
    descripcion_codigos: ['Movimiento de tierras', 'Pavimentación'],
    cantidades_obra: '850 km de pavimento asfáltico; 2000 m³ de excavación',
    soporte_pdf_id: 'doc_001.pdf',
    estado_verificacion: 'Verificado',
  },
  {
    id_experiencia: 'exp_003',
    nombre_proyecto: 'Adecuación Pista Aeropuerto Internacional',
    entidad_contratante: 'Aeropuertos del Caribe - AACID',
    valor_final_cop: 1200000000,
    ano_ejecucion_fin: 2020,
    fecha_inicio: '2019-06-15',
    fecha_fin: '2020-12-10',
    codigos_unspsc: [72144000],
    descripcion_codigos: ['Trabajos de terminación'],
    cantidades_obra: '45,000 m² de acabados; sistemas de drenaje especializado',
    soporte_pdf_id: null,
    estado_verificacion: 'Auto-generado',
  },
];

// Componente Tabla 1: Perfil Central
function TablaPerfil({ data, onEdit }) {
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

      {/* Contenido */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sección Información Jurídica */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-200">
              Información Jurídica
            </h3>
            {[
              { label: 'Razón Social', key: 'razon_social', value: data.razon_social },
              { label: 'NIT', key: 'nit', value: data.nit },
              { label: 'Domicilio Principal', key: 'domicilio_principal', value: data.domicilio_principal },
              { label: 'Representante Legal', key: 'representante_legal', value: data.representante_legal },
              { label: 'Cédula Rep. Legal', key: 'cedula_rep_legal', value: data.cedula_rep_legal },
              { label: 'Facultades Rep. Legal', key: 'facultades_rep_legal', value: data.facultades_rep_legal },
            ].map(({ label, key, value }) => (
              <div key={key} className="flex justify-between items-start gap-4 pb-4 border-b border-gray-100">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{label}</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">{value || '-'}</p>
                </div>
                <button
                  onClick={() => onEdit('juridica', key)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Sección Capacidad Financiera */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b-2 border-purple-200">
              Capacidad Financiera (Año Fiscal {data.ano_fiscal_reportado})
            </h3>
            {[
              { label: 'Índice de Liquidez', key: 'indice_liquidez', value: data.indice_liquidez, format: (v) => v.toFixed(2) },
              { label: 'Índice de Endeudamiento', key: 'indice_endeudamiento', value: data.indice_endeudamiento, format: formatPercentage },
              { label: 'Capital de Trabajo', key: 'capital_trabajo', value: data.capital_trabajo, format: formatCurrency },
              { label: 'Rentabilidad Patrimonio (ROE)', key: 'rentabilidad_patrimonio', value: data.rentabilidad_patrimonio, format: formatPercentage },
              { label: 'Rentabilidad Activo (ROA)', key: 'rentabilidad_activo', value: data.rentabilidad_activo, format: formatPercentage },
            ].map(({ label, key, value, format }) => (
              <div key={key} className="flex justify-between items-start gap-4 pb-4 border-b border-gray-100">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{label}</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">{format ? format(value) : value || '-'}</p>
                </div>
                <button
                  onClick={() => onEdit('financiera', key)}
                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Fechas de Documentos */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Documentos de Referencia</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Última renovación C. de C.', date: data.fecha_renov_cc },
              { label: 'Expedición C. de C.', date: data.fecha_expedicion_cc },
              { label: 'Última renovación RUP', date: data.fecha_renov_rup },
            ].map(({ label, date }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 font-medium">{label}</p>
                <p className="text-base font-bold text-gray-900 mt-2">{formatDate(date)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente Tabla 2: Biblioteca de Experiencias
function TablaExperiencias({ experiencias, onEdit }) {
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
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Proyecto</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Entidad</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">UNSPSC</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wide">Valor</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Período</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wide">Estado</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {experiencias.map((exp) => (
              <tr key={exp.id_experiencia} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{exp.nombre_proyecto}</p>
                    <p className="text-xs text-gray-500">{exp.id_experiencia}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{exp.entidad_contratante}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {exp.codigos_unspsc.map((cod) => (
                      <span key={cod} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {cod}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="font-bold text-gray-900">{formatCurrency(exp.valor_final_cop)}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {formatDate(exp.fecha_inicio)} a {formatDate(exp.fecha_fin)}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    exp.estado_verificacion === 'Verificado'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {exp.estado_verificacion === 'Verificado' && <CheckCircle className="w-3 h-3" />}
                    {exp.estado_verificacion}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onEdit('experiencia', exp.id_experiencia)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all inline-flex"
                    title="Editar experiencia"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Modal de edición genérico
function ModalEdicion({ isOpen, title, fields, onSave, onClose }) {
  const [formData, setFormData] = useState(fields);

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
            domicilio_principal: perfilData.domicilio_principal,
            representante_legal: perfilData.representante_legal,
          }
        : {
            indice_liquidez: perfilData.indice_liquidez,
            indice_endeudamiento: perfilData.indice_endeudamiento,
            capital_trabajo: perfilData.capital_trabajo,
            rentabilidad_patrimonio: perfilData.rentabilidad_patrimonio,
            rentabilidad_activo: perfilData.rentabilidad_activo,
          };

      setEditModal({
        isOpen: true,
        section,
        data: fieldsToEdit,
        title: section === 'juridica' ? 'Editar Información Jurídica' : 'Editar Capacidad Financiera',
      });
    } else if (section === 'experiencia') {
      const exp = experienciasData.find(e => e.id_experiencia === key);
      if (exp) {
        setEditModal({
          isOpen: true,
          section,
          data: { ...exp },
          title: `Editar Experiencia: ${exp.nombre_proyecto}`,
        });
      }
    }
  };

  const handleSaveEdit = (updatedData) => {
    if (editModal.section === 'juridica' || editModal.section === 'financiera') {
      setPerfilData(prev => ({ ...prev, ...updatedData }));
    } else if (editModal.section === 'experiencia') {
      setExperienciasData(prev =>
        prev.map(exp => (exp.id_experiencia === updatedData.id_experiencia ? updatedData : exp))
      );
    }
  };

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => {
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
