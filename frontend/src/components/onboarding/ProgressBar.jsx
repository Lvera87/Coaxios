export default function ProgressBar({ currentStep, totalSteps, stepTitle }) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 lg:px-8 py-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm font-medium text-gray-600 mb-3">
          Paso {currentStep} de {totalSteps}: <span className="text-gray-900 font-semibold">{stepTitle}</span>
        </p>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
