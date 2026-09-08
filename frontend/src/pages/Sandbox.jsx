import React from 'react';
import { CheckCircle2, Clock3, Container, FileCheck2, Gauge, LockKeyhole, Play, ShieldCheck, Upload } from 'lucide-react';
import Button from '../components/common/Button';
import GovernmentLayout from '../layouts/GovernmentLayout';
import StartupLayout from '../layouts/StartupLayout';

const initialResult = {
  version: 'v1.2', score: 82, status: 'Passed', runtime: '1.24 s', memory: '184 MB',
  tests: '18 / 20', accuracy: 90, performance: 78, reliability: 85, resources: 75,
};

const ScoreRow = ({ label, weight, score }) => <div className="sandbox-score-row"><span>{label} <small>{weight}%</small></span><div><i style={{ width: `${score}%` }} /></div><b>{score}</b></div>;

const Sandbox = ({ role, currentUser, onRoleChange }) => {
  const Layout = role === 'government' ? GovernmentLayout : StartupLayout;
  const [threshold, setThreshold] = React.useState(75);
  const [result, setResult] = React.useState(initialResult);
  const [submitted, setSubmitted] = React.useState(false);
  const [decision, setDecision] = React.useState('Pending government review');
  const [milestone, setMilestone] = React.useState(1);

  const submitSolution = () => {
    setSubmitted(true);
    setResult({ ...initialResult, version: 'v1.3', score: 84, status: 'Passed', runtime: '1.12 s', memory: '176 MB', tests: '19 / 20' });
  };
  const passed = result.score >= threshold;

  const content = role === 'government' ? <>
    <div className="sandbox-page-heading"><p className="eyebrow">Sandbox control centre</p><h1>Configure, test, and qualify solutions.</h1><p>Define objective tests before startups submit solutions for isolated evaluation.</p></div>
    <div className="sandbox-grid">
      <section className="ui-card sandbox-panel"><div className="sandbox-panel-heading"><Container size={20} /><div><h2>Challenge configuration</h2><p>Public API optimisation challenge</p></div></div>
        <label>Problem statement<textarea defaultValue="Improve the accuracy and response time of the citizen service eligibility API." /></label>
        <label>Expected output<textarea defaultValue="A valid JSON decision, confidence score, and response within the defined SLA." /></label>
        <div className="sandbox-two-column"><label>Passing threshold<input type="number" value={threshold} onChange={event => setThreshold(Number(event.target.value))} min="0" max="100" /></label><label>Execution timeout<input defaultValue="30 seconds" /></label></div>
        <label>Test dataset<input defaultValue="eligibility-suite-v3.json · 20 private cases" readOnly /></label>
        <Button variant="saffron" icon={FileCheck2}>Save sandbox configuration</Button>
      </section>
      <section className="ui-card sandbox-panel"><div className="sandbox-panel-heading"><ShieldCheck size={20} /><div><h2>Isolation policy</h2><p>Applied to every submitted version</p></div></div>
        <ul className="sandbox-policy-list"><li><CheckCircle2 />2 vCPU maximum</li><li><CheckCircle2 />512 MB memory maximum</li><li><CheckCircle2 />Network access blocked</li><li><CheckCircle2 />No application or database access</li><li><CheckCircle2 />Automatic cleanup after execution</li></ul>
        <div className="sandbox-callout"><LockKeyhole size={18} /><span>Every run uses a short-lived, isolated environment.</span></div>
      </section>
    </div>
    <section className="ui-card sandbox-panel sandbox-review"><div className="sandbox-panel-heading"><Gauge size={20} /><div><h2>Automated evaluation report</h2><p>{result.version} · submitted by AgriVision Technologies</p></div><span className={`sandbox-status ${passed ? 'passed' : 'failed'}`}>{passed ? 'Passed' : 'Failed'} · {result.score}/100</span></div>
      <div className="sandbox-report-grid"><div><ScoreRow label="Accuracy" weight={40} score={result.accuracy} /><ScoreRow label="Performance" weight={20} score={result.performance} /><ScoreRow label="Reliability" weight={20} score={result.reliability} /><ScoreRow label="Resource usage" weight={20} score={result.resources} /></div><div className="sandbox-run-summary"><strong>{result.tests}</strong><span>test cases passed</span><strong>{result.runtime}</strong><span>execution time</span><strong>{result.memory}</strong><span>peak memory</span></div></div>
      <div className="sandbox-actions"><p>Required score: <b>{threshold}/100</b> · Result: <b>{passed ? 'Qualified for review' : 'Resubmission required'}</b></p><div><Button variant="outline" onClick={() => setDecision('Feedback requested from startup')}>Request changes</Button><Button variant="saffron" icon={CheckCircle2} onClick={() => setDecision('Approved for prototype milestone')}>Approve solution</Button></div></div>
      <p className="sandbox-decision">{decision}</p>
    </section>
    <Milestones role={role} active={milestone} onAdvance={() => setMilestone(value => Math.min(value + 1, 3))} />
  </> : <>
    <div className="sandbox-page-heading"><p className="eyebrow">Solution sandbox</p><h1>Test your solution before pilot.</h1><p>Submit a versioned solution; it will be tested safely against the department’s private challenge cases.</p></div>
    <div className="sandbox-grid">
      <section className="ui-card sandbox-panel"><div className="sandbox-panel-heading"><Upload size={20} /><div><h2>Submit solution</h2><p>Government challenge: Citizen Service Eligibility API</p></div></div>
        <label>Submission method<select defaultValue="container"><option value="container">Docker container</option><option value="api">API endpoint</option><option value="package">Solution package</option></select></label>
        <label>Container image or endpoint<input defaultValue="registry.agri-vision.in/eligibility-api:1.3" /></label>
        <label>Version notes<textarea defaultValue="Improved validation accuracy and reduced response latency." /></label>
        <Button variant="saffron" icon={Play} onClick={submitSolution}>Submit for sandbox testing</Button>
        {submitted && <p className="sandbox-success"><CheckCircle2 size={17} /> Version v1.3 queued and evaluated successfully.</p>}
      </section>
      <section className="ui-card sandbox-panel"><div className="sandbox-panel-heading"><LockKeyhole size={20} /><div><h2>What is tested</h2><p>Your solution runs in a protected environment.</p></div></div>
        <ul className="sandbox-policy-list"><li><CheckCircle2 />Correctness against private cases</li><li><CheckCircle2 />Response time and reliability</li><li><CheckCircle2 />CPU and memory consumption</li><li><CheckCircle2 />No access to production systems</li></ul>
      </section>
    </div>
    <section className="ui-card sandbox-panel sandbox-review"><div className="sandbox-panel-heading"><FileCheck2 size={20} /><div><h2>Your latest evaluation report</h2><p>{result.version} · {result.tests} test cases passed</p></div><span className={`sandbox-status ${passed ? 'passed' : 'failed'}`}>{passed ? 'Passed' : 'Failed'} · {result.score}/100</span></div>
      <div className="sandbox-report-grid"><div><ScoreRow label="Accuracy" weight={40} score={result.accuracy} /><ScoreRow label="Performance" weight={20} score={result.performance} /><ScoreRow label="Reliability" weight={20} score={result.reliability} /><ScoreRow label="Resource usage" weight={20} score={result.resources} /></div><div className="sandbox-run-summary"><strong>{result.runtime}</strong><span>execution time</span><strong>{result.memory}</strong><span>peak memory</span><strong>{threshold}/100</strong><span>passing score</span></div></div>
      <p className="sandbox-decision">{passed ? 'Your solution meets the automated threshold and is ready for government review.' : 'Improve the solution and submit a new version to test again.'}</p>
    </section>
    <section className="ui-card sandbox-panel"><h2>Submission history</h2><div className="sandbox-history"><span>v1.3 <b>84/100</b><em>Passed</em></span><span>v1.2 <b>82/100</b><em>Passed</em></span><span>v1.1 <b>63/100</b><em className="failed">Failed</em></span></div></section>
    <Milestones role={role} active={milestone} onAdvance={() => setMilestone(value => Math.min(value + 1, 3))} />
  </>;
  return <Layout currentUser={currentUser} onRoleChange={onRoleChange}>{content}</Layout>;
};

const Milestones = ({ role, active, onAdvance }) => <section className="ui-card sandbox-panel"><div className="sandbox-panel-heading"><Clock3 size={20} /><div><h2>Milestone progress</h2><p>Advance only after government approval.</p></div></div><div className="sandbox-milestones">{['Sandbox evaluation', 'Prototype', 'Pilot', 'Production'].map((name, index) => <div className={index <= active ? 'active' : ''} key={name}><span>{index < active ? <CheckCircle2 size={16} /> : index + 1}</span><b>{name}</b></div>)}</div>{active < 3 && role !== 'startup' && <Button variant="outline" size="sm" onClick={onAdvance}>Approve next milestone</Button>}</section>;

export default Sandbox;
