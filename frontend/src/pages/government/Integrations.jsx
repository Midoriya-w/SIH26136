import React from 'react';
import { Building2, CheckCircle2, DatabaseZap, ExternalLink, RefreshCw, ShieldCheck } from 'lucide-react';
import GovernmentLayout from '../../layouts/GovernmentLayout';
import Button from '../../components/common/Button';

const connectors = [
  { id: 'gem', name: 'Government e-Marketplace (GeM)', short: 'GeM', description: 'Verify procurement categories, registered suppliers, and relevant marketplace records.', fields: ['Procurement category', 'Supplier registration', 'Catalogue match'], icon: Building2 },
  { id: 'dpiit', name: 'DPIIT Startup Recognition', short: 'DPIIT', description: 'Verify startup recognition, registration details, and sector information before evaluation.', fields: ['Recognition number', 'Registration status', 'Startup sector'], icon: ShieldCheck },
];

const Integrations = ({ currentUser, onRoleChange }) => {
  const [connected, setConnected] = React.useState({ gem: false, dpiit: false });
  const [lastSync, setLastSync] = React.useState({});
  const connect = (id) => {
    setConnected(current => ({ ...current, [id]: true }));
    setLastSync(current => ({ ...current, [id]: 'Just now · 24 records checked' }));
  };

  return <GovernmentLayout currentUser={currentUser} onRoleChange={onRoleChange}>
    <div className="sandbox-page-heading"><p className="eyebrow">Government data integrations</p><h1>Connect verified public data sources.</h1><p>Use GeM and DPIIT data to validate procurement relevance and startup eligibility before review.</p></div>
    <div className="integration-grid">{connectors.map(({ id, name, short, description, fields, icon: Icon }) => <section className="ui-card integration-card" key={id}>
      <div className="integration-card-top"><div className="integration-icon"><Icon size={23} /></div><span className={connected[id] ? 'integration-state connected' : 'integration-state'}>{connected[id] ? 'Connected' : 'Not connected'}</span></div>
      <h2>{name}</h2><p>{description}</p>
      <div className="integration-fields"><b>Data available after sync</b>{fields.map(field => <span key={field}><CheckCircle2 size={15} />{field}</span>)}</div>
      {connected[id] ? <><p className="integration-sync"><DatabaseZap size={16} />{lastSync[id]}</p><Button variant="outline" icon={RefreshCw} onClick={() => connect(id)}>Sync now</Button></> : <Button variant="saffron" icon={ExternalLink} onClick={() => connect(id)}>Connect {short}</Button>}
    </section>)}</div>
    <section className="ui-card integration-audit"><div><h2>Integration safeguards</h2><p>Only required verification fields are shown in the portal. Credentials and source-system access are handled by the secure backend integration service.</p></div><ul><li><CheckCircle2 />Department-approved access</li><li><CheckCircle2 />Read-only verification sync</li><li><CheckCircle2 />Logged sync history</li></ul></section>
  </GovernmentLayout>;
};

export default Integrations;
