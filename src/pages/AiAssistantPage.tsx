
import { useState } from 'react';
import { Bot, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AiAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m Healio AI, your personal mental health assistant. How are you feeling today? Tell me about any concerns or questions you have, and I\'ll do my best to help you.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let response: Message;
      
      if (input.toLowerCase().includes('anxiety') || input.toLowerCase().includes('anxious')) {
        response = {
          role: 'assistant',
          content: 'I notice you mentioned feeling anxious. Anxiety is common and there are several things that might help. Try deep breathing exercises (breathe in for 4 seconds, hold for 7, exhale for 8), limit caffeine intake, maintain regular physical activity, and ensure you\'re getting enough sleep. If your anxiety is persistent, consider speaking with a mental health professional who can provide personalized guidance.'
        };
      } else if (input.toLowerCase().includes('sleep') || input.toLowerCase().includes('insomnia')) {
        response = {
          role: 'assistant',
          content: 'Sleep issues can significantly impact mental health. I recommend establishing a regular sleep schedule, creating a restful environment (dark, quiet, cool), avoiding screens before bed, limiting caffeine and alcohol, and trying relaxation techniques like progressive muscle relaxation. Our sleep tracking feature can help you monitor your patterns over time.'
        };
      } else if (input.toLowerCase().includes('depress')) {
        response = {
          role: 'assistant',
          content: 'I\'m sorry to hear you\'re feeling down. Depression affects many people, and it\'s important to be kind to yourself. Some strategies that might help include regular physical activity, maintaining social connections, practicing mindfulness, setting small achievable goals, and following a regular schedule. Please remember that you deserve professional support - consider reaching out to a mental health professional or crisis helpline if you\'re struggling.'
        };
      } else if (input.toLowerCase().includes('stress')) {
        response = {
          role: 'assistant',
          content: 'Managing stress is essential for mental wellbeing. Try identifying your stress triggers and practicing regular self-care activities like exercise, meditation, or hobbies you enjoy. Time management techniques, setting boundaries, and connecting with supportive people can also help reduce stress levels. Our journal feature can be a great way to process stressful thoughts.'
        };
      } else {
        response = {
          role: 'assistant',
          content: 'Thank you for sharing that with me. Remember that taking care of your mental health is just as important as physical health. Would you like to explore some coping strategies or relaxation techniques that might help? You can also use our mood tracking and journaling features to monitor your wellbeing over time.'
        };
      }
      
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
      toast.success('Healio AI responded to your message');
    }, 1500);
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          <span className="inline-block mr-2">
            <Bot className="inline-block h-8 w-8 text-healio-600" />
          </span>
          Healio AI Assistant
        </h1>
        <p className="text-gray-600">Your personal mental health companion</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2 animate-fadeIn">
          <Card className="mb-4">
            <CardContent className="p-6">
              <div className="space-y-4 max-h-[500px] overflow-y-auto mb-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === 'user' 
                          ? 'bg-healio-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-4 bg-gray-100">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-grow resize-none"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !input.trim()} 
                  className="healio-gradient"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Alert className="healio-card animate-fadeIn delay-100">
            <AlertTitle className="mb-2">Important Note</AlertTitle>
            <AlertDescription>
              Healio AI is designed to provide general guidance and support but is not a substitute for professional medical advice, diagnosis, or treatment.
            </AlertDescription>
          </Alert>
          
          <Card className="p-6 healio-card animate-fadeIn delay-200">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl">How Healio AI Can Help</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Suggest personalized coping strategies</li>
                <li>Provide mental wellness tips</li>
                <li>Guide you through relaxation techniques</li>
                <li>Help track your mental health patterns</li>
                <li>Offer compassionate support when needed</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantPage;
