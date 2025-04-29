
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import { Bed, Calendar, Headphones, Smile } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Your Mental Wellbeing Companion
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Healio helps you track your mood, journal your thoughts, monitor your sleep, 
                and find peace through music – all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="healio-gradient text-lg px-8 py-6">
                  <Link to="/mood">Track Your Mood</Link>
                </Button>
                <Button variant="outline" className="text-lg px-6 py-6">
                  <Link to="/journal">Write in Journal</Link>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center animate-fadeIn delay-200">
              <div className="relative">
                <div className="absolute -z-10 w-72 h-72 bg-healio-100 rounded-full blur-3xl opacity-70 animate-pulse-slow"></div>
                <div className="absolute -z-10 w-72 h-72 bg-mind-100 rounded-full blur-3xl opacity-70 -translate-x-20 translate-y-20 animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
                <div className="healio-gradient w-40 h-40 rounded-full flex items-center justify-center">
                  <span className="text-white text-6xl font-bold">H</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fadeIn">
            Features to Support Your Mental Health
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="animate-fadeIn" style={{ animationDelay: "0.1s" }}>
              <FeatureCard 
                title="Sleep Tracker" 
                description="Monitor your sleep patterns and improve your rest quality."
                icon={<Bed className="w-6 h-6 text-white" />} 
                to="/sleep" 
              />
            </div>
            <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
              <FeatureCard 
                title="Mood Tracker" 
                description="Track your emotional state and identify patterns over time."
                icon={<Smile className="w-6 h-6 text-white" />} 
                to="/mood" 
              />
            </div>
            <div className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
              <FeatureCard 
                title="Daily Journal" 
                description="Express your thoughts and feelings in a private digital diary."
                icon={<Calendar className="w-6 h-6 text-white" />} 
                to="/journal" 
              />
            </div>
            <div className="animate-fadeIn" style={{ animationDelay: "0.4s" }}>
              <FeatureCard 
                title="Relaxing Music" 
                description="Listen to soothing sounds to calm your mind and reduce stress."
                icon={<Headphones className="w-6 h-6 text-white" />} 
                to="/music" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 animate-fadeIn">How Healio Works</h2>
          <p className="text-xl text-gray-600 mb-12 animate-fadeIn delay-100">
            Take small steps each day to improve your mental wellbeing through tracking, 
            reflection, and mindful activities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="animate-fadeIn delay-200">
              <div className="healio-gradient w-12 h-12 mb-4 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <h3 className="font-semibold text-xl mb-2">Track Daily</h3>
              <p className="text-gray-600">Monitor your sleep and mood patterns to identify what affects your mental health.</p>
            </div>
            
            <div className="animate-fadeIn delay-300">
              <div className="healio-gradient w-12 h-12 mb-4 rounded-full flex items-center justify-center text-white font-bold">2</div>
              <h3 className="font-semibold text-xl mb-2">Reflect & Journal</h3>
              <p className="text-gray-600">Process your emotions through regular journaling for greater self-awareness.</p>
            </div>
            
            <div className="animate-fadeIn delay-400">
              <div className="healio-gradient w-12 h-12 mb-4 rounded-full flex items-center justify-center text-white font-bold">3</div>
              <h3 className="font-semibold text-xl mb-2">Find Balance</h3>
              <p className="text-gray-600">Use music and mindfulness to restore calm and balance throughout your day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center animate-fadeIn">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Start Your Wellness Journey Today</h2>
          <p className="text-xl text-gray-600 mb-8">
            Your mental health matters. Take the first step toward better wellbeing with Healio.
          </p>
          <Button className="healio-gradient text-lg px-8 py-6">
            <Link to="/mood">Begin Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
