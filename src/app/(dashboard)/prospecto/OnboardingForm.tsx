"use client";

import { useState, useRef } from "react";
import { submitApplication } from "./actions";
import Image from "next/image";

export default function OnboardingForm({ properties }: { properties: { id: string, title: string }[] }) {
  const [preference, setPreference] = useState<string>("Vacía");
  const [selectedProperty, setSelectedProperty] = useState<string>(properties[0]?.id || "");
  const [duiFile, setDuiFile] = useState<File | null>(null);
  const [incomeFile, setIncomeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const duiInputRef = useRef<HTMLInputElement>(null);
  const incomeInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!duiFile || !incomeFile) {
      setError("Por favor, sube ambos documentos requeridos.");
      return;
    }
    if (!selectedProperty) {
      setError("Por favor, selecciona una propiedad.");
      return;
    }
    
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("dui_file", duiFile);
    formData.append("income_file", incomeFile);
    formData.append("rental_preference", preference);
    formData.append("property_id", selectedProperty);

    const result = await submitApplication(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // If successful, revalidatePath will refresh the page to show the Stepper
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (file: File) => void) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-[1000px] w-full">
      <div className="mb-10">
        <h1 className="text-[20px] font-semibold text-slate-800 mb-2">Application Journey</h1>
        <p className="text-gray-500 text-[14px]">
          Complete your application profile to secure your future home. We require a few essential documents to finalize your review.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Column - Preferences & Property */}
        <div>
          <h2 className="text-[14px] font-semibold text-slate-800 mb-4">Property Selection</h2>
          <p className="text-[13px] text-gray-500 mb-4 leading-relaxed">
            Select the property you are applying for.
          </p>
          <div className="mb-8">
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5d6e5c] focus:border-transparent cursor-pointer"
            >
              <option value="" disabled>Selecciona una propiedad</option>
              {properties.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          <h2 className="text-[14px] font-semibold text-slate-800 mb-4">Rental Mode Preference</h2>
          <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">
            Select how you would like to receive the property. This affects your final monthly estimate.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Option 1 */}
            <div 
              onClick={() => setPreference("Amueblada")}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-colors ${preference === 'Amueblada' ? 'border-[#5d6e5c] bg-white' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <svg className={`w-6 h-6 ${preference === 'Amueblada' ? 'text-[#5d6e5c]' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 11v6a2 2 0 002 2h14a2 2 0 002-2v-6M3 11h18M5 15h14M8 7h8" />
                </svg>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${preference === 'Amueblada' ? 'border-[#5d6e5c]' : 'border-gray-300'}`}>
                  {preference === 'Amueblada' && <div className="w-2 h-2 rounded-full bg-[#5d6e5c]"></div>}
                </div>
              </div>
              <h3 className="text-[14px] font-bold text-slate-800 mb-2">Amueblada</h3>
              <p className="text-[12px] text-gray-500 leading-relaxed mb-4">
                Fully equipped with premium furniture and appliances. Ready to move in.
              </p>
              <p className="text-[13px] font-semibold text-gray-400">+ $450/mo</p>
            </div>

            {/* Option 2 */}
            <div 
              onClick={() => setPreference("Vacía")}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-colors ${preference === 'Vacía' ? 'border-[#5d6e5c] bg-white' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <svg className={`w-6 h-6 ${preference === 'Vacía' ? 'text-[#5d6e5c]' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${preference === 'Vacía' ? 'border-[#5d6e5c]' : 'border-gray-300'}`}>
                  {preference === 'Vacía' && <div className="w-2 h-2 rounded-full bg-[#5d6e5c]"></div>}
                </div>
              </div>
              <h3 className="text-[14px] font-bold text-slate-800 mb-2">Vacía</h3>
              <p className="text-[12px] text-gray-500 leading-relaxed mb-4">
                A blank canvas. Bring your own furniture and personal touch.
              </p>
              <p className="text-[13px] font-semibold text-gray-400">Base Rate</p>
            </div>
          </div>

          {/* Assigned Agent Card */}
          <div className="bg-gray-100/70 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <Image src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Agent" width={40} height={40} />
               </div>
               <div>
                 <p className="text-[13px] font-bold text-slate-800">Sarah Jenkins</p>
                 <p className="text-[11px] text-gray-500 font-medium">Assigned Leasing Agent</p>
               </div>
            </div>
            <button type="button" className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-slate-800">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
               </svg>
            </button>
          </div>
        </div>

        {/* Right Column - Documents */}
        <div>
          <h2 className="text-[14px] font-semibold text-slate-800 mb-4">Required Documents</h2>
          <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">
            Please upload the following documents to proceed with your application review.
          </p>

          {/* DUI File Upload */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-4">
             <div className="flex justify-between items-start mb-6">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                     </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800">DUI (Documento Único de Identidad)</p>
                    <p className="text-[12px] text-gray-500 mt-0.5">Front and back scan. Max 5MB (PDF, JPG, PNG)</p>
                  </div>
                </div>
                {!duiFile && <span className="px-2 py-0.5 bg-red-50 text-red-500 text-[10px] font-bold rounded uppercase">Required</span>}
                {duiFile && <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase">Uploaded</span>}
             </div>
             
             {/* Dropzone */}
             <div 
               onClick={() => duiInputRef.current?.click()}
               className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
             >
                <input 
                  type="file" 
                  ref={duiInputRef} 
                  className="hidden" 
                  accept=".pdf,image/png,image/jpeg"
                  onChange={(e) => handleFileChange(e, setDuiFile)}
                />
                {!duiFile ? (
                  <>
                    <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <p className="text-[13px] text-slate-600 font-medium">Click to upload or drag and drop</p>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6 text-[#5d6e5c] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[13px] text-slate-800 font-bold text-center break-all">{duiFile.name}</p>
                    <p className="text-[11px] text-gray-500">{(duiFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </>
                )}
             </div>
          </div>

          {/* Income File Upload */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-8">
             <div className="flex justify-between items-start mb-6">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                     </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800">Proof of Income</p>
                    <p className="text-[12px] text-gray-500 mt-0.5">Last 3 months of bank statements or pay stubs.</p>
                  </div>
                </div>
                {!incomeFile && <span className="px-2 py-0.5 bg-red-50 text-red-500 text-[10px] font-bold rounded uppercase">Required</span>}
                {incomeFile && <span className="px-2 py-0.5 bg-[#5d6e5c] text-white text-[10px] font-bold rounded uppercase">Uploaded</span>}
             </div>
             
             {/* Uploaded state look if file exists, else dropzone look */}
             <div 
               onClick={() => incomeInputRef.current?.click()}
               className={`border-2 rounded-xl p-4 flex items-center cursor-pointer transition-colors ${incomeFile ? 'border-gray-100 bg-gray-50' : 'border-dashed border-gray-200 p-8 flex-col justify-center hover:bg-gray-50'}`}
             >
                <input 
                  type="file" 
                  ref={incomeInputRef} 
                  className="hidden" 
                  accept=".pdf,image/png,image/jpeg"
                  onChange={(e) => handleFileChange(e, setIncomeFile)}
                />
                {!incomeFile ? (
                  <>
                    <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <p className="text-[13px] text-slate-600 font-medium">Click to upload or drag and drop</p>
                  </>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-8 h-8 bg-white rounded shadow-sm flex items-center justify-center text-gray-500 flex-shrink-0">
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                         </svg>
                      </div>
                      <div className="truncate">
                        <p className="text-[13px] font-bold text-slate-800 truncate">{incomeFile.name}</p>
                        <p className="text-[11px] text-gray-500">{(incomeFile.size / 1024 / 1024).toFixed(2)} MB • Ready to upload</p>
                      </div>
                    </div>
                    <button type="button" onClick={(e) => { e.stopPropagation(); setIncomeFile(null); }} className="text-gray-400 hover:text-red-500 p-2">
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                       </svg>
                    </button>
                  </div>
                )}
             </div>
          </div>

          {error && <p className="text-red-500 text-[13px] font-medium text-right mb-4">{error}</p>}

          {/* Form Actions */}
          <div className="flex justify-end items-center gap-4">
             <button type="button" className="text-[13px] font-medium text-gray-500 hover:text-slate-800 transition-colors">
               Save for Later
             </button>
             <button 
               type="submit" 
               disabled={loading || !duiFile || !incomeFile}
               className={`flex items-center gap-2 px-6 py-3 rounded-lg text-[13px] font-medium transition-colors ${loading || !duiFile || !incomeFile ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#5d6e5c] hover:bg-[#4A5E50] text-white shadow-sm'}`}
             >
               {loading ? 'Subiendo archivos...' : 'Submit Application'}
               {!loading && (
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                 </svg>
               )}
             </button>
          </div>
        </div>

      </form>
    </div>
  );
}
