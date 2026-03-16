'use client'

import { useState } from 'react'
import { Plus, FileText, Download, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface Invoice {
  id: string
  invoiceNumber: string
  customer: string
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  issueDate: string
  dueDate: string
  transportCount: number
}

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'credits'>('invoices')
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'RE-2025-0101',
      customer: 'Meier AG',
      amount: 2450,
      status: 'paid',
      issueDate: '2025-12-01',
      dueDate: '2025-12-31',
      transportCount: 5,
    },
    {
      id: '2',
      invoiceNumber: 'RE-2025-0102',
      customer: 'Schmidt GmbH',
      amount: 1890,
      status: 'sent',
      issueDate: '2025-12-10',
      dueDate: '2026-01-09',
      transportCount: 3,
    },
    {
      id: '3',
      invoiceNumber: 'RE-2025-0103',
      customer: 'Weber Transport',
      amount: 3200,
      status: 'draft',
      issueDate: '2025-12-15',
      dueDate: '2026-01-14',
      transportCount: 7,
    },
    {
      id: '4',
      invoiceNumber: 'RE-2025-0098',
      customer: 'Huber Logistik',
      amount: 980,
      status: 'overdue',
      issueDate: '2025-11-15',
      dueDate: '2025-12-15',
      transportCount: 2,
    },
  ])

  const statusConfig = {
    draft: { label: 'Entwurf', color: 'bg-gray-100 text-gray-800', icon: FileText },
    sent: { label: 'Versendet', color: 'bg-blue-100 text-blue-800', icon: Send },
    paid: { label: 'Bezahlt', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    overdue: { label: 'Überfällig', color: 'bg-red-100 text-red-800', icon: AlertCircle },
  }

  const stats = {
    total: invoices.reduce((sum, i) => sum + i.amount, 0),
    paid: invoices.filter((i) => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0),
    pending: invoices.filter((i) => i.status === 'sent').reduce((sum, i) => sum + i.amount, 0),
    overdue: invoices.filter((i) => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Abrechnung</h1>
          <p className="text-gray-500">Rechnungen und Gutschriften verwalten</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Neue Rechnung
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Gesamt</p>
          <p className="text-2xl font-bold text-gray-900">CHF {stats.total.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Bezahlt</p>
          <p className="text-2xl font-bold text-green-600">CHF {stats.paid.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Ausstehend</p>
          <p className="text-2xl font-bold text-blue-600">CHF {stats.pending.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Überfällig</p>
          <p className="text-2xl font-bold text-red-600">CHF {stats.overdue.toLocaleString()}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('invoices')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'invoices'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Rechnungen
          </button>
          <button
            onClick={() => setActiveTab('credits')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'credits'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Gutschriften
          </button>
        </nav>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rechnungsnr.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kunde
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Betrag
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rechnungsdatum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fällig
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map((invoice) => {
              const StatusIcon = statusConfig[invoice.status].icon
              return (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                      {invoice.invoiceNumber}
                    </span>
                    <p className="text-xs text-gray-500">{invoice.transportCount} Transporte</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[invoice.status].color}`}
                    >
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig[invoice.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    CHF {invoice.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.issueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600" title="Herunterladen">
                        <Download className="w-5 h-5" />
                      </button>
                      {invoice.status === 'draft' && (
                        <button className="p-1 text-blue-400 hover:text-blue-600" title="Versenden">
                          <Send className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Swiss21/Bexio Integration Hint */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Swiss21 / Bexio Integration</h3>
            <p className="text-sm text-blue-700 mt-1">
              Die Anbindung an Swiss21 und Bexio ist vorbereitet. Konfigurieren Sie Ihre API-Schlüssel
              in den Einstellungen, um Rechnungen automatisch zu synchronisieren.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
