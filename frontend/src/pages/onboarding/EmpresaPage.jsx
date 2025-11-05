import { useState } from 'react';
import { Briefcase, ArrowRight, Building2, FileText, Award, Sparkles, X } from 'lucide-react';
import ProgressBar from '../../components/onboarding/ProgressBar';
import FileUploadCard from '../../components/onboarding/FileUploadCard';

export default function EmpresaPage() {
  // Solo manejamos uploads y datos extraídos
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedRupFile, setUploadedRupFile] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [parsingRup, setParsingRup] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false); 
  const [reviewData, setReviewData] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [parseError, setParseError] = useState('');
  const [rupParseError, setRupParseError] = useState('');
  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setLoading(true);
    setTimeout(() => {
      // Continuar flujo; los datos de extracción quedan en `extractedData`
      window.location.href = '/onboarding/resumen';
    }, 700);
  };

  const handleFileSelect = (file) => {
    setUploadedFile(file);
    setParseError('');
    if (file) {
      parseDocument(file);
    }
  };

  const handleRupFileSelect = (file) => {
    setUploadedRupFile(file);
    setRupParseError('');
    if (file) {
      parseRupDocument(file);
    }
  };

  const parseDocument = async (file) => {
    // Envia el archivo al endpoint local para parseo (OCR/LLM)
    setParsing(true);
    try {
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch('/api/onboarding/parse-local', {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) throw new Error(`Error del servidor: ${res.status}`);
      const body = await res.json();
      // Esperamos { parsedData: { company_name, nit, city, representative_name, representative_doc_type, representative_doc_number }, confidence }
      const parsed = body.parsedData || body;
      const mapped = {
        nombreEmpresa: parsed.company_name || '',
        nit: parsed.nit || '',
        rup: parsed.rup || '',
        ciudad: parsed.city || '',
        nombreRepresentante: parsed.representative_name || '',
        tipoDocumento: parsed.representative_doc_type || 'colombiano',
        numeroDocumento: parsed.representative_doc_number || '',
      };
      setReviewData(mapped);
      setShowReviewModal(true);
    } catch (err) {
      console.error('parse error', err);
      setParseError('No se pudo extraer datos del documento. Intenta con otro archivo o completa manualmente.');
    } finally {
      setParsing(false);
    }
  };

  const parseRupDocument = async (file) => {
    // Similar al parseDocument pero centrado en extraer RUP
    setParsingRup(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('type', 'rup');

      const res = await fetch('/api/onboarding/parse-local', {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) throw new Error(`Error del servidor: ${res.status}`);
      const body = await res.json();
      const parsed = body.parsedData || body;
      const mapped = {
        rup: parsed.rup || '',
        nombreEmpresa: parsed.company_name || '',
      };
      setReviewData(mapped);
      setShowReviewModal(true);
    } catch (err) {
      console.error('rup parse error', err);
      setRupParseError('No se pudo extraer el RUP del archivo. Intenta con otro archivo o escríbelo manualmente.');
    } finally {
      setParsingRup(false);
    }
  };

  const applyReview = () => {
    if (!reviewData) return;
    setExtractedData(prev => ({ ...prev, ...reviewData }));
    setShowReviewModal(false);
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
  <ProgressBar currentStep={1} totalSteps={3} stepTitle="Datos de la Empresa" />

      <div className="flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/30 transform hover:scale-105 transition-transform duration-300">
                  <Briefcase className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-3">
              {extractedData?.nombreEmpresa ? (
                <>Documentos de <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{extractedData.nombreEmpresa}</span></>
              ) : (
                <>Documentos de la empresa</>
              )}
            </h1>
            <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
              Sube los documentos legales de tu empresa. Nuestra IA extraerá automáticamente la información para agilizar el proceso.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Cámara de Comercio</p>
                  <p className="text-xs text-gray-500">Extracción automática de NIT y razón social</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">RUP</p>
                  <p className="text-xs text-gray-500">Registro Único de Proponentes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Cards Container */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8 border border-gray-100 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Cámara de Comercio Upload */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Cámara de Comercio</h3>
                    <p className="text-sm text-gray-500">Documento de constitución o certificado actualizado</p>
                  </div>
                </div>
                <FileUploadCard
                  title="Cámara de Comercio"
                  acceptedFormats=".pdf,image/*"
                  onFileSelect={handleFileSelect}
                  required={false}
                  isProcessing={parsing}
                />
                {parseError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600 font-medium">{parseError}</p>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-sm text-gray-500 font-medium">Y además</span>
                </div>
              </div>

              {/* RUP Upload */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">RUP - Registro Único de Proponentes</h3>
                    <p className="text-sm text-gray-500">Certificado vigente del RUP</p>
                  </div>
                </div>
                <FileUploadCard
                  title="RUP"
                  acceptedFormats=".pdf,image/*"
                  onFileSelect={handleRupFileSelect}
                  required={false}
                  isProcessing={parsingRup}
                />
                {rupParseError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600 font-medium">{rupParseError}</p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg mt-8 ${
                  !loading
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-1 active:translate-y-0'
                    : 'bg-gray-300 cursor-not-allowed shadow-none'
                }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <span>Continuar a Resumen</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Info Footer */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Los datos se extraen automáticamente con IA para tu comodidad</span>
              </div>
            </div>
          </div>

          {/* Review Modal */}
          {showReviewModal && reviewData && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
              <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl animate-in slide-in-from-bottom-4 duration-300 mx-4">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Revisar datos extraídos</h3>
                  </div>
                  <button 
                    onClick={() => setShowReviewModal(false)} 
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Legal de la Empresa</label>
                    <input 
                      value={reviewData.nombreEmpresa || ''} 
                      onChange={(e) => setReviewData(prev => ({ ...prev, nombreEmpresa: e.target.value }))} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">NIT</label>
                    <input 
                      value={reviewData.nit || ''} 
                      onChange={(e) => setReviewData(prev => ({ ...prev, nit: e.target.value }))} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">RUP</label>
                    <input 
                      value={reviewData.rup || ''} 
                      onChange={(e) => setReviewData(prev => ({ ...prev, rup: e.target.value }))} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ciudad</label>
                    <input 
                      value={reviewData.ciudad || ''} 
                      onChange={(e) => setReviewData(prev => ({ ...prev, ciudad: e.target.value }))} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre del Representante</label>
                    <input 
                      value={reviewData.nombreRepresentante || ''} 
                      onChange={(e) => setReviewData(prev => ({ ...prev, nombreRepresentante: e.target.value }))} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de documento</label>
                      <select 
                        value={reviewData.tipoDocumento || 'colombiano'} 
                        onChange={(e) => setReviewData(prev => ({ ...prev, tipoDocumento: e.target.value }))} 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      >
                        <option value="colombiano">Colombiano</option>
                        <option value="extranjero">Extranjero</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Número de documento</label>
                      <input 
                        value={reviewData.numeroDocumento || ''} 
                        onChange={(e) => setReviewData(prev => ({ ...prev, numeroDocumento: e.target.value }))} 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end gap-3">
                  <button 
                    onClick={() => setShowReviewModal(false)} 
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={applyReview} 
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all"
                  >
                    Aplicar y usar datos
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
