import { createClient } from "@/lib/supabase/server";
import OnboardingForm from "./OnboardingForm";

export default async function ProspectDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Verify if application exists
  const { data: application } = await supabase
    .from('applications')
    .select('*')
    .eq('prospect_id', user.id)
    .single();

  if (!application) {
    // Fetch published properties
    const { data: properties } = await supabase
      .from('properties')
      .select('id, title')
      .eq('status', 'published');

    return <OnboardingForm properties={properties || []} />;
  }

  // Application Tracking View
  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-[20px] font-semibold text-slate-800 mb-2">Application Journey</h1>
        <p className="text-gray-500 text-[14px]">
          Tu aplicación ha sido recibida y está siendo evaluada por nuestro equipo. Te notificaremos en menos de 24 horas.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mb-10 overflow-hidden">
        <div className="flex justify-between items-center relative">
          {/* Progress bar lines */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 flex z-0">
            <div className="flex-1 bg-slate-700 ml-12 mr-2"></div>
            <div className="flex-1 bg-gray-100 ml-2 mr-12"></div>
          </div>
          
          {/* Steps */}
          <div className="relative z-10 flex justify-between w-full">
             {/* Step 1 */}
             <div className="flex flex-col items-center bg-white px-4">
                <div className="w-12 h-12 rounded-full bg-[#5d6e5c] text-white flex items-center justify-center shadow-sm mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[13px] font-bold text-slate-700 text-center">Step 01<br/><span className="text-gray-500 font-normal">Recibido</span></span>
             </div>

             {/* Step 2 */}
             <div className="flex flex-col items-center bg-white px-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-[16px] mb-3 shadow-sm ${application.status === 'En Revisión' ? 'border-2 border-slate-700 text-slate-700 bg-white' : 'bg-[#5d6e5c] text-white'}`}>
                  2
                </div>
                <span className={`text-[13px] font-bold text-center ${application.status === 'En Revisión' ? 'text-slate-800' : 'text-slate-700'}`}>Step 02<br/><span className={`${application.status === 'En Revisión' ? 'text-slate-800 font-bold' : 'text-gray-500 font-normal'}`}>En revisión</span></span>
             </div>

             {/* Step 3 */}
             <div className="flex flex-col items-center bg-white px-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-[16px] mb-3 shadow-sm ${application.status === 'Aprobada' ? 'bg-[#5d6e5c] text-white' : 'bg-white border-2 border-gray-100 text-gray-400'}`}>
                  3
                </div>
                <span className={`text-[13px] font-bold text-center ${application.status === 'Aprobada' ? 'text-slate-700' : 'text-gray-400'}`}>Step 03<br/><span className="font-normal">Aprobado</span></span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
