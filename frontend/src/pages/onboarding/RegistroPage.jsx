import { useState } from 'react';
import { ShieldCheck, ArrowRight, Sparkles, Lock, Mail, User, Check, X } from 'lucide-react';

const FormInput = ({ label, type, placeholder, value, onChange, error, helper, required, icon: Icon }) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative group">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 outline-none text-gray-900 placeholder:text-gray-400 ${
          error 
            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:bg-white' 
            : 'border-gray-200 bg-white focus:border-blue-500 focus:shadow-lg focus:shadow-blue-100'
        }`}
      />
    </div>
    {error && <p className="text-sm text-red-600 font-medium flex items-center gap-1.5">{error}</p>}
    {helper && !error && <p className="text-xs text-gray-500">{helper}</p>}
  </div>
);

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePasswordStrength = (password) => {
    return {
      length: password && password.length >= 8,
      uppercase: /[A-Z]/.test(password || ''),
      lowercase: /[a-z]/.test(password || ''),
      number: /\d/.test(password || ''),
      special: /[^A-Za-z0-9]/.test(password || ''),
    };
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!validateEmail(formData.email)) newErrors.email = 'Email inválido';
    const pwdChecks = validatePasswordStrength(formData.password);
    const pwdValid = Object.values(pwdChecks).every(Boolean);
    if (!pwdValid) {
      const missing = [];
      if (!pwdChecks.length) missing.push('8 caracteres');
      if (!pwdChecks.uppercase) missing.push('una mayúscula');
      if (!pwdChecks.lowercase) missing.push('una minúscula');
      if (!pwdChecks.number) missing.push('un número');
      if (!pwdChecks.special) missing.push('un carácter especial');
      newErrors.password = `La contraseña debe contener: ${missing.join(', ')}`;
    }
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirma la contraseña';
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (!acceptTerms) newErrors.terms = 'Debes aceptar los términos';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear related errors when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if ((field === 'password' || field === 'confirmPassword') && errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
    // Clear password error if it now meets strength
    if (field === 'password' && errors.password) {
      const pwdChecks = validatePasswordStrength(value);
      if (Object.values(pwdChecks).every(Boolean)) {
        setErrors(prev => ({ ...prev, password: '' }));
      }
      // also clear confirmPassword mismatch when user types matching value
      if (formData.confirmPassword && value === formData.confirmPassword && errors.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      console.log('Registro:', formData);
      window.location.href = '/onboarding/empresa';
    }, 1500);
  };

  const isFormValid = !!(
    formData.nombre.trim() &&
    formData.email &&
    validateEmail(formData.email) &&
    formData.password &&
    formData.confirmPassword &&
    acceptTerms &&
    formData.password === formData.confirmPassword &&
    // password strength
    Object.values(validatePasswordStrength(formData.password)).every(Boolean)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/30 transform hover:scale-105 transition-transform duration-300">
                <ShieldCheck className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            Crea tu cuenta
          </h1>
          <p className="text-gray-600 font-medium text-lg">
            Comienza tu viaje con Coaxios.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8 border border-gray-100 backdrop-blur-xl">
          <div className="space-y-5">
            <FormInput
              label="Razon Social"
              type="text"
              placeholder="Nexus Ingenieria S.A.S"
              value={formData.nombre}
              onChange={(value) => handleChange('nombre', value)}
              error={errors.nombre}
              icon={User}
              required
            />

            <FormInput
              label="Email de Trabajo"
              type="email"
              placeholder="juan@nexusingenieria.com"
              value={formData.email}
              onChange={(value) => handleChange('email', value)}
              error={errors.email}
              icon={Mail}
              required
            />

            <FormInput
              label="Crear Contraseña"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(value) => handleChange('password', value)}
              error={errors.password}
              helper="Mínimo 8 caracteres"
              icon={Lock}
              required
            />

            {/* Indicador de fuerza / requisitos de contraseña */}
            {(() => {
              const checks = validatePasswordStrength(formData.password);
              return (
                <div className="text-sm px-1">
                  <p className="text-xs text-gray-500 mb-2">La contraseña debe contener:</p>
                  <ul className="grid grid-cols-1 gap-1">
                    <li className={`flex items-center gap-2 ${checks.length ? 'text-green-600' : 'text-gray-400'}`}>
                      {checks.length ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      <span className="text-xs">Al menos 8 caracteres</span>
                    </li>
                    <li className={`flex items-center gap-2 ${checks.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                      {checks.uppercase ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      <span className="text-xs">Una letra mayúscula</span>
                    </li>
                    <li className={`flex items-center gap-2 ${checks.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                      {checks.lowercase ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      <span className="text-xs">Una letra minúscula</span>
                    </li>
                    <li className={`flex items-center gap-2 ${checks.number ? 'text-green-600' : 'text-gray-400'}`}>
                      {checks.number ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      <span className="text-xs">Al menos un número</span>
                    </li>
                    <li className={`flex items-center gap-2 ${checks.special ? 'text-green-600' : 'text-gray-400'}`}>
                      {checks.special ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      <span className="text-xs">Al menos un carácter especial (e.g. !@#$%)</span>
                    </li>
                  </ul>
                </div>
              );
            })()}

            <FormInput
              label="Confirmar Contraseña"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(value) => handleChange('confirmPassword', value)}
              error={errors.confirmPassword}
              icon={Lock}
              required
            />

            <div className="pt-2">
              <div className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                errors.terms ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-blue-200'
              }`}>
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    if (e.target.checked && errors.terms) {
                      setErrors(prev => ({ ...prev, terms: '' }));
                    }
                  }}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer mt-0.5"
                />
                <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                  Acepto los{' '}
                  <a href="#" className="text-blue-600 font-semibold hover:underline">
                    Términos del Servicio
                  </a>{' '}
                  y la{' '}
                  <a href="#" className="text-blue-600 font-semibold hover:underline">
                    Política de Privacidad
                  </a>
                </label>
              </div>
              {errors.terms && <p className="text-sm text-red-600 font-medium mt-2">{errors.terms}</p>}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid || loading}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg mt-6 ${
                isFormValid && !loading
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-1 active:translate-y-0'
                  : 'bg-gray-300 cursor-not-allowed shadow-none'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creando cuenta...</span>
                </>
              ) : (
                <>
                  <span>Crear Cuenta</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>Datos protegidos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-green-600" />
                <span>SSL seguro</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-600 mt-8">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="text-blue-600 font-bold hover:underline hover:text-blue-700 transition-colors">
            Inicia sesión →
          </a>
        </p>
      </div>
    </div>
  );
}