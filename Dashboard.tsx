import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, Book, Users, Music, LogOut, MessageSquareHeart } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1517898717281-8e4385a41802?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
      }}
    >
      <div className="min-h-screen bg-white/90">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-indigo-600">MINDFUL AI</h1>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center text-gray-600 hover:text-indigo-600"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Welcome to Your Mental Wellness Journey</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <DashboardCard
              title="Evaluation Test"
              description="Take our anonymous assessment to understand your mental well-being"
              icon={<ClipboardCheck className="h-8 w-8" />}
              onClick={() => navigate('/evaluation')}
            />
            
            <DashboardCard
              title="Journal"
              description="Record your thoughts and feelings in a private space"
              icon={<Book className="h-8 w-8" />}
              onClick={() => navigate('/journal')}
            />
            
            <DashboardCard
              title="Community Chat"
              description="Connect with others in a supportive environment"
              icon={<Users className="h-8 w-8" />}
              onClick={() => navigate('/community')}
            />
            
            <DashboardCard
              title="Peaceful Music"
              description="Listen to calming sounds and meditation music"
              icon={<Music className="h-8 w-8" />}
              onClick={() => navigate('/music')}
            />

            <DashboardCard
              title="Mindful Assistant"
              description="Get personalized support and guidance from our AI assistant"
              icon={<MessageSquareHeart className="h-8 w-8" />}
              onClick={() => navigate('/assistant')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, description, icon, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl shadow-md p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg"
  >
    <div className="text-indigo-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Dashboard;