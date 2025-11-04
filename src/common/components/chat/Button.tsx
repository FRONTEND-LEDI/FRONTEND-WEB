'use client'
import { X, Send } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { chat } from '../../../db/services/chat'
import { useAuth } from '../../../context/AuthContext'
// Tipo para los mensajes
type Message = {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function ButtonIA() {
  
  const {user} = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
 
  // Auto scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (input.trim() === "" || isLoading) return

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

    // Agregar mensaje del usuario
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await chat(input, sessionId)
      console.log("Respuesta del servidor:", response)

      // Extraer el texto de la respuesta
      let botText = ''
      if (Array.isArray(response) && response.length > 0) {
        botText = response[0]?.output || response[0]?.text || JSON.stringify(response)
      } else if (typeof response === 'string') {
        botText = response
      } else if (response?.output) {
        botText = response.output
      } else if (response?.text) {
        botText = response.text
      } else {
        botText = JSON.stringify(response)
      }

      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        text: botText,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error: any) {
      console.error("Error al enviar mensaje:", error)
      
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        text: error?.message || "Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo.",
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }
if (!user) return null;
  return (
    <>
      {!isOpen && (
        <button id='Chat'
          data-tour="bot-flotante"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-15 right-6 group flex h-18 w-18 justify-center items-center rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-50 bg-primary"
        >
          <img src='./hostImage/LOGO-COLOR.svg' className="h-12 w-12 text-white group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red  opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-600"></span>
          </span>
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 z-40 transition-opacity duration-300" 
        />
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 bg-white rounded-2xl border-2 border-primary shadow-2xl z-50 w-full max-w-md flex flex-col overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-5"
          style={{ height: '600px' }}>
          
          <div className="flex items-center justify-between px-5 py-4 text-white relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #d97706 0%)' }}>
            <div className="flex items-center gap-3 z-10">
              <div>
                <h3 className="font-semibold text-lg">Aguarú</h3>
                <p className="text-xs text-white text-opacity-90">Asistente inteligente</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="z-10 hover:bg-opacity-20 cursor-pointer rounded-full p-2 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 bg-gradient-to-b from-gray-50 to-white p-4 overflow-y-auto flex flex-col gap-3">
            {messages.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-20 h-20 cursor-pointer animate-float rounded-full flex items-center justify-center mb-4 bg-secondary">
                  <img src='./hostImage/LOGO-COLOR.svg' className="h-18 w-18 color-primary text-primary" />
                </div>
                <p className="text-gray-600 font-medium mb-2">¡Hola! Soy Aguarú</p>
                <p className="text-gray-400 text-sm">
                  Estoy aquí para ayudarte con información, consejos y responder tus preguntas.
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm max-w-[85%] shadow-sm ${
                    msg.sender === 'user'
                      ? 'rounded-tr-sm text-white'
                      : 'rounded-tl-sm bg-white border border-gray-100 text-gray-800'
                  }`}
                  style={msg.sender === 'user' ? { backgroundColor: '#d97706' } : {}}
                >
                  {msg.text}
                </div>
                <span className="text-xs text-gray-400 mt-1 px-2">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {/* Animación de "bot escribiendo" */}
            {isLoading && (
              <div className="flex items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" 
                      style={{  animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" 
                      style={{  animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" 
                      style={{  animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="flex gap-2 p-4 bg-white border-t border-gray-100">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 pr-12 bg-gray-50 rounded-xl border-2 border-gray-100 focus:border-primary focus:bg-white outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-5 py-3 rounded-xl text-white font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 group bg-primary"
            >
              <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">{isLoading ? 'Enviando...' : 'Enviar'}</span>
            </button>
          </form>
          
          <style jsx>{`
            @keyframes float {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-20px);
              }
            }
            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
          `}</style>
        </div>
      )}
    </>
  )
}