import { getDashboardData } from "./actions";
import NewTicketModal from "./NewTicketModal";

const formatCurrency = (amount: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

const formatTicketDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  const parts = formatter.formatToParts(date);
  const day = parts.find(p => p.type === 'day')?.value;
  const month = parts.find(p => p.type === 'month')?.value;
  const year = parts.find(p => p.type === 'year')?.value;
  
  return {
    top: `${day} ${month ? month.charAt(0).toUpperCase() + month.slice(1) : ''},`,
    bottom: year
  };
};

const formatNoticeDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short' });
  const parts = formatter.formatToParts(date);
  const day = parts.find(p => p.type === 'day')?.value;
  const month = parts.find(p => p.type === 'month')?.value;
  return `${day} ${month?.toUpperCase()}`;
};

export default async function InquilinoDashboardPage() {
  const data = await getDashboardData();
  
  if (!data) return null;
  const { pago, tickets, avisos } = data;

  return (
    <div className="flex flex-col lg:flex-row gap-10 max-w-[1200px] w-full mx-auto">
      
      {/* Columna Izquierda (Pagos y Mantenimiento) */}
      <div className="flex-1 lg:max-w-[65%] flex flex-col gap-10">
        
        {/* Próximo Pago */}
        {pago && (
          <div className="bg-white rounded-[24px] p-8 lg:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2">Próximo Pago</p>
              <div className="flex items-baseline gap-2 mb-4">
                <h2 className="text-[42px] font-extrabold text-[#001738] leading-none tracking-tight">
                  {formatCurrency(pago.monto, pago.moneda)}
                </h2>
                <span className="text-[18px] font-bold text-gray-400">{pago.moneda}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-[13px] font-medium">
                  Vence el {new Date(pago.fecha_vencimiento).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-4 bg-[#f4f7fc] hover:bg-[#ebf1fa] text-[#001738] rounded-xl text-[14px] font-semibold transition-colors border border-gray-100">
                <svg className="w-5 h-5 text-[#5d6e5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Ver Detalle
              </button>
              <button className="flex items-center gap-2 px-6 py-4 bg-[#5d6e5c] hover:bg-[#4a5849] text-white rounded-xl text-[14px] font-semibold shadow-sm transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Pagar Ahora
              </button>
            </div>
          </div>
        )}

        {/* Mantenimiento */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="text-[20px] font-bold text-[#001738] mb-1">Mantenimiento</h3>
              <p className="text-[14px] text-gray-500">Historial reciente de solicitudes</p>
            </div>
            <NewTicketModal />
          </div>

          <div className="bg-white rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-800 uppercase tracking-widest w-1/5">Ticket</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-800 uppercase tracking-widest w-2/5">Asunto</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-800 uppercase tracking-widest text-center w-1/5">Estado</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-800 uppercase tracking-widest text-right w-1/5">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {tickets.map(ticket => {
                  const dateParts = formatTicketDate(ticket.fecha_creacion);
                  return (
                    <tr key={ticket.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-6 text-[13px] font-bold text-gray-400">{ticket.ticket_number}</td>
                      <td className="px-8 py-6 text-[14px] font-bold text-[#001738]">{ticket.asunto}</td>
                      <td className="px-8 py-6 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border
                          ${ticket.estado === 'En Progreso' ? 'bg-gray-50 text-gray-600 border-gray-200/50' : 
                            ticket.estado === 'Resuelto' ? 'bg-white text-gray-400 border-gray-100' : 'bg-white text-slate-800 border-gray-200'}
                        `}>
                          <span className={`w-1.5 h-1.5 rounded-full ${ticket.estado === 'Resuelto' ? 'bg-gray-300' : 'bg-gray-500'}`}></span>
                          {ticket.estado}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="text-[13px] font-medium text-slate-700">{dateParts.top}</span><br/>
                        <span className="text-[12px] text-gray-400 font-medium">{dateParts.bottom}</span>
                      </td>
                    </tr>
                  )
                })}
                {tickets.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-10 text-center text-[13px] text-gray-400 font-medium">
                      No tienes tickets de mantenimiento recientes.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Columna Derecha (Avisos) */}
      <div className="flex-1 lg:max-w-[35%]">
        <div className="bg-[#f4f7fc] rounded-[24px] p-6 lg:p-8 h-full flex flex-col border border-blue-50/50 shadow-inner">
          <div className="flex items-start gap-4 mb-8">
            <div className="mt-1 w-6 h-6 flex items-center justify-center text-[#001738]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <h3 className="text-[18px] font-bold text-[#001738] leading-tight">Avisos de<br/>Administración</h3>
          </div>

          <div className="flex-1 flex flex-col gap-5">
            {avisos.map(aviso => (
              <div key={aviso.id} className="bg-white rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/50">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className={`w-1.5 h-1.5 rounded-full ${aviso.tipo === 'urgente' ? 'bg-red-500' : aviso.tipo === 'evento' ? 'bg-blue-400' : 'bg-gray-300'}`}></div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    {aviso.tipo} • HOY, 09:00 AM
                  </span>
                </div>
                <h4 className="text-[14px] font-bold text-[#001738] mb-2.5 leading-snug">{aviso.titulo}</h4>
                <p className="text-[13px] text-gray-500/90 leading-relaxed line-clamp-2">{aviso.descripcion}</p>
              </div>
            ))}
            {avisos.length === 0 && (
              <p className="text-center text-[13px] text-gray-400 font-medium py-10">No hay avisos recientes.</p>
            )}
          </div>

          <button className="mt-10 text-[11px] font-bold text-gray-500 hover:text-slate-800 uppercase tracking-widest text-center transition-colors w-full">
            VER HISTORIAL COMPLETO
          </button>
        </div>
      </div>
      
    </div>
  );
}
