import React from "react"

// Simple toast implementation without complex state management
export type ToastType = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive"
}

type ToastState = {
  toasts: ToastType[]
}

type ToastAction = 
  | { type: "ADD_TOAST"; toast: ToastType }
  | { type: "REMOVE_TOAST"; id: string }

let toastCount = 0
const generateId = () => `toast-${++toastCount}`

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, action.toast]
      }
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.id)
      }
    default:
      return state
  }
}

// Global state for toasts
let globalState: ToastState = { toasts: [] }
const listeners: Array<(state: ToastState) => void> = []

const dispatch = (action: ToastAction) => {
  globalState = toastReducer(globalState, action)
  listeners.forEach(listener => listener(globalState))
}

export function toast({ title, description, variant = "default" }: Omit<ToastType, "id">) {
  const id = generateId()
  
  dispatch({
    type: "ADD_TOAST",
    toast: { id, title, description, variant }
  })

  // Auto remove after 3 seconds
  setTimeout(() => {
    dispatch({ type: "REMOVE_TOAST", id })
  }, 3000)

  return { id }
}

export function useToast() {
  const [state, setState] = React.useState<ToastState>(globalState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])
  return {
    toasts: state.toasts,
    toast,
    dismiss: (id: string) => dispatch({ type: "REMOVE_TOAST", id })
  }
}
