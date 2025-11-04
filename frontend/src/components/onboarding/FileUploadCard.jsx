import { Upload, CheckCircle, X, FileText, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function FileUploadCard({ 
  title, 
  subtitle, 
  onFileSelect, 
  acceptedFormats = '.pdf', 
  required = true, 
  showDateField = false, 
  onDateChange,
  isProcessing = false 
}) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    onFileSelect?.(selectedFile);
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    onDateChange?.(date);
  };

  const removeFile = () => {
    setFile(null);
    setSelectedDate('');
    onFileSelect?.(null);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl overflow-hidden transition-all duration-300 ${
          isDragging
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg scale-[1.02]'
            : file
            ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-md'
            : 'border-gray-300 bg-gradient-to-br from-white to-gray-50 hover:border-blue-400 hover:shadow-md hover:scale-[1.01]'
        }`}
      >
        {/* Animated background gradient */}
        {isDragging && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 animate-pulse"></div>
        )}

        <div className="relative p-8">
          {!file ? (
            <div className="text-center cursor-pointer group" onClick={() => document.getElementById(`file-input-${title}`).click()}>
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Upload className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1 bg-purple-500 rounded-full p-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <p className="text-base font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {isDragging ? '¡Suelta el archivo aquí!' : 'Arrastra tu documento aquí'}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                o <span className="text-blue-600 font-semibold underline">haz clic para seleccionar</span>
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500 font-medium">{acceptedFormats}</span>
              </div>
              
              <input
                id={`file-input-${title}`}
                type="file"
                accept={acceptedFormats}
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
              {isProcessing ? (
                <div className="flex items-center justify-center gap-4 py-4">
                  <div className="relative">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" strokeWidth={2.5} />
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg animate-pulse"></div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900 mb-1">Procesando documento...</p>
                    <p className="text-xs text-gray-500">Extrayendo información con IA</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-green-400/20 rounded-xl blur-md"></div>
                      <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                        <CheckCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="text-sm font-bold text-gray-900 truncate mb-1">{file.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500">{(file.size / 1024).toFixed(2)} KB</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          <CheckCircle className="w-3 h-3" />
                          Cargado
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                    title="Eliminar archivo"
                  >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showDateField && file && !isProcessing && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Fecha de Expedición <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300"
            required
          />
        </div>
      )}
    </div>
  );
}
