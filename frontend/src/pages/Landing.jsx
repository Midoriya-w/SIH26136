import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from '../components/common/Navbar';
import RoleSelectionModal from '../components/common/RoleSelectionModal';
import LoginModal from '../components/common/LoginModal';
import { DOMAIN_CATEGORIES, PROCESS_FLOW_STEPS, EVALUATION_CRITERIA } from '../data/mockData';
import { ArrowRight, CheckCircle2, Cpu, GraduationCap, HeartPulse, Landmark, Play, Rocket, ShieldCheck, Sprout, Building2, Leaf, Bus, UserCheck, Briefcase, Scale, Route, Trees } from 'lucide-react';

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
};
export default Landing;
