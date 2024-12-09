import { Transaction } from "@/types"
import { format } from "date-fns"
import jsPDF from "jspdf"
import autoTable from 'jspdf-autotable'

// Add type augmentation for jsPDF
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => void;
  }
}

export const exportToCSV = (transactions: Transaction[]) => {
  // Format transactions for CSV
  const csvData = transactions.map(t => ({
    Date: format(new Date(t.date), "yyyy-MM-dd"),
    Type: t.type,
    Category: t.category,
    Amount: t.amount.toFixed(2),
    Tags: t.tags,
    Notes: t.notes
  }))

  // Create CSV content
  const headers = ["Date", "Type", "Category", "Amount", "Tags", "Notes"]
  const csvContent = [
    headers.join(","),
    ...csvData.map(row => 
      headers.map(header => 
        `"${row[header as keyof typeof row]}"`
      ).join(",")
    )
  ].join("\n")

  // Create and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `transactions_${format(new Date(), "yyyy-MM-dd")}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const exportToPDF = (transactions: Transaction[]) => {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(16)
  doc.text("Transaction Report", 14, 15)
  doc.setFontSize(10)
  doc.text(`Generated on ${format(new Date(), "PPP")}`, 14, 25)

  // Format data for table
  const tableData = transactions.map(t => [
    format(new Date(t.date), "PPP"),
    t.type,
    t.category,
    `$${t.amount.toFixed(2)}`,
    t.tags,
    t.notes
  ])

  // Add table
  doc.autoTable({
    startY: 30,
    head: [["Date", "Type", "Category", "Amount", "Tags", "Notes"]],
    body: tableData,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [51, 51, 51] },
    alternateRowStyles: { fillColor: [245, 245, 245] }
})

  // Save PDF
  doc.save(`transactions_${format(new Date(), "yyyy-MM-dd")}.pdf`)
} 