'use client'

import { useState } from 'react'
import { Play, Square, Clock, Calendar, User } from 'lucide-react'

interface TimeEntry {
  id: string
  user: string
  date: string
  startTime: string
  endTime: string | null
  duration: number | null
  description: string
  transportRef: string | null
}

export default function TimePage() {
  const [isTracking, setIsTracking] = useState(false)
  const [currentDescription, setCurrentDescription] = useState('')
  const [trackingStartTime, setTrackingStartTime] = useState<Date | null>(null)

  const [entries, setEntries] = useState<TimeEntry[]>([
    {
      id: '1',
      user: 'M. Müller',
      date: '2025-12-16',
      startTime: '08:00',
      endTime: '12:30',
      duration: 270,
      description: 'Transport SC-2025-1001',
      transportRef: 'SC-2025-1001',
    },
    {
      id: '2',
      user: 'M. Müller',
      date: '2025-12-16',
      startTime: '13:30',
      endTime: '17:00',
      duration: 210,
      description: 'Transport SC-2025-1003',
      transportRef: 'SC-2025-1003',
    },
    {
      id: '3',
      user: 'P. Weber',
      date: '2025-12-16',
      startTime: '07:30',
      endTime: '16:00',
      duration: 510,
      description: 'Büroarbeit & Disposition',
      transportRef: null,
    },
    {
      id: '4',
      user: 'K. Schmidt',
      date: '2025-12-15',
      startTime: '06:00',
      endTime: '14:30',
      duration: 510,
      description: 'Transport SC-2025-1002',
      transportRef: 'SC-2025-1002',
    },
  ])

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const handleStartTracking = () => {
    setIsTracking(true)
    setTrackingStartTime(new Date())
  }

  const handleStopTracking = () => {
    if (!trackingStartTime) return

    const endTime = new Date()
    const duration = Math.round((endTime.getTime() - trackingStartTime.getTime()) / 60000)

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      user: 'Admin User',
      date: trackingStartTime.toISOString().slice(0, 10),
      startTime: trackingStartTime.toTimeString().slice(0, 5),
      endTime: endTime.toTimeString().slice(0, 5),
      duration,
      description: currentDescription || 'Keine Beschreibung',
      transportRef: null,
    }

    setEntries([newEntry, ...entries])
    setIsTracking(false)
    setTrackingStartTime(null)
    setCurrentDescription('')
  }

  const todayEntries = entries.filter((e) => e.date === '2025-12-16')
  const todayTotal = todayEntries.reduce((sum, e) => sum + (e.duration || 0), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Zeiterfassung</h1>
        <p className="text-gray-500">Arbeitszeiten erfassen und verwalten</p>
      </div>

      {/* Timer Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Zeiterfassung starten</h2>
            <input
              type="text"
              placeholder="Was arbeitest du gerade? (optional)"
              value={currentDescription}
              onChange={(e) => setCurrentDescription(e.target.value)}
              disabled={isTracking}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-50"
            />
          </div>
          <div className="ml-6 flex flex-col items-center">
            {isTracking && trackingStartTime && (
              <div className="text-3xl font-mono font-bold text-gray-900 mb-2">
                {formatDuration(
                  Math.round((Date.now() - trackingStartTime.getTime()) / 60000)
                )}
              </div>
            )}
            <button
              onClick={isTracking ? handleStopTracking : handleStartTracking}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                isTracking
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isTracking ? (
                <Square className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </button>
            <span className="text-sm text-gray-500 mt-2">
              {isTracking ? 'Stoppen' : 'Starten'}
            </span>
          </div>
        </div>
      </div>

      {/* Today Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Heute gearbeitet</p>
              <p className="text-2xl font-bold text-gray-900">{formatDuration(todayTotal)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Einträge heute</p>
              <p className="text-2xl font-bold text-gray-900">{todayEntries.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Aktive Mitarbeiter</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Time Entries Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Zeiteinträge</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mitarbeiter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Datum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Zeit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dauer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Beschreibung
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transport
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entry.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.startTime} - {entry.endTime || 'läuft'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {entry.duration ? formatDuration(entry.duration) : '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {entry.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {entry.transportRef ? (
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      {entry.transportRef}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Swiss21/Bexio Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start">
          <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Swiss21 / Bexio Sync</h3>
            <p className="text-sm text-blue-700 mt-1">
              Zeiteinträge können automatisch an Swiss21 oder Bexio übertragen werden.
              Konfigurieren Sie die Integration in den Einstellungen.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
