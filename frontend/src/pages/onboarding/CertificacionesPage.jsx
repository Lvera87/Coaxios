import { useState } from 'react';
import { ArrowRight, Upload, CheckCircle, FileText, Award, X, Trash2, Sparkles, Loader2 } from 'lucide-react';
import ProgressBar from '../../components/onboarding/ProgressBar';
import FileUploadCard from '../../components/onboarding/FileUploadCard';

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

// Mock data: Biblioteca de Experiencias con certificaciones
const mockExperienciasConCertificaciones = [
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
    certificaciones: [], // Array vacío para agregar archivos
    estado_certificacion: 'Pendiente',
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
    certificaciones: [
      { id: 'cert_001', nombre: 'Acta_Liquidacion_2023.pdf', tamaño: '2.4 MB', fecha_subida: '2024-01-15' }
    ],
    estado_certificacion: 'Certificado',
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
    certificaciones: [],
    estado_certificacion: 'Pendiente',
  },
];

// Modal para agregar certificación
function ModalAgregarCertificacion({ isOpen, experienciaId, onUpload, onClose }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      setUploading(true);
      setTimeout(() => {
        onUpload(experienciaId, file);
        setFile(null);
        setUploading(false);
        onClose();
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl animate-in slide-in-from-bottom-4 duration-300 mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Agregar Certificación</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Sube el PDF o imagen que certifica la ejecución de esta experiencia (Acta de liquidación, certificado, etc.)
        </p>

        {/* File Upload */}
        <div className="mb-6">
          <FileUploadCard
            title="Certificación"
            acceptedFormats=".pdf,image/*"
            onFileSelect={handleFileSelect}
            required={false}
            isProcessing={uploading}
          />
        </div>

        {/* Info */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-800 font-medium">
            ℹ️ El documento se vinculará a toda la experiencia. Puedes subir múltiples certificaciones.
          </p>
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
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              file && !uploading
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Agregar Certificación
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Fila de experiencia con certificaciones
function FilaExperiencia({ experiencia, onAgregarCertificacion, onEliminarCertificacion }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow mb-4">
      {/* Header de la fila */}
      <div className="p-6 cursor-pointer" onClick={() => setExpandido(!expandido)}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-gray-900">{experiencia.nombre_proyecto}</h3>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                experiencia.estado_certificacion === 'Certificado'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {experiencia.estado_certificacion === 'Certificado' && <CheckCircle className="w-3 h-3" />}
                {experiencia.estado_certificacion}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{experiencia.entidad_contratante}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500 font-medium">Valor</p>
                <p className="text-sm font-bold text-gray-900">{formatCurrency(experiencia.valor_final_cop)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Período</p>
                <p className="text-sm font-bold text-gray-900">{formatDate(experiencia.fecha_inicio)} - {formatDate(experiencia.fecha_fin)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">UNSPSC</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {experiencia.codigos_unspsc.slice(0, 2).map(cod => (
                    <span key={cod} className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {cod}
                    </span>
                  ))}
                  {experiencia.codigos_unspsc.length > 2 && (
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      +{experiencia.codigos_unspsc.length - 2}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Certificaciones</p>
                <p className="text-sm font-bold text-gray-900">{experiencia.certificaciones.length} archivo(s)</p>
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpandido(!expandido);
            }}
            className="mt-2 p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-all"
          >
            <FileText className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Contenido expandido */}
      {expandido && (
        <div className="border-t border-gray-200 bg-gray-50 p-6 animate-in slide-in-from-top-2 duration-300">
          {/* Certificaciones existentes */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-900 mb-3">Certificaciones Vinculadas</h4>
            {experiencia.certificaciones.length > 0 ? (
              <div className="space-y-2">
                {experiencia.certificaciones.map(cert => (
                  <div key={cert.id} className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{cert.nombre}</p>
                        <p className="text-xs text-gray-500">{cert.tamaño} • {formatDate(cert.fecha_subida)}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEliminarCertificacion(experiencia.id_experiencia, cert.id);
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all ml-2"
                      title="Eliminar certificación"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-4 border border-dashed border-gray-300">
                <p className="text-sm text-gray-500 text-center">No hay certificaciones vinculadas aún</p>
              </div>
            )}
          </div>

          {/* Botón agregar */}
          <button
            onClick={() => onAgregarCertificacion(experiencia.id_experiencia)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Agregar Certificación
          </button>
        </div>
      )}
    </div>
  );
}

export default function CertificacionesPage() {
  const [experiencias, setExperiencias] = useState(mockExperienciasConCertificaciones);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, experienciaId: null });

  const handleAgregarCertificacion = (experienciaId) => {
    setModalState({ isOpen: true, experienciaId });
  };

  const handleUploadCertificacion = (experienciaId, file) => {
    const newCert = {
      id: `cert_${Date.now()}`,
      nombre: file.name,
      tamaño: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      fecha_subida: new Date().toISOString().split('T')[0],
    };

    setExperiencias(prev =>
      prev.map(exp => {
        if (exp.id_experiencia === experienciaId) {
          return {
            ...exp,
            certificaciones: [...exp.certificaciones, newCert],
            estado_certificacion: 'Certificado',
          };
        }
        return exp;
      })
    );
  };

  const handleEliminarCertificacion = (experienciaId, certId) => {
    setExperiencias(prev =>
      prev.map(exp => {
        if (exp.id_experiencia === experienciaId) {
          const certsRestantes = exp.certificaciones.filter(c => c.id !== certId);
          return {
            ...exp,
            certificaciones: certsRestantes,
            estado_certificacion: certsRestantes.length > 0 ? 'Certificado' : 'Pendiente',
          };
        }
        return exp;
      })
    );
  };

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => {
      // Aquí iría a la siguiente página si existiera, por ahora vuelve al inicio
      window.location.href = '/';
    }, 700);
  };

  const totalCertificadas = experiencias.filter(e => e.estado_certificacion === 'Certificado').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <ProgressBar currentStep={3} totalSteps={3} stepTitle="Certificaciones" />

      <div className="flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl shadow-amber-500/30 transform hover:scale-105 transition-transform duration-300">
                  <Award className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-3">
              Certificaciones de <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Experiencia</span>
            </h1>
            <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto mb-6">
              Vincula los documentos que certifican tus experiencias. Estos son tus pruebas irrefutables de capacidad.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 font-medium">Total Experiencias</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{experiencias.length}</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-green-100 shadow-sm">
                <p className="text-xs text-gray-500 font-medium">Certificadas</p>
                <p className="text-2xl font-bold text-green-600 mt-2">{totalCertificadas}</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-yellow-100 shadow-sm">
                <p className="text-xs text-gray-500 font-medium">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600 mt-2">{experiencias.length - totalCertificadas}</p>
              </div>
            </div>
          </div>

          {/* Lista de experiencias */}
          <div className="space-y-4 mb-12">
            {experiencias.map(exp => (
              <FilaExperiencia
                key={exp.id_experiencia}
                experiencia={exp}
                onAgregarCertificacion={handleAgregarCertificacion}
                onEliminarCertificacion={handleEliminarCertificacion}
              />
            ))}
          </div>

          {/* Información de ayuda */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100 p-6 mb-12">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">💡 Consejos para certificar tu experiencia</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Usa documentos oficiales: Actas de liquidación, certificados de cumplimiento, o cartas de recomendación.</li>
                  <li>• Un archivo por experiencia: Combina múltiples páginas en un solo PDF si es necesario.</li>
                  <li>• Asegúrate de legibilidad: Los datos importantes deben ser claramente visibles.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Botón continuar */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => window.location.href = '/onboarding/resumen'}
              className="px-8 py-4 rounded-xl font-bold text-gray-700 transition-all flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            >
              Volver
            </button>
            <button
              onClick={handleContinue}
              disabled={loading || totalCertificadas === 0}
              className={`px-8 py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 text-lg shadow-lg ${
                !loading && totalCertificadas > 0
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 hover:shadow-2xl hover:shadow-amber-600/40 hover:-translate-y-1 active:translate-y-0'
                  : 'bg-gray-300 cursor-not-allowed shadow-none'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Finalizando...</span>
                </>
              ) : (
                <>
                  <span>Finalizar Onboarding</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal agregar certificación */}
      <ModalAgregarCertificacion
        isOpen={modalState.isOpen}
        experienciaId={modalState.experienciaId}
        onUpload={handleUploadCertificacion}
        onClose={() => setModalState({ isOpen: false, experienciaId: null })}
      />
    </div>
  );
}
