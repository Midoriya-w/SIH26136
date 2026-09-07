import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from '../components/common/Navbar';
import RoleSelectionModal from '../components/common/RoleSelectionModal';
import LoginModal from '../components/common/LoginModal';

codex/redesign-samarth
import { DOMAIN_CATEGORIES, PROCESS_FLOW_STEPS, EVALUATION_CRITERIA } from '../data/mockData';
import { ArrowRight, CheckCircle2, Cpu, GraduationCap, HeartPulse, Landmark, Play, Rocket, ShieldCheck, Sprout, Building2, Leaf, Bus, UserCheck, Briefcase, Scale, Route, Trees } from 'lucide-react';

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
 main

const icons = { Sprout, HeartPulse, GraduationCap, Building2, Leaf, Bus, Landmark, Cpu };
const reveal = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } } };

const Landing = ({ currentUser, onRoleChange }) => {
  const navigate = useNavigate();
  const [roleModalOpen, setRoleModalOpen] = React.useState(false);
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const openPortal = (role) => {
    onRoleChange(role);
    navigate(`/${role === 'government' ? 'government' : role}/dashboard`);
  };
   codex/redesign-samarth
  const roles = [
    { key: 'startup', title: 'For startups', icon: Rocket, label: 'Find. Apply. Prove.', points: ['Create your profile', 'Submit a pilot plan', 'Track your review'] },
    { key: 'government', title: 'For departments', icon: Landmark, label: 'Turn a need into a pilot.', points: ['Post an outcome brief', 'Review scored proposals', 'Fund pilot progress'] },
    { key: 'evaluator', title: 'For evaluators', icon: UserCheck, label: 'Review clearly and fairly.', points: ['Receive checked assignments', 'Use one scoring rubric', 'Leave useful feedback'] }
  ];
  const serviceGateways = [
    { label: 'Government challenges', icon: Landmark, to: '/government/challenges' },
    { label: 'Startup applications', icon: Briefcase, to: '/startup/applications' },
    { label: 'Priority sectors', icon: Building2, to: '/startup/challenges' },
    { label: 'Pilot progress', icon: Route, to: '/government/applications' },
    { label: 'Climate innovation', icon: Trees, to: '/startup/challenges?domain=environment' },
    { label: 'Fair evaluation', icon: Scale, to: '/evaluator/dashboard' }
  ];

  return <div className="app-container landing-page">
    <Navbar currentUser={currentUser} onRoleChange={onRoleChange} />
    <main>
      {/* SIH rule: one confident message with shaped proof blocks, not a text wall. */}
      <motion.section className="sih-hero shell" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: 'easeOut' }}>
        <div className="hero-copy">
          <p className="eyebrow">Maharashtra · Innovation</p>
          <h1>Public ideas. <span>Proven impact.</span></h1>
          <p className="hero-lede">Fair challenges. Better pilots.</p>
          <div className="hero-trust"><ShieldCheck size={18} /> Fair · Paid · Measured</div>
        </div>
      </motion.section>
      <section className="civic-gateway"><div className="gateway-card">{serviceGateways.map(({ label, icon: Icon, to }) => <button key={label} onClick={() => navigate(to)}><Icon size={35} /><span>{label}</span></button>)}</div><div className="gateway-band"><span>One place to discover challenges, run pilots, and review results.</span><button onClick={() => navigate('/startup/challenges')}>Explore opportunities <ArrowRight size={16} /></button></div></section>
      <section className="stat-band"><div className="shell stats-grid">{[['42', 'active challenges'], ['1,280', 'startups onboarded'], ['96', 'pilots completed'], ['₹18.4 Cr', 'pilots contracted']].map(([value, label]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>
      {/* SIH rule: problem, uniqueness and prototype details are separate equal blocks. */}
      <section className="shell section-space"><div className="section-heading"><p className="eyebrow">Why Samarth</p><h2>A clear path from need to pilot.</h2></div><div className="three-card-grid"><article className="info-card problem"><span>01</span><h3>Problem to pilot</h3><ul><li>Define <b>outcomes</b>, not long specs.</li><li>Test focused, low-risk pilots.</li><li>Keep every stage visible.</li></ul></article><article className="info-card innovation"><span>02</span><h3>What makes it fair</h3><ul><li><b>Three experts</b> score each proposal.</li><li>Conflict-aware allocation.</li><li>Proof before major spend.</li></ul></article><article className="info-card prototype"><span>03</span><h3>Built into the portal</h3><ul><li>Role-based workspaces.</li><li>Fixed scores and feedback.</li><li>One view of pilot progress.</li></ul></article></div></section>
      <section className="shell section-space portal-section"><div className="section-heading row-heading"><div><p className="eyebrow">Three roles</p><h2>Choose your workspace.</h2></div><button className="btn btn-outline" onClick={() => setLoginModalOpen(true)}>Sign in</button></div><motion.div className="role-portal-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>{roles.map(({ key, title, icon: Icon, label, points }) => <motion.article className={`role-portal-card ${key}`} key={key} variants={reveal} transition={{ type: 'spring', stiffness: 180, damping: 20 }} whileHover={{ y: -8, scale: 1.012 }} whileTap={{ scale: .99 }}><div className="role-icon"><Icon size={22} /></div><p className="role-label">{title}</p><h3>{label}</h3><ul>{points.map(point => <li key={point}><CheckCircle2 size={16} />{point}</li>)}</ul><button className="card-link" onClick={() => openPortal(key)}>Open <ArrowRight size={17} /></button></motion.article>)}</motion.div></section>
      {/* SIH rule: an explicit visual workflow replaces explanatory paragraphs. */}
      {/* Four focused steps stay visible; hover reveals the remaining workflow. */}
      <section className="workflow-wrap" id="workflow"><div className="shell section-space"><div className="section-heading centered"><p className="eyebrow">How it works</p><h2>From challenge to scale.</h2><p>Hover to reveal the next stages.</p></div><div className="workflow-diagram" tabIndex="0" aria-label="Eight-stage innovation workflow"><div className="workflow-track">{PROCESS_FLOW_STEPS.map(step => <article className={`flow-node actor-${step.actor.toLowerCase().replaceAll(' ', '-')}`} key={step.step}><span className="flow-number">{step.step}</span><small>{step.actor}</small><h3>{step.title}</h3><p>{step.desc}</p></article>)}</div><div className="workflow-reveal-cue" aria-hidden="true">More steps →</div></div></div></section>
      <section className="shell section-space"><div className="section-heading row-heading"><div><p className="eyebrow">Challenge landscape</p><h2>Explore priority sectors.</h2></div><button className="btn btn-outline" onClick={() => navigate('/startup/challenges')}>Browse all challenges</button></div><div className="domains-grid redesigned-domains">{DOMAIN_CATEGORIES.map(cat => { const Icon = icons[cat.icon] || Cpu; return <button className="domain-item" key={cat.id} onClick={() => navigate(`/startup/challenges?domain=${cat.id}`)}><Icon size={21}/><strong>{cat.name}</strong><span>{cat.count} active challenges</span></button>; })}</div></section>
      <section className="shell section-space"><div className="assurance-panel"><div><p className="eyebrow">Built for fair decisions</p><h2>Structured review, honest evidence.</h2><p>Applications are scored against a consistent rubric and reviewed by multiple experts. The system is designed to make decisions easier to explain—not harder to audit.</p></div><div className="criteria-grid">{EVALUATION_CRITERIA.map(item => <div key={item.id}><strong>{item.weight}%</strong><span>{item.label}</span></div>)}</div></div></section>
      <section className="shell live-prototype"><div><p className="eyebrow">Live prototype</p><h2>Ready to see the workflow in action?</h2><p>Use the interactive role dashboards to post a challenge, submit a proposal, or complete an evaluation.</p></div><button className="btn btn-apply btn-lg" onClick={() => setRoleModalOpen(true)}>Try prototype <ArrowRight size={18}/></button></section>
    </main>
    <footer className="govt-footer"><div className="shell footer-content"><div><img src="/seedfund-wordmark.svg" alt="MIPP" className="footer-mark"/><p>Maharashtra Innovation Procurement Portal connects public challenges to accountable startup pilots.</p></div><div><h3>Useful links</h3><a href="https://maharashtra.gov.in" target="_blank" rel="noreferrer">Maharashtra Government</a><a href="https://msins.in" target="_blank" rel="noreferrer">MSINS</a></div><div><h3>Need support?</h3><p>support@mahabridge.gov.in<br/>Mon–Sat · 10 AM–6 PM</p></div></div><div className="shell footer-bottom">© 2026 Government of Maharashtra · Built for transparent innovation procurement.</div></footer>
    <RoleSelectionModal open={roleModalOpen} onClose={() => setRoleModalOpen(false)} onSelect={role => { setRoleModalOpen(false); openPortal(role === 'incubator' ? 'government' : role); }} />
    <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
  </div>;


  const [roleModalOpen, setRoleModalOpen] = React.useState(false);
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);

  return (
    <div className="app-container">
      <Navbar currentUser={currentUser} onRoleChange={onRoleChange} />

      <main className="main-content" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* New Hero - left text, right illustration */}
        <section style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 420px', minWidth: 320 }}>
            <h1 style={{ fontSize: '2.6rem', fontWeight: 800, color: 'var(--primary-navy)', lineHeight: 1.05 }}>Maharashtra Innovation Procurement Portal</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: 12, maxWidth: 640 }}>Where government challenges meet startup solutions. Post a problem, run a low-risk pilot, and scale what works — transparently, and on merit.</p>

            <div style={{ display: 'flex', gap: 12, marginTop: 18, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-apply" onClick={() => setRoleModalOpen(true)}>Post a Challenge</button>
              <button className="btn btn-outline" onClick={() => navigate('/startup/challenges')}>Browse Challenges</button>
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--primary-navy)', fontWeight: 700 }}>▶ Watch: How MIPP Works (90 sec)</a>
            </div>
          </div>

          <div style={{ flex: '0 0 420px', minWidth: 280, display: 'flex', justifyContent: 'center' }}>
            <img src="/hero-illustration.svg" alt="Hero illustration" style={{ width: '100%', maxWidth: 520 }} />
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
        <div className="process-flow-container" style={{ marginTop: '2.5rem' }}>
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
            <h4 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>Maharashtra Innovation Procurement Portal</h4>
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
 main
};
export default Landing;
