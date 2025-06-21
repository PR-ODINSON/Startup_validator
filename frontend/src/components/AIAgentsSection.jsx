import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  DollarSign, 
  Presentation,
  CheckCircle,
  Users,
  BarChart3,
  Lightbulb,
  Shield,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const AIAgentsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeAgent, setActiveAgent] = useState(0);

  const agents = [
    {
      id: 'research',
      name: 'Research Agent',
      title: 'Market Intelligence Specialist',
      icon: Brain,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Deep-dives into market research, trend analysis, and competitive landscape mapping.',
      capabilities: [
        'Real-time market size analysis (TAM/SAM/SOM)',
        'Trend identification and forecasting',
        'Competitive landscape mapping',
        'Customer behavior analysis',
        'Industry growth projections'
      ],
      output: 'Comprehensive market research report with actionable insights'
    },
    {
      id: 'investor',
      name: 'Investor Agent',
      title: 'Funding & Investment Analyst',
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Evaluates your startup from an investor\'s perspective, identifying funding potential.',
      capabilities: [
        'Investment readiness assessment',
        'Valuation modeling and projections',
        'Risk analysis and mitigation strategies',
        'Funding stage recommendations',
        'Pitch deck optimization suggestions'
      ],
      output: 'Investment analysis with funding recommendations and risk assessment'
    },
    {
      id: 'market',
      name: 'Market Agent',
      title: 'Go-to-Market Strategist',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Crafts comprehensive go-to-market strategies and customer acquisition plans.',
      capabilities: [
        'Target audience identification',
        'Marketing channel optimization',
        'Pricing strategy development',
        'Customer acquisition cost analysis',
        'Growth hacking recommendations'
      ],
      output: 'Complete go-to-market strategy with customer acquisition roadmap'
    },
    {
      id: 'product',
      name: 'Product Manager Agent',
      title: 'Product Strategy Expert',
      icon: Lightbulb,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Designs optimal product roadmaps and MVP specifications for market success.',
      capabilities: [
        'MVP feature prioritization',
        'Product roadmap development',
        'User experience optimization',
        'Technical feasibility analysis',
        'Product-market fit assessment'
      ],
      output: 'Detailed product roadmap with MVP specifications and development timeline'
    },
    {
      id: 'pitch',
      name: 'Pitch Agent',
      title: 'Presentation Specialist',
      icon: Presentation,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      description: 'Creates compelling pitch decks and presentation materials for various audiences.',
      capabilities: [
        'Investor pitch deck creation',
        'Storytelling optimization',
        'Visual presentation design',
        'Key metrics identification',
        'Audience-specific customization'
      ],
      output: 'Professional pitch deck with compelling narrative and key metrics'
    },
    {
      id: 'validation',
      name: 'Validation Agent',
      title: 'Business Validation Expert',
      icon: CheckCircle,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      description: 'Orchestrates comprehensive validation across all business dimensions.',
      capabilities: [
        'Multi-dimensional analysis coordination',
        'Validation score calculation',
        'Success probability assessment',
        'Critical issue identification',
        'Actionable recommendations synthesis'
      ],
      output: 'Overall validation score with prioritized action items and success roadmap'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="ai-agents" className="section-padding bg-gradient-to-b from-slate-50 to-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Meet Your AI Expert Panel</span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">6 Specialized AI Agents</span><br />
            Working for Your Success
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Each AI agent is trained on thousands of successful startups and brings specialized expertise to validate every aspect of your business idea.
          </motion.p>
        </motion.div>

        {/* Agent Cards Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onClick={() => setActiveAgent(index)}
                className={`group relative cursor-pointer transition-all duration-300 ${
                  activeAgent === index ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                }`}
              >
                <div className={`relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden ${agent.bgColor} bg-opacity-20`}>
                  {/* Icon */}
                  <div className="mb-4">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${agent.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {agent.name}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium mb-3">
                      {agent.title}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {agent.description}
                    </p>
                    <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Active indicator */}
                  {activeAgent === index && (
                    <motion.div
                      layoutId="activeAgent"
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Detailed Agent View */}
        <motion.div
          key={activeAgent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${agents[activeAgent].color} shadow-lg`}>
                  {React.createElement(agents[activeAgent].icon, { className: "w-8 h-8 text-white" })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {agents[activeAgent].name}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {agents[activeAgent].title}
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {agents[activeAgent].description}
              </p>

              <div className="bg-slate-50 rounded-2xl p-6">
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Output Delivered
                </h4>
                <p className="text-slate-700">
                  {agents[activeAgent].output}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-6">Key Capabilities</h4>
              <div className="space-y-4">
                {agents[activeAgent].capabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {capability}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to Get Your Startup Validated?
            </h3>
            <p className="text-lg text-slate-600">
              Let our AI expert panel analyze your idea and provide comprehensive validation in minutes, not weeks.
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
          >
            <span>Start AI Validation</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAgentsSection; 