import React from 'react';
import { Award, Star, CheckCircle, Shield, Trophy, Heart, Beef as Bee, Flower, Droplet, Leaf, Sun, Sparkles } from 'lucide-react';
import Card from '../common/Card';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  isUnlocked: boolean;
  unlockedAt?: string;
  category: 'verification' | 'quality' | 'community' | 'achievement';
}

const Badges: React.FC = () => {
  // Hardcoded badges
  const badges: Badge[] = [
    {
      id: 'first-steps',
      name: 'Honey Newcomer',
      description: 'Completed the initial registration process',
      icon: <Bee className="h-6 w-6" />,
      isUnlocked: true,
      unlockedAt: new Date().toLocaleDateString(),
      category: 'achievement'
    },
    {
      id: 'health-cert',
      name: 'Certified Beekeeper',
      description: 'Successfully uploaded health certificate',
      icon: <Shield className="h-6 w-6" />,
      isUnlocked: true,
      unlockedAt: new Date().toLocaleDateString(),
      category: 'verification'
    },
    {
      id: 'sample-submitted',
      name: 'Honey Collector',
      description: 'Submitted first honey sample for testing',
      icon: <Droplet className="h-6 w-6" />,
      isUnlocked: true,
      unlockedAt: new Date().toLocaleDateString(),
      category: 'quality'
    },
    {
      id: 'quality-expert',
      name: 'Golden Honey Master',
      description: 'Achieved high-quality rating for honey samples',
      icon: <Trophy className="h-6 w-6" />,
      isUnlocked: false,
      category: 'quality'
    },
    {
      id: 'community-star',
      name: 'Hive Hero',
      description: 'Received positive feedback from clients',
      icon: <Heart className="h-6 w-6" />,
      isUnlocked: false,
      category: 'community'
    },
    {
      id: 'verification-master',
      name: 'Honey Guardian',
      description: 'Completed all verification steps successfully',
      icon: <Award className="h-6 w-6" />,
      isUnlocked: false,
      category: 'verification'
    },
    {
      id: 'organic-badge',
      name: 'Organic Champion',
      description: 'Certified organic honey producer',
      icon: <Leaf className="h-6 w-6" />,
      isUnlocked: false,
      category: 'quality'
    },
    {
      id: 'floral-expert',
      name: 'Floral Expert',
      description: 'Specialized in floral honey varieties',
      icon: <Flower className="h-6 w-6" />,
      isUnlocked: false,
      category: 'achievement'
    },
    {
      id: 'sunshine-honey',
      name: 'Sunshine Honey',
      description: 'Produced honey during peak season',
      icon: <Sun className="h-6 w-6" />,
      isUnlocked: false,
      category: 'achievement'
    }
  ];

  const getCategoryColor = (category: Badge['category']) => {
    switch (category) {
      case 'verification':
        return 'bg-[#8fce90]/20 text-[#4c6737]';
      case 'quality':
        return 'bg-amber-100 text-amber-700';
      case 'community':
        return 'bg-[#8fce90]/20 text-[#4c6737]';
      case 'achievement':
        return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8fce90]/5 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#4c6737]">Your Honey Journey Badges</h1>
          <p className="mt-2 text-gray-600">Track your achievements in the world of honey production</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => (
            <Card 
              key={badge.id}
              className={`p-6 ${!badge.isUnlocked ? 'opacity-50' : ''} hover:shadow-lg transition-shadow duration-200`}
            >
              <div className="flex items-start">
                <div className={`p-3 rounded-full ${getCategoryColor(badge.category)}`}>
                  {badge.icon}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-[#4c6737]">{badge.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{badge.description}</p>
                  {badge.isUnlocked && badge.unlockedAt && (
                    <p className="text-xs text-[#8fce90] mt-2">
                      Unlocked on {badge.unlockedAt}
                    </p>
                  )}
                </div>
                {badge.isUnlocked ? (
                  <div className="text-[#8fce90]">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Progress Summary */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-[#8fce90]/10 to-white">
          <h2 className="text-xl font-semibold text-[#4c6737] mb-4">Your Honey Journey Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#8fce90]/20 rounded-lg p-4">
              <h3 className="text-sm font-medium text-[#4c6737]">Verification</h3>
              <p className="text-2xl font-bold text-[#4c6737]">1/2</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-amber-700">Quality</h3>
              <p className="text-2xl font-bold text-amber-700">1/3</p>
            </div>
            <div className="bg-[#8fce90]/20 rounded-lg p-4">
              <h3 className="text-sm font-medium text-[#4c6737]">Community</h3>
              <p className="text-2xl font-bold text-[#4c6737]">0/1</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-amber-700">Achievements</h3>
              <p className="text-2xl font-bold text-amber-700">1/3</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Badges; 