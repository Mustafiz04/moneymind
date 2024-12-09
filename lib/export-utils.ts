import { Transaction } from "@/types/supabase"
import jsPDF from "jspdf"
import autoTable from 'jspdf-autotable'
import { formatCurrency } from "./format"

export function exportToCSV(transactions: Transaction[], currencySymbol: string) {
  const headers = ["Date", "Type", "Category", "Amount", "Notes", "Tags"]
  const data = transactions.map(t => [
    new Date(t.date).toLocaleDateString(),
    t.type,
    t.category.name,
    `${formatCurrency(t.amount, currencySymbol)}`,
    t.notes || '',
    t.tags?.join(', ') || ''
  ])

  const csvContent = [
    headers.join(','),
    ...data.map(row => row.join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `transactions_${new Date().toISOString()}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToPDF(transactions: Transaction[], currencySymbol: string) {
  const doc = new jsPDF()

  const tableColumn = ["Date", "Type", "Category", "Amount", "Notes", "Tags"]
  const tableRows = transactions.map(t => [
    new Date(t.date).toLocaleDateString(),
    t.type,
    t.category.name,
    `${formatCurrency(t.amount, currencySymbol)}`,
    t.notes || '',
    t.tags?.join(', ') || ''
  ])

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185] },
  })

  doc.save(`transactions_${new Date().toISOString()}.pdf`)
} 