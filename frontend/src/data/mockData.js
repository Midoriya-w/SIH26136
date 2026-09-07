// MahaBridge State Innovation Portal Mock Data

export const DOMAIN_CATEGORIES = [
  { id: 'agriculture', name: 'Agriculture & AgriTech', icon: 'Sprout', count: 24, description: 'Smart farming, crop yield optimization, climate resilience' },
  { id: 'healthcare', name: 'Healthcare & Biotech', icon: 'HeartPulse', count: 19, description: 'Telemedicine, rural diagnostic kits, AI medical imaging' },
  { id: 'education', name: 'Education & EdTech', icon: 'GraduationCap', count: 15, description: 'Vernacular learning platforms, skill development, digital labs' },
  { id: 'urban_infra', name: 'Urban Infrastructure', icon: 'Building2', count: 28, description: 'Smart traffic management, waste-to-energy, water purification' },
  { id: 'environment', name: 'Environment & Cleantech', icon: 'Leaf', count: 22, description: 'Solar integration, carbon capture, river rejuvenation' },
  { id: 'transport', name: 'Transport & Logistics', icon: 'Bus', count: 17, description: 'EV fleet management, public transit tracking, smart parking' },
  { id: 'governance', name: 'Governance & GovTech', icon: 'Landmark', count: 31, description: 'Direct benefit transfer tracking, citizen grievance AI, workflow automation' },
  { id: 'others', name: 'DeepTech & Robotics', icon: 'Cpu', count: 12, description: 'Drone surveying, industrial automation, cybersecurity' }
];

export const PROCESS_FLOW_STEPS = [
  { step: 1, title: 'Post Challenge', actor: 'Government', desc: 'Define problem statement, domain, target outcomes, budget & timeline.' },
  { step: 2, title: 'Apply Solution', actor: 'Startup', desc: 'Submit innovation proposals, pitch decks & select domain categories.' },
  { step: 3, title: 'Auto Allocation', actor: 'System', desc: 'Applications randomly allocated to 3 domain experts (Tech, Biz, Social).' },
  { step: 4, title: 'Evaluation', actor: 'Evaluator', desc: 'Independent scoring on technical feasibility, scalability, cost & impact.' },
  { step: 5, title: 'Shortlist', actor: 'Department', desc: 'Combined multi-expert evaluation report automatically ranks top startups.' },
  { step: 6, title: 'Pilot Award', actor: 'Government', desc: 'Selected startups conduct paid real-world pilot tests with dept funding.' },
  { step: 7, title: 'Validate & Decide', actor: 'Committee', desc: 'Track pilot outcome metrics, independent validation & decision.' },
  { step: 8, title: 'Procure & Scale', actor: 'State Govt', desc: 'Fast-track state-wide procurement and integration across districts.' }
];

export const EVALUATION_CRITERIA = [
  { id: 'tech', label: 'Technical Feasibility', weight: 20, icon: 'Cog' },
  { id: 'innovation', label: 'Innovation & Novelty', weight: 20, icon: 'Lightbulb' },
  { id: 'impact', label: 'Social & Economic Impact', weight: 20, icon: 'Target' },
  { id: 'scalability', label: 'Scalability & Replication', weight: 15, icon: 'TrendingUp' },
  { id: 'cost', label: 'Cost Effectiveness', weight: 15, icon: 'DollarSign' },
  { id: 'readiness', label: 'Implementation Readiness', weight: 10, icon: 'CheckCircle2' }
];

export const MOCK_CHALLENGES = [
  {
    id: 'CH-2026-001',
    title: 'AI-Based Crop Disease Early Detection in Cotton & Sugarcane Belt',
    department: 'Department of Agriculture, Maharashtra',
    domain: 'agriculture',
    domainLabel: 'Agriculture & AgriTech',
    budget: '₹ 50,00,000',
    pilotTimeline: '6 Months',
    deadline: '2026-10-15',
    status: 'open',
    applicantCount: 14,
    evaluatorsAssigned: 3,
    problemStatement: 'Crop diseases cause up to 35% yield loss annually in Maharashtra sugarcane and cotton belts. Farmers rely on manual inspection which is often delayed.',
    expectedOutcome: 'Deploy mobile AI computer vision model capable of offline leaf scan disease detection with 90%+ accuracy and instant regional remedies in Marathi.',
    targetDistricts: ['Yavatmal', 'Nanded', 'Kolhapur', 'Aurangabad'],
    createdAt: '2026-08-10'
  },
  {
    id: 'CH-2026-002',
    title: 'Smart Solar-Powered Water Quality Monitoring in Godavari River Basin',
    department: 'Water Resources Department, Maharashtra',
    domain: 'environment',
    domainLabel: 'Environment & Cleantech',
    budget: '₹ 75,00,000',
    pilotTimeline: '9 Months',
    deadline: '2026-11-01',
    status: 'open',
    applicantCount: 9,
    evaluatorsAssigned: 3,
    problemStatement: 'Manual sampling of river water purity is infrequent and misses sudden industrial discharge bursts in the Godavari basin.',
    expectedOutcome: 'Continuous IoT sensor buoy network with solar charging sending real-time pH, turbidity, dissolved oxygen data to central dashboard.',
    targetDistricts: ['Nashik', 'Nanded'],
    createdAt: '2026-08-15'
  },
  {
    id: 'CH-2026-003',
    title: 'Automated Citizen Grievance Triage using Vernacular LLM',
    department: 'Department of Information Technology, Maharashtra',
    domain: 'governance',
    domainLabel: 'Governance & GovTech',
    budget: '₹ 40,00,000',
    pilotTimeline: '4 Months',
    deadline: '2026-09-30',
    status: 'under_evaluation',
    applicantCount: 22,
    evaluatorsAssigned: 3,
    problemStatement: 'Over 50,000 monthly grievances submitted on Aaple Sarkar portal require manual classification leading to delays of up to 14 days.',
    expectedOutcome: 'Automated NLP classifier accurately routing complaints in Marathi/Hindi/English to accurate sub-departments with 95% precision.',
    targetDistricts: ['Statewide'],
    createdAt: '2026-07-20'
  },
  {
    id: 'CH-2026-004',
    title: 'Portable Low-Cost Diagnostic Kits for Rural Primary Healthcare Centers (PHC)',
    department: 'Public Health Department, Maharashtra',
    domain: 'healthcare',
    domainLabel: 'Healthcare & Biotech',
    budget: '₹ 90,00,000',
    pilotTimeline: '12 Months',
    deadline: '2026-10-30',
    status: 'open',
    applicantCount: 18,
    evaluatorsAssigned: 3,
    problemStatement: 'Rural PHCs in Gadchiroli and Nandurbar lack rapid blood biochemistry analyzers, requiring samples to be sent 80km away.',
    expectedOutcome: 'Handheld battery-operated diagnostic device producing 12 key blood parameters in under 10 minutes at under ₹100 per test.',
    targetDistricts: ['Gadchiroli', 'Nandurbar'],
    createdAt: '2026-08-01'
  },
  {
    id: 'CH-2026-005',
    title: 'Adaptive Traffic Signal Control for Pune & Mumbai Metropolitan Corridors',
    department: 'Urban Development Department, Maharashtra',
    domain: 'transport',
    domainLabel: 'Transport & Logistics',
    budget: '₹ 1,20,00,000',
    pilotTimeline: '6 Months',
    deadline: '2026-09-15',
    status: 'selected_pilot',
    applicantCount: 16,
    evaluatorsAssigned: 3,
    problemStatement: 'Fixed timer traffic signals cause unnecessary congestion during peak hours along major arterial corridors.',
    expectedOutcome: 'Computer vision camera integration calculating queue lengths and dynamically adjusting green light timing to reduce bottleneck congestion by 25%.',
    targetDistricts: ['Mumbai City', 'Pune'],
    createdAt: '2026-06-10'
  }
];

export const MOCK_STARTUPS = [
  {
    id: 'ST-001',
    name: 'AgriVision Technologies Pvt Ltd',
    dpiitNumber: 'DPIIT94821',
    foundedYear: 2022,
    location: 'Pune, Maharashtra',
    founder: 'Dr. Rajesh Deshmukh',
    domain: 'agriculture',
    domainLabel: 'Agriculture & AgriTech',
    stage: 'Growth Stage',
    teamSize: 18,
    website: 'https://agrivision.example.in',
    summary: 'Building offline-first AI camera diagnostics for Indian smallholder farmers.',
    pastWork: 'Deployed crop protection app used by 45,000+ farmers across Marathwada region.',
    certifications: ['ISO 9001:2015', 'DPIIT Recognised Startup', 'MSINS Grant Winner 2024']
  },
  {
    id: 'ST-002',
    name: 'JalSuraksha IoT Solutions',
    dpiitNumber: 'DPIIT67312',
    foundedYear: 2021,
    location: 'Nashik, Maharashtra',
    founder: 'Priya Joshi & Team',
    domain: 'environment',
    domainLabel: 'Environment & Cleantech',
    stage: 'Early Traction',
    teamSize: 12,
    website: 'https://jalsuraksha.example.in',
    summary: 'Solar-powered self-cleaning water sensor buoys for rivers and reservoirs.',
    pastWork: 'Pilot test conducted at Gangapur Dam with Nashik Municipal Corporation.',
    certifications: ['DPIIT Recognised', 'CPCB Lab Certified Sensors']
  },
  {
    id: 'ST-003',
    name: 'VaniAI GovTech Labs',
    dpiitNumber: 'DPIIT88219',
    foundedYear: 2023,
    location: 'Mumbai, Maharashtra',
    founder: 'Siddharth Patil',
    domain: 'governance',
    domainLabel: 'Governance & GovTech',
    stage: 'Seed Funded',
    teamSize: 8,
    website: 'https://vaniaigov.example.in',
    summary: 'Indian language LLMs customized for official state government administration.',
    pastWork: 'Built vernacular WhatsApp chatbot for Thane Police Citizen Assistance.',
    certifications: ['DPIIT Recognised', 'MeitY Incubated']
  },
  {
    id: 'ST-004',
    name: 'HealthPoint Diagnostics India',
    dpiitNumber: 'DPIIT11045',
    foundedYear: 2020,
    location: 'Nagpur, Maharashtra',
    founder: 'Dr. Ananya Kulkarni',
    domain: 'healthcare',
    domainLabel: 'Healthcare & Biotech',
    stage: 'Series A',
    teamSize: 34,
    website: 'https://healthpoint.example.in',
    summary: 'Point-of-care microfluidic diagnostic cartridges for rural health clinics.',
    pastWork: 'Supplied 120 diagnostic units to ICMR field research stations.',
    certifications: ['CDSCO Approved', 'ISO 13485', 'DPIIT Recognised']
  }
];

export const MOCK_APPLICATIONS = [
  {
    id: 'APP-2026-101',
    challengeId: 'CH-2026-001',
    challengeTitle: 'AI-Based Crop Disease Early Detection in Cotton & Sugarcane Belt',
    startupId: 'ST-001',
    startupName: 'AgriVision Technologies Pvt Ltd',
    domain: 'agriculture',
    submissionDate: '2026-08-28',
    status: 'under_evaluation',
    evaluators: [
      { id: 'EVAL-01', name: 'Dr. S. K. Mahajan', role: 'Technical Expert', status: 'Completed', score: 88 },
      { id: 'EVAL-02', name: 'Prof. Varsha Shinde', role: 'Business & Scaling Expert', status: 'Completed', score: 82 },
      { id: 'EVAL-03', name: 'Milind Thorat (IAS Retd)', role: 'Policy & Social Impact Expert', status: 'Pending', score: null }
    ],
    averageScore: 85.0,
    proposalSummary: 'Deploy AgriVision AI Edge Kit with custom trained convolutional network on 500 mobile handsets across Yavatmal district.',
    pitchDeckUrl: '#',
    budgetRequested: '₹ 48,50,000'
  },
  {
    id: 'APP-2026-102',
    challengeId: 'CH-2026-003',
    challengeTitle: 'Automated Citizen Grievance Triage using Vernacular LLM',
    startupId: 'ST-003',
    startupName: 'VaniAI GovTech Labs',
    domain: 'governance',
    submissionDate: '2026-08-14',
    status: 'shortlisted',
    evaluators: [
      { id: 'EVAL-01', name: 'Dr. S. K. Mahajan', role: 'Technical Expert', status: 'Completed', score: 92 },
      { id: 'EVAL-04', name: 'Anil Jadhav', role: 'Business Expert', status: 'Completed', score: 90 },
      { id: 'EVAL-03', name: 'Milind Thorat (IAS Retd)', role: 'Policy Expert', status: 'Completed', score: 94 }
    ],
    averageScore: 92.0,
    proposalSummary: 'Fine-tuned IndicBERT engine on 100,000 historical Aaple Sarkar tickets with active learning feedback loop.',
    pitchDeckUrl: '#',
    budgetRequested: '₹ 38,00,000'
  },
  {
    id: 'APP-2026-103',
    challengeId: 'CH-2026-005',
    challengeTitle: 'Adaptive Traffic Signal Control for Pune & Mumbai Metropolitan Corridors',
    startupId: 'ST-002',
    startupName: 'JalSuraksha IoT Solutions',
    domain: 'transport',
    submissionDate: '2026-07-02',
    status: 'selected_pilot',
    evaluators: [
      { id: 'EVAL-02', name: 'Prof. Varsha Shinde', role: 'Technical Expert', status: 'Completed', score: 95 },
      { id: 'EVAL-04', name: 'Anil Jadhav', role: 'Business Expert', status: 'Completed', score: 91 },
      { id: 'EVAL-03', name: 'Milind Thorat (IAS Retd)', role: 'Policy Expert', status: 'Completed', score: 93 }
    ],
    averageScore: 93.0,
    proposalSummary: 'Smart signal network trial on Senapati Bapat Road Pune featuring 12 intersections.',
    pitchDeckUrl: '#',
    budgetRequested: '₹ 1,15,00,000'
  }
];

export const MOCK_EVALUATORS = [
  {
    id: 'EVAL-01',
    name: 'Dr. S. K. Mahajan',
    designation: 'Former Director of Technical Education',
    organization: 'Govt of Maharashtra',
    expertise: ['AI/ML', 'Agriculture', 'Technical Feasibility'],
    assignedCount: 6,
    completedCount: 5
  },
  {
    id: 'EVAL-02',
    name: 'Prof. Varsha Shinde',
    designation: 'Chairperson of Innovation & Incubation',
    organization: 'COEP Technological University Pune',
    expertise: ['CleanTech', 'Business Models', 'IoT'],
    assignedCount: 4,
    completedCount: 4
  },
  {
    id: 'EVAL-03',
    name: 'Milind Thorat (IAS Retd)',
    designation: 'Ex-Additional Chief Secretary',
    organization: 'Govt of Maharashtra',
    expertise: ['GovTech', 'Public Policy', 'Social Impact'],
    assignedCount: 8,
    completedCount: 7
  }
];

export const MOCK_USERS = {
  startup: {
    name: 'AgriVision Technologies',
    role: 'startup',
    roleLabel: 'Startup Innovator',
    email: 'contact@agrivision.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    dpiit: 'DPIIT94821'
  },
  government: {
    name: 'Dept. of Skills & Innovation',
    role: 'government',
    roleLabel: 'Government Department',
    email: 'dept.innovation@maharashtra.gov.in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    department: 'Department of Skills, Employment, Entrepreneurship and Innovation'
  },
  evaluator: {
    name: 'Dr. S. K. Mahajan',
    role: 'evaluator',
    roleLabel: 'Domain Expert Evaluator',
    email: 'sk.mahajan@evaluators.mahabridge.gov.in',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    expertiseDomain: 'Technical & AI Expert'
  }
};
