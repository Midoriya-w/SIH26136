import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import {
  DOMAIN_CATEGORIES,
  PROCESS_FLOW_STEPS,
  EVALUATION_CRITERIA
} from '../data/mockData';
import {
  Rocket,
  Landmark,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Shield,
  Award,
  Sparkles,
  Zap,
  TrendingUp,
  Sliders,
  Cpu,
  Sprout,
  HeartPulse,
  GraduationCap,
  Building2,
  Leaf,
  Bus
} from 'lucide-react';
import Button from '../components/common/Button';

const iconMap = {
  Sprout: Sprout,
  HeartPulse: HeartPulse,
  GraduationCap: GraduationCap,
  Building2: Building2,
  Leaf: Leaf,
  Bus: Bus,
  Landmark: Landmark,
  Cpu: Cpu
};

const Landing = ({ currentUser, onRoleChange }) => {
  const navigate = useNavigate();

  const handleRoleLaunch = (roleKey) => {
    onRoleChange(roleKey);
    if (roleKey === 'startup') navigate('/startup/dashboard');
    if (roleKey === 'government') navigate('/government/dashboard');
    if (roleKey === 'evaluator') navigate('/evaluator/dashboard');
  };

  return (
    <div className="app-container">
      <Navbar currentUser={currentUser} onRoleChange={onRoleChange} />

      <main className="main-content" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        
        {/* Poster Hero Banner Matching Image */}
        <div className="poster-hero">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <span style={{ background: '#FF9933', color: '#0B2545', fontWeight: 800, fontSize: '0.75rem', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Maharashtra State Innovation Society Portal
              </span>
              <h1 style={{ fontSize: '3rem', color: '#FFFFFF', margin: '0.75rem 0 0.5rem 0', fontWeight: 900, lineHeight: 1.1 }}>
                Maha<span style={{ color: '#FF9933' }}>Bridge</span>
              </h1>
              <p style={{ fontSize: '1.25rem', color: '#93C5FD', fontWeight: 600 }}>
                Connect Ideas • Evaluate • Pilot • Procure • Scale
              </p>
              <p style={{ fontSize: '0.95rem', color: '#CBD5E1', maxWidth: '650px', marginTop: '0.5rem' }}>
                Government Challenges. Startup Solutions. <strong style={{ color: '#FFFFFF' }}>Real Impact.</strong> Empowering startups with direct state procurement opportunities and fair multi-expert evaluation.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '1.25rem', borderRadius: '16px', maxWidth: '380px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#FF9933', letterSpacing: '0.5px', marginBottom: '6px' }}>
                State Innovation Mission
              </div>
              <div style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.4 }}>
                Department of Skills, Employment, Entrepreneurship & Innovation
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '8px' }}>
                Innovative Maharashtra • Stronger Tomorrow
              </div>
            </div>
          </div>

          {/* 3 Portal Role Entry Cards */}
          <div className="role-portal-grid">
            {/* Startup Login Card */}
            <div className="role-portal-card startup-card">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Rocket size={22} color="#0056B3" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', color: '#0B2545' }}>Startup Portal</h3>
                    <div style={{ fontSize: '0.75rem', color: '#0056B3', fontWeight: 700 }}>Build • Apply • Track • Grow</div>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0', fontSize: '0.825rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="#059669" /> Create verified DPIIT startup profile</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="#059669" /> Select relevant domain categories</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="#059669" /> Browse & apply to govt challenges</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="#059669" /> Upload pitch decks & past work</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="#059669" /> Track real-time evaluation & pilot status</li>
                </ul>
              </div>

              <Button variant="primary" icon={ArrowRight} onClick={() => handleRoleLaunch('startup')} style={{ width: '100%', marginTop: '1rem' }}>
                Startup Dashboard →
              </Button>
            </div>

            {/* Government Dept Login Card */}
            <div className="role-portal-card govt-card">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Landmark size={22} color="#138808" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', color: '#0B2545' }}>Government Dept</h3>
                    <div style={{ fontSize: '0.75rem', color: '#138808', fontWeight: 700 }}>Post • Monitor • Approve • Scale</div>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0', fontSize: '0.825rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="#059669" /> Create & post problem challenges</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="#059669" /> Filter proposals by state impact & domain</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="#059669" /> Monitor multi-evaluator scoring progress</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="#059669" /> Award paid pilots with department funding</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="#059669" /> Fast-track statewide procurement</li>
                </ul>
              </div>

              <Button variant="success" icon={ArrowRight} onClick={() => handleRoleLaunch('government')} style={{ width: '100%', marginTop: '1rem' }}>
                Department Dashboard →
              </Button>
            </div>

            {/* Evaluator Login Card */}
            <div className="role-portal-card eval-card">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <UserCheck size={22} color="#7C3AED" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', color: '#0B2545' }}>Evaluator Login</h3>
                    <div style={{ fontSize: '0.75rem', color: '#7C3AED', fontWeight: 700 }}>Evaluate • Score • Give Feedback</div>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0', fontSize: '0.825rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="#059669" /> Randomized application assignment</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="#059669" /> Review proposals & technical decks</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="#059669" /> Score on 6 predefined parameters</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="#059669" /> Provide detailed constructive feedback</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="#059669" /> Strict confidentiality & zero conflict audit</li>
                </ul>
              </div>

              <Button variant="navy" icon={ArrowRight} onClick={() => handleRoleLaunch('evaluator')} style={{ width: '100%', marginTop: '1rem' }}>
                Evaluator Dashboard →
              </Button>
            </div>
          </div>
        </div>

        {/* End-to-End Process Flow Banner */}
        <div className="process-flow-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0056B3', background: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>
                End-to-End Process Flow
              </span>
              <h2 style={{ fontSize: '1.4rem', color: '#0B2545', marginTop: '4px' }}>From Problem Identification to Real-World Scale</h2>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
              Transparent, Merit-Based, Data-Driven Governance
            </div>
          </div>

          <div className="process-steps-grid">
            {PROCESS_FLOW_STEPS.map((s) => (
              <div key={s.step} className="step-card">
                <div className="step-number">{s.step}</div>
                <div className="step-title">{s.title}</div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: s.actor === 'Government' ? '#138808' : s.actor === 'Startup' ? '#0056B3' : '#7C3AED', marginBottom: '4px' }}>
                  ({s.actor})
                </div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Domain Categories Grid */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', color: '#0B2545' }}>Target Domain Categories</h2>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Focus sectors for state innovation challenges & pilot funding</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/startup/challenges')}>
              View All Challenges
            </Button>
          </div>

          <div className="domains-grid">
            {DOMAIN_CATEGORIES.map((cat) => {
              const Icon = iconMap[cat.icon] || Sprout;
              return (
                <div key={cat.id} className="domain-item" onClick={() => navigate(`/startup/challenges?domain=${cat.id}`)} style={{ cursor: 'pointer' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0056B3' }}>
                    <Icon size={20} />
                  </div>
                  <strong style={{ fontSize: '0.85rem', color: '#0B2545' }}>{cat.name}</strong>
                  <span style={{ fontSize: '0.725rem', color: '#64748B' }}>{cat.count} Active Challenges</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evaluation Model & Random Allocation Diagram */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          
          {/* Evaluation Criteria Box */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <Sliders size={20} color="#0056B3" />
              <h3 style={{ fontSize: '1.15rem', color: '#0B2545' }}>Predefined Evaluation Criteria</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {EVALUATION_CRITERIA.map((c) => (
                <div key={c.id} style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0B2545' }}>{c.label}</div>
                  <div style={{ fontSize: '0.725rem', color: '#0056B3', fontWeight: 800 }}>Weight: {c.weight}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Random Allocation Logic Box */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <Shield size={20} color="#7C3AED" />
              <h3 style={{ fontSize: '1.15rem', color: '#0B2545' }}>Multi-Expert Random Allocation</h3>
            </div>
            <div style={{ fontSize: '0.825rem', color: '#475569', marginBottom: '1rem', lineHeight: 1.4 }}>
              Every proposal is randomly allocated to 3 independent domain experts to ensure zero conflict of interest and balanced scoring:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ color: '#1E40AF' }}>Domain Expert 1</strong>
                <span style={{ color: '#64748B' }}>Technical Feasibility</span>
              </div>
              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ color: '#166534' }}>Domain Expert 2</strong>
                <span style={{ color: '#64748B' }}>Business & Scaling</span>
              </div>
              <div style={{ background: '#F3E8FF', border: '1px solid #DDD6FE', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ color: '#6B21A8' }}>Domain Expert 3</strong>
                <span style={{ color: '#64748B' }}>Social & Policy Impact</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer Banner */}
      <footer className="govt-footer">
        <div className="footer-content">
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>MahaBridge Portal</h4>
            <p style={{ fontSize: '0.825rem', lineHeight: 1.5, color: '#94A3B8' }}>
              Official Startup & Innovation Procurement Engine of the Government of Maharashtra. Managed by Maharashtra State Innovation Society (MSINS).
            </p>
          </div>
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>Important Portals</h4>
            <ul style={{ listStyle: 'none', fontSize: '0.825rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><a href="https://maharashtra.gov.in" target="_blank" rel="noreferrer" style={{ color: '#CBD5E1' }}>Govt of Maharashtra Main Portal</a></li>
              <li><a href="https://msins.in" target="_blank" rel="noreferrer" style={{ color: '#CBD5E1' }}>MSINS Official Website</a></li>
              <li><a href="https://aaplesarkar.maharashtra.gov.in" target="_blank" rel="noreferrer" style={{ color: '#CBD5E1' }}>Aaple Sarkar Services</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>Contact Office</h4>
            <p style={{ fontSize: '0.825rem', lineHeight: 1.5, color: '#94A3B8' }}>
              Maharashtra State Innovation Society<br />
              13th Floor, New Administrative Building, Opp. Mantralaya, Mumbai - 400032
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 Government of Maharashtra. All Rights Reserved.</div>
          <div>Designed for SIH 2026 Innovation Challenge</div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
