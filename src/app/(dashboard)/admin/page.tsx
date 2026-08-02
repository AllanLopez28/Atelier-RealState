import Image from "next/image";
import { ActionButton } from "./ActionButton";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch applications with joined profiles and properties
  const { data: apps } = await supabase
    .from("applications")
    .select(`
      id,
      status,
      lease_term,
      prospect_id,
      profiles:prospect_id (first_name, last_name, email, avatar_url),
      properties:property_id (title)
    `)
    .order('created_at', { ascending: false });

  // Fetch metrics counts
  const { count: totalProps } = await supabase
    .from("properties")
    .select("*", { count: "exact", head: true });
    
  const pendingCount = (apps || []).filter((a: any) => ['En Revisión', 'Pendiente Docs', 'Pre-Aprobada'].includes(a.status)).length;

  // Map data to the format expected by the UI
  const mappedApplications = (apps || []).map((app: any) => {
    // Manejo seguro en caso de que perfiles sea un array (en algunas configuraciones de joins 1:N) o un objeto (1:1). 
    // Por el esquema, es un objeto.
    const profile = Array.isArray(app.profiles) ? app.profiles[0] : app.profiles;
    const property = Array.isArray(app.properties) ? app.properties[0] : app.properties;

    const fullName = `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim();
    const initials = `${profile?.first_name?.[0] || ''}${profile?.last_name?.[0] || ''}`.toUpperCase();
    
    return {
      id: app.id,
      prospectId: app.prospect_id,
      name: fullName || 'Desconocido',
      email: profile?.email || 'Sin correo',
      avatar: initials || 'US',
      avatarImage: profile?.avatar_url,
      property: property?.title || 'Desconocida',
      type: app.lease_term,
      status: app.status,
    };
  });

  return (
    <div className="max-w-[1400px] mx-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-[2.5rem] font-bold text-slate-800 tracking-tight leading-tight mb-2">Panel de Control</h1>
          <p className="text-gray-500 text-[15px]">Resumen de operaciones y estado del inventario de Atelier Estate.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-5 py-2.5 rounded-full border border-gray-200 bg-white text-[14px] font-medium text-slate-700 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportar Datos
          </button>
          <button className="px-5 py-2.5 rounded-full bg-[#5d6e5c] hover:bg-[#4A5E50] text-white text-[14px] font-medium transition-colors flex items-center gap-2 shadow-sm">
            <span className="text-lg leading-none">+</span> Nuevo Listado
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
               </svg>
            </div>
            <span className="px-2.5 py-1 bg-green-50 text-green-700 text-[11px] font-semibold rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              12%
            </span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1">Inventario Total</p>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-[2rem] font-bold text-slate-800 leading-none">{totalProps || 0}</span>
              <span className="text-gray-500 text-[14px]">Propiedades</span>
            </div>
            <div className="flex gap-4 text-[12px] text-gray-500 font-medium">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-300"></span> 3 Ocupadas</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> 1 Disponible</span>
            </div>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
               </svg>
            </div>
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[11px] font-semibold rounded-full">
              Nuevas
            </span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1">Solicitudes Pendientes</p>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-[2rem] font-bold text-slate-800 leading-none">{pendingCount}</span>
              <span className="text-gray-500 text-[14px]">Esta semana</span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-slate-700 w-[60%] h-full"></div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
               </svg>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1">Cobros Del Mes</p>
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="text-[2rem] font-bold text-slate-800 leading-none">$14,500</span>
              <span className="text-gray-500 text-[14px] font-medium">USD</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-slate-600 font-medium">
              <span>95% Recaudado</span>
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-red-400">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
               </svg>
            </div>
            <span className="px-2.5 py-1 bg-red-50 text-red-600 text-[11px] font-semibold rounded-full">
              Urgente
            </span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1">Tickets Abiertos</p>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-[2rem] font-bold text-slate-800 leading-none">3</span>
              <span className="text-gray-500 text-[14px]">Mantenimiento</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Left Column (Table) */}
        <div className="col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
            <div>
              <h2 className="text-[17px] font-bold text-slate-800">Solicitudes de Aplicación</h2>
              <p className="text-gray-500 text-[13px] mt-0.5">Revisión de inquilinos potenciales.</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Buscar solicitante..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-full text-[13px] w-56 focus:outline-none focus:ring-1 focus:ring-slate-300" />
              </div>
              <button className="w-[36px] h-[36px] flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
            </div>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
                <th className="px-6 py-4 font-bold">Solicitante</th>
                <th className="px-6 py-4 font-bold">Propiedad de Interés</th>
                <th className="px-6 py-4 font-bold">Estado</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {mappedApplications.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500 text-sm">No hay solicitudes actualmente.</td>
                </tr>
              ) : null}
              {mappedApplications.map((app, i) => (
                <tr key={app.id} className={i % 2 !== 0 ? "bg-[#F9FAF8]" : "bg-white"}>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      {app.avatarImage ? (
                        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                          <Image src={app.avatarImage} alt="Avatar" width={36} height={36} className="object-cover w-full h-full" />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold text-[12px] flex-shrink-0">
                          {app.avatar}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-slate-800 text-[14.5px] leading-tight">{app.name}</p>
                        <p className="text-gray-500 text-[13px]">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-slate-800 font-medium text-[14px]">{app.property}</p>
                    <p className="text-gray-500 text-[13px]">{app.type}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium border
                      ${app.status === 'En Revisión' ? 'bg-gray-50 text-gray-600 border-gray-200' : 
                        app.status === 'Pre-Aprobada' || app.status === 'Aprobada' ? 'bg-[#7a8a79] text-white border-transparent shadow-sm' : 
                        'bg-blue-50 text-blue-600 border-blue-100'}`}>
                      {app.status === 'En Revisión' && <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>}
                      {app.status === 'Pendiente Docs' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    {(app.status === 'En Revisión' || app.status === 'Pendiente Docs') && (
                      <ActionButton applicationId={app.id} prospectId={app.prospectId} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="p-4 border-t border-gray-100 text-center bg-white">
            <button className="text-[13px] font-semibold text-gray-500 hover:text-slate-800 transition-colors">
              Ver todas las solicitudes
            </button>
          </div>
        </div>

        {/* Right Column (Widgets) */}
        <div className="col-span-4 flex flex-col gap-6">
          
          {/* Property Widget */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative h-[170px] w-full bg-gray-200">
              <Image src="/Aint1.png" alt="Villa Milano" fill className="object-cover" />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]"></span>
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wide">Disponible</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-[18px] font-bold text-slate-800 mb-1.5">Villa Milano</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                Propiedad de lujo desocupada recientemente. Requiere limpieza...
              </p>
              <div className="flex justify-between items-center pt-5 border-t border-gray-100">
                <p className="font-bold text-slate-800 text-[17px]">$4,200<span className="text-gray-400 font-medium text-[14px]">/mes</span></p>
                <button className="text-[13px] font-semibold text-gray-500 hover:text-slate-800">Gestionar</button>
              </div>
            </div>
          </div>

          {/* Alerts Widget */}
          <div className="bg-[#f8f9fc] rounded-2xl border border-blue-50/50 p-6">
            <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2 mb-5">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Alertas Recientes
            </h3>
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 text-red-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold text-slate-800">Fuga de agua reportada</p>
                  <p className="text-[12px] text-gray-500 flex items-center gap-2 mt-0.5">
                    <span>Casa del Sol</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>Hace 2 horas</span>
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold text-slate-800">Pago rechazado</p>
                  <p className="text-[12px] text-gray-500 flex items-center gap-2 mt-0.5">
                    <span>Unidad 3B</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>J. Doe</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
