import { useToast } from '@/hooks/use-toast'

export function Toaster() {
  const { toasts, dismiss } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`min-w-80 rounded-lg border p-4 shadow-lg transition-all duration-300 ${
            toast.variant === "destructive"
              ? "border-red-200 bg-red-50 text-red-900"
              : "border-green-200 bg-green-50 text-green-900"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {toast.title && (
                <div className="font-semibold text-sm mb-1">{toast.title}</div>
              )}
              {toast.description && (
                <div className="text-sm opacity-90">{toast.description}</div>
              )}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="ml-4 text-current opacity-50 hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
