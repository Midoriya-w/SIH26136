import React from 'react';
import { AlertCircle, ArrowRight, BadgeCheck, CheckCircle2, RefreshCw, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StartupLayout from '../../layouts/StartupLayout';
import { MOCK_CHALLENGES } from '../../data/mockData';
import Button from '../../components/common/Button';

const checks = [
  ['DPIIT recognition', 'DPIIT94821 verified', true],
  ['Startup profile', 'Profile and sector details complete', true],
  ['Location eligibility', 'Registered in Maharashtra', true],
  ['Challenge requirements', 'Check individual challenge criteria', false],
];

const MatchEligibility = ({ currentUser, onRoleChange }) => {
  const navigate = useNavigate();
  const [checkedAt, setCheckedAt] = React.useState('Just now');
  const matches = MOCK_CHALLENGES.slice(0, 3).map((challenge, index) => ({ ...challenge, match: [94, 87, 79][index] }));
  return <StartupLayout currentUser={currentUser} onRoleChange={onRoleChange}>
    <div className="sandbox-page-heading"><p className="eyebrow">Startup Match & Eligibility Checker</p><h1>Find challenges your startup can pursue.</h1><p>Compare your verified profile, DPIIT recognition, sector, and challenge requirements before you apply.</p></div>
    <section className="ui-card eligibility-summary"><div className="eligibility-score"><span>Overall eligibility</span><strong>Eligible</strong><small><BadgeCheck size={15} /> 3 of 4 checks verified</small></div><div><h2>AgriVision Technologies</h2><p>DPIIT94821 · Maharashtra · AgriTech & citizen services</p><Button variant="outline" size="sm" icon={RefreshCw} onClick={() => setCheckedAt('Just now')}>Recheck eligibility</Button></div><span className="eligibility-updated">Last checked: {checkedAt}</span></section>
    <div className="eligibility-grid"><section className="ui-card sandbox-panel"><div className="sandbox-panel-heading"><CheckCircle2 size={20} /><div><h2>Eligibility checks</h2><p>Verified from your startup profile and connected records.</p></div></div><div className="eligibility-checks">{checks.map(([title, detail, passed]) => <div key={title}><span className={passed ? 'pass' : 'review'}>{passed ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}</span><div><b>{title}</b><small>{detail}</small></div><em>{passed ? 'Verified' : 'Review per challenge'}</em></div>)}</div></section><section className="ui-card sandbox-panel"><div className="sandbox-panel-heading"><Sparkles size={20} /><div><h2>How matching works</h2><p>Recommendations use transparent eligibility signals.</p></div></div><ul className="sandbox-policy-list"><li><CheckCircle2 />Sector and solution relevance</li><li><CheckCircle2 />Challenge eligibility requirements</li><li><CheckCircle2 />DPIIT recognition status</li><li><CheckCircle2 />Location and pilot readiness</li></ul></section></div>
    <section className="ui-card sandbox-panel"><div className="sandbox-panel-heading"><Sparkles size={20} /><div><h2>Recommended challenge matches</h2><p>Ranked for your startup profile.</p></div></div><div className="match-list">{matches.map(challenge => <article key={challenge.id}><div className="match-score"><strong>{challenge.match}%</strong><span>match</span></div><div><h3>{challenge.title}</h3><p>{challenge.department || 'Government of Maharashtra'} · {challenge.domain || 'Innovation challenge'}</p></div><Button variant="outline" size="sm" onClick={() => navigate(`/startup/challenges/${challenge.id}`)}>View <ArrowRight size={14} /></Button></article>)}</div></section>
  </StartupLayout>;
};

export default MatchEligibility;
