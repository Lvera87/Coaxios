import { useState } from 'react';
import { Sparkles, ArrowRight, FileText } from 'lucide-react';
import ProgressBar from '../../components/onboarding/ProgressBar';
import FileUploadCard from '../../components/onboarding/FileUploadCard';
import FormInput from '../../components/onboarding/FormInput';

export default function ExperienciaPage() {
  const [formData, setFormData] = useState({
    nombreProyecto: '',
    cliente: '',
    valorFinal: '',
    fechaInicio: '',
    fechaFin: '',
    capacidades: '',
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!file) newErrors.file = 'El certificado de experiencia es requerido';
    if (!formData.nombreProyecto.trim()) newErrors.nombreProyecto = 'El nombre del proyecto es requerido';
    if (!formData.cliente.trim()) newErrors.cliente = 'El cliente es requerido';
    if (!formData.valorFinal || isNaN(formData.valorFinal)) newErrors.valorFinal = 'El valor es requerido';
    if (!formData.fechaInicio) newErrors.fechaInicio = 'La fecha de inicio es requerida';
    if (!formData.fechaFin) newErrors.fechaFin = 'La fecha de fin es requerida';
    if (!formData.capacidades.trim()) newErrors.capacidades = 'Las capacidades son requeridas';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      console.log('Experiencia:', { file, ...formData });
      window.location.href = '/dashboard';
    }, 1500);
  };

  const isFormValid = 
    file && 
    formData.nombreProyecto && 
    formData.cliente && 
    formData.valorFinal && 
    formData.fechaInicio && 
    formData.fechaFin && 
    formData.capacidades;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ProgressBar currentStep={4} totalSteps={4} stepTitle="Digitaliza una Capacidad" />

      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Columna Izquierda: Formulario */}
            <div>
              {/* Header */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-black text-gray-900">¡Aquí empieza la magia!</h1>
                    <p className="text-gray-600 font-medium">Registremos una experiencia</p>
                  </div>
                </div>
                <p className="text-gray-600 font-medium">
                  Te guiaremos en el proceso. Esto transformará tus PDFs en datos que puedes buscar, filtrar y compartir para ganar licitaciones.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Certificado de Experiencia</h3>
                  <FileUploadCard
                    title="Certificado de Experiencia"
                    onFileSelect={setFile}
                    required
                  />
                  {errors.file && <p className="text-xs text-red-600 font-medium mt-2">{errors.file}</p>}
                </div>

                {/* Nombre del Proyecto */}
                <FormInput
                  label="Nombre del Contrato o Proyecto"
                  placeholder="Construcción del Puente Aranda"
                  value={formData.nombreProyecto}
                  onChange={(value) => handleChange('nombreProyecto', value)}
                  error={errors.nombreProyecto}
                  required
                />

                {/* Cliente */}
                <FormInput
                  label="Cliente / Entidad Contratante"
                  placeholder="Alcaldía de Bogotá"
                  value={formData.cliente}
                  onChange={(value) => handleChange('cliente', value)}
                  error={errors.cliente}
                  required
                />

                {/* Valor Final */}
                <FormInput
                  label="Valor Final (COP)"
                  type="number"
                  placeholder="50000000"
                  value={formData.valorFinal}
                  onChange={(value) => handleChange('valorFinal', value)}
                  error={errors.valorFinal}
                  required
                />

                {/* Fechas */}
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="Fecha de Inicio"
                    type="date"
                    value={formData.fechaInicio}
                    onChange={(value) => handleChange('fechaInicio', value)}
                    error={errors.fechaInicio}
                    required
                  />
                  <FormInput
                    label="Fecha de Fin"
                    type="date"
                    value={formData.fechaFin}
                    onChange={(value) => handleChange('fechaFin', value)}
                    error={errors.fechaFin}
                    required
                  />
                </div>

                {/* Capacidades */}
                <FormInput
                  label="Capacidades Demostradas"
                  placeholder='Ej: "Obra civil, Consultoría, Sostenibilidad"'
                  value={formData.capacidades}
                  onChange={(value) => handleChange('capacidades', value)}
                  error={errors.capacidades}
                  helper="Separa las capacidades con comas"
                  required
                />

                {/* CTA Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                    isFormValid && !loading
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Finalizando...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Finalizar y Descubrir mi Dashboard</span>
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Escape Link */}
                <button
                  type="button"
                  onClick={() => window.location.href = '/dashboard'}
                  className="w-full py-2 text-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Lo haré después, llevarme a mi Dashboard
                </button>
              </form>
            </div>

            {/* Columna Derecha: Guía Visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center mb-6 relative">
                  <FileText className="w-16 h-16 text-blue-300" />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-lg shadow-sm text-xs font-semibold text-blue-600">
                    1. Encuentra el Cliente aquí
                  </div>
                  <div className="absolute top-16 right-4 bg-white px-3 py-1.5 rounded-lg shadow-sm text-xs font-semibold text-blue-600">
                    2. El Valor Final aquí
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white px-3 py-1.5 rounded-lg shadow-sm text-xs font-semibold text-blue-600">
                    3. Las fechas aquí
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Certificado de Experiencia</h3>
                <p className="text-sm text-gray-600">
                  Busca en tu PDF certificado estas secciones clave. Nuestro sistema las identificará automáticamente en futuras subidas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
