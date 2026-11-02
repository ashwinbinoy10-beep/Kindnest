import { createContext, useCallback, useContext, useEffect, useState } from 'react'

export function useLocal(key, init) {
  const [v, setV] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init } catch { return init }
  })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* storage unavailable */ } }, [key, v])
  return [v, setV]
}

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

export function AppProvider({ children }) {
  const [impact, setImpact] = useLocal('kn-impact', { actions: 12, appreciated: 8, challenges: 1, contrib: 3 })
  const [toast, setToast] = useState(null)
  const say = useCallback((m) => setToast({ m, id: Date.now() }), [])
  const bump = useCallback((k) => setImpact((i) => ({ ...i, [k]: i[k] + 1 })), [setImpact])
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])
  return <Ctx.Provider value={{ impact, bump, say, toast }}>{children}</Ctx.Provider>
}
