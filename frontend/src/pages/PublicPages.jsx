import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { ArrowRight, CheckCircle2, Download, FileText, PlayCircle, Sparkles } from 'lucide-react';

const content = {
  '/how-it-works': {
    icon: PlayCircle,
    label: 'A clear path from problem to progress',
    title: 'How Samarth works',
    intro: 'Government teams and solution providers move through one transparent workflow, from a public challenge to a measurable pilot.',
    steps: [
      ['01', 'Post a challenge', 'A department defines a real problem, the desired outcome, and the conditions for a focused pilot.'],
      ['02', 'Submit a solution', 'Startups discover open challenges and submit an evidence-backed proposal with a practical delivery plan.'],
      ['03', 'Independent evaluation', 'Three randomly allocated domain experts score every proposal using the same weighted criteria.'],
      ['04', 'Pilot and scale', 'The selected solution is measured against agreed milestones before wider adoption is considered.']
    ]
  },
  '/success-stories': {
    icon: Sparkles,
    label: 'Proof in the field',
    title: 'Success stories',
    intro: 'Explore examples of practical innovation creating better outcomes for communities and public teams across Maharashtra.',
    stories: [
      ['01', 'Flood response coordination', 'A shared operations dashboard helped district teams coordinate field updates faster during monsoon response.', 'Emergency Response'],
      ['02', 'Cleaner municipal routes', 'Route intelligence helped a city sanitation team reduce repeat trips and improve service visibility.', 'Urban Development'],
      ['03', 'Last-mile health access', 'A mobile-first care workflow connected rural health workers with specialists and follow-up support.', 'Public Health']
    ]
  },
  '/templates': {
    icon: FileText,
    label: 'Ready-to-use resources',
    title: 'Templates Library',
    intro: 'Use practical templates to prepare stronger challenge briefs, pilot plans, evaluation notes, and impact reports.',
    templates: [
      ['Challenge brief', 'Define the problem, users, constraints, and measurable outcome for an innovation challenge.'],
      ['Pilot proposal', 'Explain your solution, implementation plan, budget, risks, and evidence in a review-ready format.'],
      ['Evaluation note', 'Capture consistent scoring, expert rationale, and next-step recommendations after review.'],
      ['Pilot scorecard', 'Track delivery milestones, adoption, cost, and impact before deciding whether to scale.']
    ]
  }
};

const PublicPages = ({ path, currentUser, onRoleChange }) => {
  const page = content[path];
  const PageIcon = page.icon;

  return (
    <div className="app-container">
      <Navbar currentUser={currentUser} onRoleChange={onRoleChange} />
      <main className="main-content public-page">
        <section className="public-page-hero">
          <div>
            <span className="public-page-label"><PageIcon size={16} /> {page.label}</span>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
          </div>
          <div className="public-page-icon" aria-hidden="true"><PageIcon size={72} strokeWidth={1.2} /></div>
        </section>

        {page.steps && <section className="public-page-section"><div className="public-section-heading"><span>Four simple stages</span><h2>From public need to public value</h2></div><div className="public-steps">{page.steps.map(([number, title, description]) => <article className="public-step" key={number}><span className="public-step-number">{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div><div className="public-trust"><CheckCircle2 size={20} /><span><strong>Built for trust:</strong> common criteria, independent allocation, and milestone-based reporting keep decisions clear.</span></div></section>}

        {page.stories && <section className="public-page-section"><div className="public-section-heading"><span>Selected pilots</span><h2>Innovation that earns its next step</h2></div><div className="public-story-grid">{page.stories.map(([number, title, description, category]) => <article className="public-story" key={number}><div className="public-story-top"><span>{number}</span><small>{category}</small></div><h3>{title}</h3><p>{description}</p><Link to="/startup/challenges">Explore challenges <ArrowRight size={15} /></Link></article>)}</div></section>}

        {page.templates && <section className="public-page-section"><div className="public-section-heading"><span>Build with confidence</span><h2>Resources for every stage</h2></div><div className="public-template-grid">{page.templates.map(([title, description]) => <article className="public-template" key={title}><FileText size={22} /><h3>{title}</h3><p>{description}</p><button type="button"><Download size={15} /> Download template</button></article>)}</div></section>}

        <div className="public-page-cta"><div><strong>Ready to participate?</strong><span>Find an open challenge and bring a practical solution forward.</span></div><Link to="/startup/challenges">Browse challenges <ArrowRight size={16} /></Link></div>
      </main>
    </div>
  );
};

export default PublicPages;