
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, ArrowLeft, Phone, MoreVertical, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

const AttorneyChat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { caseData, lawyer } = location.state || {};
  const scrollRef = useRef(null);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!caseData || !lawyer) {
      navigate('/upload-ticket');
      return;
    }

    if (messages.length === 0) {
      setTimeout(() => {
        const initialMessage = {
          id: 1,
          sender: 'attorney',
          text: `Hello! I'm ${lawyer.name.split(' ')[0]}. I've received your case file for ${caseData.childName || 'your child support matter'} in ${caseData.city || 'your area'}. I'm reviewing the documents now. Do you have any specific questions about the support request?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([initialMessage]);
      }, 500);
    }
  }, [caseData, lawyer, navigate]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      let responseText = "I understand. I'll make a note of that in your file.";
      
      const lowerInput = userMsg.text.toLowerCase();
      if (lowerInput.includes('cost') || lowerInput.includes('price') || lowerInput.includes('fee')) {
        responseText = `My flat fee of ${lawyer.fee} covers the review and preparation steps. If additional filings are needed, we'll discuss them first.`;
      } else if (lowerInput.includes('court') || lowerInput.includes('date')) {
        responseText = `Your court date is currently set for ${caseData.courtDate || 'a future date'}. We'll confirm the schedule once the court updates the docket.`;
      } else if (lowerInput.includes('support') || lowerInput.includes('amount') || lowerInput.includes('income')) {
        responseText = "We'll focus on accurate income documentation and child-related expenses to support a fair calculation.";
      } else if (lowerInput.includes('guarantee')) {
        responseText = "While I can't guarantee a specific outcome, I can prepare a strong, well-documented case for the court.";
      }

      const attorneyMsg = {
        id: Date.now() + 1,
        sender: 'attorney',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, attorneyMsg]);
    }, 2000 + Math.random() * 1000);
  };

  if (!lawyer) return null;

  return (
    <>
      <Helmet>
        <title>Chat with {lawyer.name} - FamilyBridge</title>
      </Helmet>

      <div className="flex flex-col h-screen bg-[var(--cream)] pt-20">
        
        <div className="bg-[var(--cream)] border-b border-[var(--linen)] px-4 py-3 shadow-sm z-10">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate(-1)} 
                className="text-[var(--moss)] hover:text-[var(--ink)] hover:bg-[var(--mist)] -ml-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              
              <div className="relative">
                <Avatar className="h-10 w-10 border border-[var(--linen)]">
                  <AvatarImage src={lawyer.image} alt={lawyer.name} />
                  <AvatarFallback>{lawyer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[var(--rose)] border-2 border-[var(--cream)] rounded-full"></span>
              </div>
              
              <div>
                <h2 className="text-[var(--ink)] font-bold text-sm sm:text-base flex items-center gap-2">
                  {lawyer.name}
                  <ShieldCheck className="w-3 h-3 text-[var(--moss)]" />
                </h2>
                <p className="text-[var(--moss)] text-xs flex items-center gap-2 opacity-70">
                  {lawyer.firm} • <span className="text-[var(--rose)]">Online</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-[var(--moss)] hover:text-[var(--ink)] hover:bg-[var(--mist)] hidden sm:inline-flex">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[var(--moss)] hover:text-[var(--ink)] hover:bg-[var(--mist)]">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-hidden relative">
           <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[rgba(139,177,167,0.4)] rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[rgba(243,179,159,0.4)] rounded-full blur-3xl"></div>
           </div>

           <div 
             className="h-full overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth"
             ref={scrollRef}
           >
             <div className="max-w-3xl mx-auto space-y-6 pb-4">
                <div className="flex justify-center">
                  <span className="text-xs text-[var(--moss)] bg-white px-3 py-1 rounded-full opacity-70">
                    Today
                  </span>
                </div>

                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-[85%] sm:max-w-[70%] gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        {msg.sender === 'attorney' && (
                          <Avatar className="h-8 w-8 mt-1 border border-[var(--linen)] flex-shrink-0">
                            <AvatarImage src={lawyer.image} />
                            <AvatarFallback>AT</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={`group relative px-4 py-3 rounded-2xl ${
                          msg.sender === 'user' 
                            ? 'bg-[var(--moss)] text-[var(--cream)] rounded-tr-sm' 
                            : 'bg-white text-[var(--ink)] border border-[var(--linen)] rounded-tl-sm'
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                          <span className={`text-[10px] absolute bottom-1 ${
                            msg.sender === 'user' ? 'left-2 text-white/70' : 'right-2 text-[var(--moss)] opacity-60'
                          } opacity-0 group-hover:opacity-100 transition-opacity`}>
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex gap-3">
                       <Avatar className="h-8 w-8 mt-1 border border-[var(--linen)]">
                          <AvatarImage src={lawyer.image} />
                          <AvatarFallback>AT</AvatarFallback>
                       </Avatar>
                       <div className="bg-white border border-[var(--linen)] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-[var(--moss)] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1.5 h-1.5 bg-[var(--moss)] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1.5 h-1.5 bg-[var(--moss)] rounded-full animate-bounce"></span>
                       </div>
                    </div>
                  </motion.div>
                )}
             </div>
           </div>
        </div>

        <div className="bg-[var(--cream)] border-t border-[var(--linen)] p-4">
          <div className="max-w-3xl mx-auto">
             <form onSubmit={handleSendMessage} className="flex items-end gap-3 bg-white border border-[var(--linen)] rounded-xl p-2 focus-within:border-[var(--sage)] focus-within:bg-white transition-all">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="text-[var(--moss)] hover:text-[var(--ink)] h-10 w-10 shrink-0 rounded-lg"
                >
                   <Paperclip className="w-5 h-5" />
                </Button>
                
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-[var(--ink)] placeholder:text-[var(--moss)] min-h-[44px] py-3 px-0 resize-none"
                  autoComplete="off"
                />

                <Button 
                  type="submit" 
                  disabled={!inputMessage.trim() || isTyping}
                  className={`h-10 w-10 shrink-0 rounded-lg transition-all ${
                    inputMessage.trim() 
                      ? 'bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)]' 
                      : 'bg-[var(--mist)] text-[var(--moss)] opacity-40'
                  }`}
                  size="icon"
                >
                   <Send className="w-4 h-4" />
                </Button>
             </form>
             <div className="text-center mt-2">
                <p className="text-[10px] text-[var(--moss)] flex items-center justify-center gap-1 opacity-70">
                   <ShieldCheck className="w-3 h-3" /> Messages are encrypted and privileged attorney-client communication.
                </p>
             </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AttorneyChat;
