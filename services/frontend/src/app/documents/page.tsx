'use client'

import { useState, useRef } from 'react'
import { Upload, FileText, Image, Search, Filter, Eye, Download, Trash2, Mail } from 'lucide-react'

interface Document {
  id: string
  filename: string
  type: 'cmr' | 'delivery_note' | 'invoice' | 'image' | 'other'
  mimeType: string
  size: number
  uploadedAt: string
  transportRef: string | null
  source: 'upload' | 'email'
}

export default function DocumentsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      filename: 'CMR_SC-2025-1001.pdf',
      type: 'cmr',
      mimeType: 'application/pdf',
      size: 245000,
      uploadedAt: '2025-12-16 09:30',
      transportRef: 'SC-2025-1001',
      source: 'upload',
    },
    {
      id: '2',
      filename: 'Lieferschein_12345.pdf',
      type: 'delivery_note',
      mimeType: 'application/pdf',
      size: 180000,
      uploadedAt: '2025-12-15 14:20',
      transportRef: 'SC-2025-1002',
      source: 'email',
    },
    {
      id: '3',
      filename: 'Rechnung_Meier_AG.pdf',
      type: 'invoice',
      mimeType: 'application/pdf',
      size: 320000,
      uploadedAt: '2025-12-14 11:00',
      transportRef: null,
      source: 'email',
    },
    {
      id: '4',
      filename: 'Schadensbild_Transport.jpg',
      type: 'image',
      mimeType: 'image/jpeg',
      size: 1500000,
      uploadedAt: '2025-12-13 16:45',
      transportRef: 'SC-2025-0998',
      source: 'upload',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [isDragging, setIsDragging] = useState(false)

  const typeLabels: Record<string, string> = {
    cmr: 'CMR',
    delivery_note: 'Lieferschein',
    invoice: 'Rechnung',
    image: 'Bild',
    other: 'Sonstige',
  }

  const typeColors: Record<string, string> = {
    cmr: 'bg-blue-100 text-blue-800',
    delivery_note: 'bg-green-100 text-green-800',
    invoice: 'bg-purple-100 text-purple-800',
    image: 'bg-yellow-100 text-yellow-800',
    other: 'bg-gray-100 text-gray-800',
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFiles = (files: File[]) => {
    // TODO: API-Aufruf zum Hochladen
    files.forEach((file) => {
      const newDoc: Document = {
        id: Date.now().toString(),
        filename: file.name,
        type: 'other',
        mimeType: file.type,
        size: file.size,
        uploadedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
        transportRef: null,
        source: 'upload',
      }
      setDocuments((prev) => [newDoc, ...prev])
    })
  }

  const filteredDocuments = documents.filter((d) => {
    const matchesSearch = d.filename.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || d.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dokumente</h1>
          <p className="text-gray-500">Dokumentenmanagement und E-Mail-Anbindung</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Upload className="w-5 h-5 mr-2" />
          Hochladen
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
        />
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragging
            ? 'border-red-500 bg-red-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600">
          Dateien hierher ziehen oder{' '}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            durchsuchen
          </button>
        </p>
        <p className="text-sm text-gray-500 mt-2">PDF, JPG, PNG bis 10 MB</p>
      </div>

      {/* Email Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start">
          <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">E-Mail-Anbindung aktiv</h3>
            <p className="text-sm text-blue-700 mt-1">
              Senden Sie Dokumente an <strong>docs@swiss-connect.ch</strong> – sie werden automatisch
              verarbeitet und dem richtigen Transport zugeordnet.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Dokument suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
        >
          <option value="all">Alle Typen</option>
          <option value="cmr">CMR</option>
          <option value="delivery_note">Lieferschein</option>
          <option value="invoice">Rechnung</option>
          <option value="image">Bild</option>
          <option value="other">Sonstige</option>
        </select>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                {doc.mimeType.startsWith('image/') ? (
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Image className="w-5 h-5 text-yellow-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                    {doc.filename}
                  </p>
                  <p className="text-xs text-gray-500">{formatFileSize(doc.size)}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeColors[doc.type]}`}>
                {typeLabels[doc.type]}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-xs text-gray-500">
                <span>{doc.uploadedAt}</span>
                <span className="flex items-center">
                  {doc.source === 'email' ? (
                    <>
                      <Mail className="w-3 h-3 mr-1" />
                      E-Mail
                    </>
                  ) : (
                    <>
                      <Upload className="w-3 h-3 mr-1" />
                      Upload
                    </>
                  )}
                </span>
              </div>
              {doc.transportRef && (
                <p className="text-xs text-blue-600 mt-1">
                  Verknüpft: {doc.transportRef}
                </p>
              )}
            </div>

            <div className="mt-3 flex justify-end gap-2">
              <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-gray-400 hover:text-red-600 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
