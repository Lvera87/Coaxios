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
  {
    id_rup: '001',
    contratante: 'Instituto Nacional de Vías - INVÍAS',
    celebrado_por: 'Consorcio Vial 2021',
    nombre_contratista: 'Consorcio Vial 2021',
    participacion_porcentaje: 40, // porcentaje atribuido a la empresa en el consorcio
    valor_smmlv: 3500, // equivalente aproximado
    ano_fin: 2022,
    fecha_inicio: '2021-03-01',
    fecha_fin: '2022-11-15',
    // capacidades (UNSPSC) asociadas a este contrato
    capacidades: [
      {
        id_capacidad: 'cap_01',
        codigo_unspsc: 72151000,
        nombre_actividad: 'Construcción de Puentes',
        // códigos segmentados (SEG|FAMI|CLAS|PROD) — se muestran en el desplegable
        codigos_detalle: [
          '11|10|15|00', '11|10|16|00', '11|10|17|00', '11|10|18|00', '11|10|19|00'
        ],
        id_documento_soporte: 'soporte_exp_001.pdf',
        estado_detalle: 'Completo y Verificado',
      },
    ],
    id_documento_soporte: null,
    estado_verificacion: 'Auto-generado',
  },
  {
    id_rup: '002',
    contratante: 'INVÍAS - Contratación Central',
    celebrado_por: 'Empresa Vial S.A.',
    nombre_contratista: 'Empresa Vial S.A.',
    participacion_porcentaje: 100,
    valor_smmlv: 2800,
    ano_fin: 2023,
    fecha_inicio: '2021-08-10',
    fecha_fin: '2023-05-20',
    capacidades: [
      {
        id_capacidad: 'cap_02',
        codigo_unspsc: 72141000,
        nombre_actividad: 'Movimiento de tierras',
        codigos_detalle: [
          '11|11|15|00', '11|11|16|00', '11|11|17|00', '11|11|18|00'
        ],
        id_documento_soporte: 'soporte_exp_002.pdf',
        estado_detalle: 'Completo y Verificado',
      },
    ],
    id_documento_soporte: 'doc_001.pdf',
    estado_verificacion: 'Verificado',
  },
  {
    id_rup: '003',
    contratante: 'Aeropuertos del Caribe - AACID',
    celebrado_por: 'Nexus Ingeniería S.A.S.',
    nombre_contratista: 'Nexus Ingeniería S.A.S.',
    participacion_porcentaje: 100,
    valor_smmlv: 1200,
    ano_fin: 2020,
    fecha_inicio: '2019-06-15',
    fecha_fin: '2020-12-10',
    capacidades: [
      {
        id_capacidad: 'cap_03',
        codigo_unspsc: 72144000,
        nombre_actividad: 'Trabajos de terminación',
        codigos_detalle: [
          '11|12|15|00', '11|12|16|00', '11|12|17|00'
        ],
        id_documento_soporte: null,
        estado_detalle: 'Pendiente',
      },
    ],
    id_documento_soporte: null,
    estado_verificacion: 'Auto-generado',
  },
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
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center justify-center"
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
