import React from 'react'
import Layout from '../../Components/Layout'
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function NotesPage() {
  return (
    <Layout title="Notes">
      <div className="min-h-screen bg-[#0d1528] text-[#dae2fd] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#111a2d] border border-[#252e43] rounded-2xl p-8 text-center shadow-2xl">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c0c1ff]/10 text-[#c0c1ff] text-xs font-medium mb-6 border border-[#c0c1ff]/20">
          <Sparkles size={14} />
          <span>Coming Soon</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold tracking-tight mb-3 text-[#dae2fd]">
          Something awesome is brewing
        </h1>

        {/* Description */}
        <p className="text-[#6f7485] text-sm leading-relaxed mb-8">
          We are working hard behind the scenes to bring you this feature. Stay tuned for updates!
        </p>

        {/* Action Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#c0c1ff] text-[#0d1020] font-medium text-sm hover:bg-[#d6d7ff] transition-all shadow-lg shadow-[#c0c1ff]/5"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </div>
    </div>
    </Layout>
  )
}

export default NotesPage

// // src/pages/ComingSoon.jsx
// import React from 'react';
// import { Sparkles, ArrowLeft } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export default function ComingSoon() {
//   return (
//     <div className="min-h-screen bg-[#0d1528] text-[#dae2fd] flex items-center justify-center px-4">
//       <div className="max-w-md w-full bg-[#111a2d] border border-[#252e43] rounded-2xl p-8 text-center shadow-2xl">
        
//         {/* Badge */}
//         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c0c1ff]/10 text-[#c0c1ff] text-xs font-medium mb-6 border border-[#c0c1ff]/20">
//           <Sparkles size={14} />
//           <span>Coming Soon</span>
//         </div>

//         {/* Heading */}
//         <h1 className="text-2xl font-bold tracking-tight mb-3 text-[#dae2fd]">
//           Something awesome is brewing
//         </h1>

//         {/* Description */}
//         <p className="text-[#6f7485] text-sm leading-relaxed mb-8">
//           We are working hard behind the scenes to bring you this feature. Stay tuned for updates!
//         </p>

//         {/* Action Button */}
//         <Link
//           to="/dashboard"
//           className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#c0c1ff] text-[#0d1020] font-medium text-sm hover:bg-[#d6d7ff] transition-all shadow-lg shadow-[#c0c1ff]/5"
//         >
//           <ArrowLeft size={16} />
//           Back to Dashboard
//         </Link>
//       </div>
//     </div>
//   );
// }
