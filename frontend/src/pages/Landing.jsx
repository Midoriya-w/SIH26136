import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import RoleSelectionModal from '../components/common/RoleSelectionModal';
import LoginModal from '../components/common/LoginModal';
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

  const [roleModalOpen, setRoleModalOpen] = React.useState(false);
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);

  return (
    <div className="app-container">
      <Navbar currentUser={currentUser} onRoleChange={onRoleChange} />

      <main className="main-content" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* New Hero - left text, right illustration */}
        <section style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 420px', minWidth: 320 }}>
            <h1 style={{ fontSize: '2.6rem', fontWeight: 800, color: 'var(--primary-navy)', lineHeight: 1.05 }}>Samarth Innovation Procurement Portal</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: 12, maxWidth: 640 }}>Where government challenges meet startup solutions. Post a problem, run a low-risk pilot, and scale what works — transparently, and on merit.</p>

            <div style={{ display: 'flex', gap: 12, marginTop: 18, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-apply" onClick={() => setRoleModalOpen(true)}>Post a Challenge</button>
              <button className="btn btn-outline" onClick={() => navigate('/startup/challenges')}>Browse Challenges</button>
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--primary-navy)', fontWeight: 700 }}>▶ Watch: How Samarth Works (90 sec)</a>
            </div>
          </div>

          <div style={{ flex: '0 0 420px', minWidth: 280, display: 'flex', justifyContent: 'center' }}>
            <img src="/hero-illustration.jpeg" alt="Hero illustration" style={{ width: '100%', maxWidth: 520 }} />
          </div>
        </section>

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

        {/* Live stats strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {[
            ['Active Challenges', '42'],
            ['Startups Onboarded', '1,280'],
            ['Pilots Completed', '96'],
            ['Value of Pilots Contracted', '₹18.4 Cr']
          ].map(([label, value]) => (
            <div key={label} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1rem 1.2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '0.76rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0B2545', lineHeight: 1.2 }}>{value}</div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="process-flow-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0056B3', background: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>
                How It Works
              </span>
              <h2 style={{ fontSize: '1.4rem', color: '#0B2545', marginTop: '4px' }}>Three steps from challenge to scale-up</h2>
            </div>
          </div>

          <div className="process-steps-grid">
            {[
              ['1', 'Post a Challenge', 'Departments define a real problem, set measurable outcomes, and a budget ceiling — no lengthy tender documents, just a clear problem statement.'],
              ['2', 'Pilot, Not a Full Rollout', 'Shortlisted startups run a time-bound, low-risk pilot with milestone-based funding — proving value before any large commitment.'],
              ['3', 'Scale What Works', 'Validated pilots get fast-tracked for scale-up across departments, with GeM catalogue integration for easy replication.']
            ].map(([step, title, desc]) => (
              <div key={title} className="step-card">
                <div className="step-number">{step}</div>
                <div className="step-title">{title}</div>
                <div className="step-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* End-to-End Process Flow Banner */}
        <div className="process-flow-container end-to-end-flow" style={{ marginTop: '2.5rem' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sliders size={18} color="#0056B3" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0B2545' }}>Predefined Evaluation Criteria</h3>
                  <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>Every proposal is scored out of 100</p>
                </div>
              </div>
              <span style={{ color: '#0056B3', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '999px', padding: '4px 9px', fontSize: '0.7rem', fontWeight: 800, whiteSpace: 'nowrap' }}>100 pts</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {EVALUATION_CRITERIA.map((c) => (
                <div key={c.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0B2545' }}>{c.label}</span>
                    <span style={{ fontSize: '0.725rem', color: '#0056B3', fontWeight: 800 }}>{c.weight}%</span>
                  </div>
                  <div style={{ height: '7px', background: '#EAF0F7', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${c.weight * 5}%`, height: '100%', background: c.weight === 20 ? '#0056B3' : '#65A30D', borderRadius: '999px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Random Allocation Logic Box */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.35rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={18} color="#7C3AED" />
              </div>
              <h3 style={{ fontSize: '1.15rem', color: '#0B2545' }}>Multi-Expert Random Allocation</h3>
            </div>
            <div style={{ fontSize: '0.825rem', color: '#475569', margin: '0 0 1rem 42px', lineHeight: 1.4 }}>
              Three independent reviewers create a balanced score and reduce conflicts of interest.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 10px', borderRadius: '10px', fontSize: '0.8rem' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0056B3', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>01</span>
                <div><strong style={{ color: '#1E40AF', display: 'block' }}>Technical Expert</strong><span style={{ color: '#64748B' }}>Feasibility & readiness</span></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 10px', borderRadius: '10px', fontSize: '0.8rem' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#138808', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>02</span>
                <div><strong style={{ color: '#166534', display: 'block' }}>Business Expert</strong><span style={{ color: '#64748B' }}>Innovation & scaling</span></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 10px', borderRadius: '10px', fontSize: '0.8rem' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#7C3AED', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>03</span>
                <div><strong style={{ color: '#6B21A8', display: 'block' }}>Social Impact Expert</strong><span style={{ color: '#64748B' }}>Policy & community value</span></div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '0.72rem', fontWeight: 700, marginTop: '1rem' }}>
              <CheckCircle2 size={14} /> Independent allocation with conflict screening
            </div>
          </div>
        </div>

      </main>

      {/* Footer Banner */}
      <footer className="govt-footer">
        <div className="footer-content">
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>Samarth Innovation Procurement Portal</h4>
            <p style={{ fontSize: '0.825rem', lineHeight: 1.5, color: '#94A3B8' }}>
              An initiative of the Government of Maharashtra to fast-track innovation adoption through outcome-based, transparent public procurement.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', fontSize: '0.825rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><a href="https://maharashtra.gov.in" target="_blank" rel="noreferrer" style={{ color: '#CBD5E1' }}>Terms of Use</a></li>
              <li><a href="https://msins.in" target="_blank" rel="noreferrer" style={{ color: '#CBD5E1' }}>Privacy Policy</a></li>
              <li><a href="https://aaplesarkar.maharashtra.gov.in" target="_blank" rel="noreferrer" style={{ color: '#CBD5E1' }}>Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>Helpline</h4>
            <p style={{ fontSize: '0.825rem', lineHeight: 1.5, color: '#94A3B8' }}>
              Helpline: 1800-XXX-XXXX<br />
              Working Hours: 10:00 AM – 6:00 PM, Mon–Sat
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div>Built on the principles of transparency, fair evaluation, and startup-friendly procurement — aligned with Startup India and GeM standards.</div>
          <div>© 2026 Government of Maharashtra. All Rights Reserved.</div>
        </div>
      </footer>
      <RoleSelectionModal open={roleModalOpen} onClose={() => setRoleModalOpen(false)} onSelect={(r) => { setRoleModalOpen(false); handleRoleLaunch(r === 'incubator' ? 'government' : 'startup'); }} />
      <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </div>
  );
};

export default Landing;
