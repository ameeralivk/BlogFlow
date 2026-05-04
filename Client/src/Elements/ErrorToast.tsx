import { toast } from "react-toastify";


const ErrorIcon = () => (
  <div className="flex-shrink-0 w-5 h-5 bg-red-50 rounded-xl flex items-center justify-center border border-red-100 group-hover:rotate-12 transition-transform duration-300">
    <svg
      className="w-5 h-5 text-red-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>
  </div>
);

export const showErrorToast = (message: string = "Something went wrong!") => {
  toast.error(message, {
    toastId: "global-error-toast", // 👈 prevents duplicates
    icon: <ErrorIcon />,
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className:
      "!bg-white !shadow-[0_20px_50px_rgba(0,0,0,0.1)] !border !border-slate-100 !rounded-2xl !p-3 !min-h-[70px] !flex !items-center !justify-center !gap-3 !text-slate-900 !font-['Sora',sans-serif] !text-sm !font-semibold !text-center group",
  });
};
