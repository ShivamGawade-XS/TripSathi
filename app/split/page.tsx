"use client"
import { useState } from "react"
import Link from "next/link"

interface Traveler { id: string; name: string; paid: number }
interface Expense { id: string; desc: string; amount: number; paidBy: string }

export default function GroupSplitPage() {
  const [travelers, setTravelers] = useState<Traveler[]>([
    { id: "T1", name: "You", paid: 0 },
  ])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [newName, setNewName] = useState("")
  const [expForm, setExpForm] = useState({ desc: "", amount: "", paidBy: "T1" })
  const [shareLink, setShareLink] = useState("")

  const addTraveler = () => {
    if (!newName.trim()) return
    const id = `T${travelers.length + 1}`
    setTravelers([...travelers, { id, name: newName.trim(), paid: 0 }])
    setNewName("")
  }

  const removeTraveler = (id: string) => {
    if (id === "T1") return
    setTravelers(travelers.filter(t => t.id !== id))
    setExpenses(expenses.filter(e => e.paidBy !== id))
  }

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault()
    const exp: Expense = {
      id: `E${Date.now()}`,
      desc: expForm.desc,
      amount: Number(expForm.amount),
      paidBy: expForm.paidBy,
    }
    setExpenses([...expenses, exp])
    setExpForm({ desc: "", amount: "", paidBy: "T1" })
  }

  const removeExpense = (id: string) => setExpenses(expenses.filter(e => e.id !== id))

  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0)
  const perPerson = travelers.length > 0 ? totalExpense / travelers.length : 0

  const paidMap: Record<string, number> = {}
  travelers.forEach(t => { paidMap[t.id] = 0 })
  expenses.forEach(e => { if (paidMap[e.paidBy] !== undefined) paidMap[e.paidBy] += e.amount })

  const settlements: { from: string; to: string; amount: number }[] = []
  const balances = travelers.map(t => ({ ...t, balance: paidMap[t.id] - perPerson }))
  const debtors = balances.filter(b => b.balance < 0).map(b => ({ ...b, balance: Math.abs(b.balance) }))
  const creditors = balances.filter(b => b.balance > 0).map(b => ({ ...b }))

  let di = 0, ci = 0
  const d = [...debtors], c = [...creditors]
  while (di < d.length && ci < c.length) {
    const amt = Math.min(d[di].balance, c[ci].balance)
    if (amt > 0.01) settlements.push({ from: d[di].name, to: c[ci].name, amount: Math.round(amt * 100) / 100 })
    d[di].balance -= amt
    c[ci].balance -= amt
    if (d[di].balance < 0.01) di++
    if (c[ci].balance < 0.01) ci++
  }

  const generateShareLink = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setShareLink(`https://tripsathi.com/split/${code}`)
  }

  return (
    <div className="min-h-screen bg-surface-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold text-surface-800">💰 Group Travel Split</h1>
          <p className="text-surface-500 mt-2">Split costs across co-travelers fairly. No awkward math.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Travelers */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="font-bold text-lg text-surface-800 mb-4">👥 Travelers ({travelers.length})</h2>
            <div className="space-y-2 mb-4">
              {travelers.map(t => (
                <div key={t.id} className="flex items-center justify-between bg-surface-50 rounded-lg px-3 py-2">
                  <span className="font-medium text-surface-700">{t.name}</span>
                  {t.id !== "T1" && (
                    <button onClick={() => removeTraveler(t.id)} className="text-red-400 hover:text-red-600 text-sm">✕</button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === "Enter" && addTraveler()} placeholder="Add traveler name" className="flex-1 px-3 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
              <button onClick={addTraveler} className="btn-primary py-2 px-3 text-sm">Add</button>
            </div>
          </div>

          {/* Expenses */}
          <div className="bg-white rounded-2xl shadow-md p-6 lg:col-span-2">
            <h2 className="font-bold text-lg text-surface-800 mb-4">🧾 Expenses</h2>
            <form onSubmit={addExpense} className="flex flex-wrap gap-3 mb-4 pb-4 border-b">
              <input required value={expForm.desc} onChange={e => setExpForm({...expForm, desc: e.target.value})} placeholder="What for? e.g. Hotel" className="flex-1 min-w-[140px] px-3 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
              <input required type="number" min="1" value={expForm.amount} onChange={e => setExpForm({...expForm, amount: e.target.value})} placeholder="₹ Amount" className="w-28 px-3 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
              <select value={expForm.paidBy} onChange={e => setExpForm({...expForm, paidBy: e.target.value})} className="px-3 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-primary-500 outline-none">
                {travelers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              <button type="submit" className="btn-primary py-2 px-4 text-sm">+ Add</button>
            </form>

            {expenses.length === 0 ? (
              <p className="text-surface-400 text-center py-8">No expenses added yet. Start adding above!</p>
            ) : (
              <div className="space-y-2">
                {expenses.map(exp => (
                  <div key={exp.id} className="flex items-center justify-between bg-surface-50 rounded-lg px-4 py-3">
                    <div>
                      <span className="font-medium text-surface-700">{exp.desc}</span>
                      <span className="text-surface-400 text-sm ml-2">paid by {travelers.find(t => t.id === exp.paidBy)?.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-surface-800">₹{exp.amount.toLocaleString()}</span>
                      <button onClick={() => removeExpense(exp.id)} className="text-red-400 hover:text-red-600 text-sm">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {expenses.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4">📊 Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-white/80">Total Expenses</span><span className="font-bold text-xl">₹{totalExpense.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-white/80">Per Person</span><span className="font-bold text-xl">₹{Math.round(perPerson).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-white/80">Travelers</span><span className="font-bold">{travelers.length}</span></div>
              </div>
              <button onClick={generateShareLink} className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg transition-colors font-medium">
                🔗 Share Split Link
              </button>
              {shareLink && <p className="mt-2 text-xs text-white/70 text-center break-all">{shareLink}</p>}
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-lg text-surface-800 mb-4">🔄 Settlements</h3>
              {settlements.length === 0 ? (
                <p className="text-green-600 font-medium text-center py-4">✅ All settled! No payments needed.</p>
              ) : (
                <div className="space-y-3">
                  {settlements.map((s, i) => (
                    <div key={i} className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-surface-800">{s.from}</span>
                        <span className="text-surface-400">→</span>
                        <span className="font-medium text-surface-800">{s.to}</span>
                      </div>
                      <span className="font-bold text-amber-700">₹{s.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
