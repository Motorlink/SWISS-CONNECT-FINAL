'use client'

import { useState } from 'react'
import { MessageSquare, Phone, Mic, Send, Bot, User, Clock, CheckCircle } from 'lucide-react'

interface Message {
  id: string
  type: 'incoming' | 'outgoing' | 'ai_draft'
  channel: 'text' | 'voice'
  sender: string
  content: string
  timestamp: string
  status?: 'pending' | 'sent' | 'read'
  aiSuggestion?: string
}

interface Conversation {
  id: string
  customer: string
  channel: 'whatsapp' | 'sms' | 'voice'
  lastMessage: string
  timestamp: string
  unread: number
  status: 'open' | 'resolved'
}

export default function SupportPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      customer: 'Meier AG',
      channel: 'whatsapp',
      lastMessage: 'Wann kommt die Lieferung an?',
      timestamp: '10:45',
      unread: 2,
      status: 'open',
    },
    {
      id: '2',
      customer: 'Schmidt GmbH',
      channel: 'voice',
      lastMessage: '[Sprachnachricht - 0:45]',
      timestamp: '09:30',
      unread: 1,
      status: 'open',
    },
    {
      id: '3',
      customer: 'Weber Transport',
      channel: 'whatsapp',
      lastMessage: 'Danke für die schnelle Lieferung!',
      timestamp: 'Gestern',
      unread: 0,
      status: 'resolved',
    },
  ])

  const [selectedConversation, setSelectedConversation] = useState<string | null>('1')

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'incoming',
      channel: 'text',
      sender: 'Meier AG',
      content: 'Guten Tag, ich wollte fragen wann die Lieferung SC-2025-1001 ankommt?',
      timestamp: '10:30',
    },
    {
      id: '2',
      type: 'ai_draft',
      channel: 'text',
      sender: 'KI-Assistent',
      content: 'Guten Tag! Die Lieferung SC-2025-1001 ist aktuell unterwegs und wird voraussichtlich um 14:30 Uhr bei Ihnen eintreffen. Der Fahrer M. Müller ist bereits auf der A1 bei Aarau.',
      timestamp: '10:31',
      aiSuggestion: 'Automatisch generierter Entwurf basierend auf Tracking-Daten',
    },
    {
      id: '3',
      type: 'incoming',
      channel: 'text',
      sender: 'Meier AG',
      content: 'Wann kommt die Lieferung an?',
      timestamp: '10:45',
    },
  ])

  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      type: 'outgoing',
      channel: 'text',
      sender: 'Support',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const handleUseDraft = (draft: Message) => {
    setNewMessage(draft.content)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Support</h1>
        <p className="text-gray-500">Kundenkommunikation via Superchat</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        {/* Conversation List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Konversationen</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                  selectedConversation === conv.id
                    ? 'bg-red-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {conv.channel === 'voice' ? (
                        <Phone className="w-5 h-5 text-gray-500" />
                      ) : (
                        <MessageSquare className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{conv.customer}</p>
                      <p className="text-sm text-gray-500 truncate max-w-[150px]">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{conv.timestamp}</p>
                    {conv.unread > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full mt-1">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">Meier AG</p>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                <Bot className="w-3 h-3 mr-1" />
                KI aktiv
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-xl p-3 ${
                    msg.type === 'outgoing'
                      ? 'bg-red-600 text-white'
                      : msg.type === 'ai_draft'
                      ? 'bg-blue-50 border border-blue-200'
                      : 'bg-gray-100'
                  }`}
                >
                  {msg.type === 'ai_draft' && (
                    <div className="flex items-center text-xs text-blue-600 mb-2">
                      <Bot className="w-3 h-3 mr-1" />
                      KI-Entwurf
                    </div>
                  )}
                  {msg.channel === 'voice' && (
                    <div className="flex items-center text-sm mb-2">
                      <Mic className="w-4 h-4 mr-2" />
                      Sprachnachricht transkribiert
                    </div>
                  )}
                  <p className={msg.type === 'outgoing' ? 'text-white' : 'text-gray-900'}>
                    {msg.content}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className={`text-xs ${
                        msg.type === 'outgoing' ? 'text-red-200' : 'text-gray-500'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                    {msg.type === 'ai_draft' && (
                      <button
                        onClick={() => handleUseDraft(msg)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Verwenden
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Nachricht schreiben..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KI Info */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <div className="flex items-start">
          <Bot className="w-5 h-5 text-purple-600 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-purple-800">KI-Assistent aktiv</h3>
            <p className="text-sm text-purple-700 mt-1">
              Der KI-Assistent analysiert eingehende Nachrichten und Sprachnachrichten automatisch.
              Er erstellt Antwortentwürfe, erkennt Aufgaben und eskaliert bei Bedarf.
              Alle Vorschläge müssen vor dem Versand bestätigt werden.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
