import { toast } from "react-toastify";

let isSuccessToastVisible = false;

const SuccessIcon = () => (
  <div className="flex-shrink-0 w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 group-hover:rotate-12 transition-transform duration-300">
    <svg
      className="w-5 h-5 text-emerald-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </div>
);

export const showSuccessToast = (message: string = "Operation successful!") => {
  if (isSuccessToastVisible) return;

  isSuccessToastVisible = true;

  toast.success(message, {
    icon: <SuccessIcon />,
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className:
      "!bg-white !shadow-[0_20px_50px_rgba(0,0,0,0.1)] !border !border-slate-100 !rounded-2xl !p-3 !min-h-[70px] !flex !items-center !justify-center !gap-3 !text-slate-900 !font-['Sora',sans-serif] !text-sm !font-semibold !text-center group",
    onClose: () => {
      isSuccessToastVisible = false;
    },
  });
};
