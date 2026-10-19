import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import initialLeads from '../data/leads.json';
import users from '../data/users.json';
import tasks from '../data/tasks.json';
import {statuses, referenceDate, selectLeads, overdueTasks, changeLead} from './domain.mjs';
import './style.css';
const key = 'lead-desk-demo-v1';
function load() {
  try { const saved = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(saved) && saved.length === initialLeads.length && saved.every(l => initialLeads.some(i => i.Id === l.Id) && statuses.includes(l.Status) && users.some(u => u.Id === l.OwnerId))) return saved;
  } catch {}
  return structuredClone(initialLeads);
}
function App() {
  const [leads, setLeads] = useState(load);
  const [query, setQuery] = useState('');
  const [overdueOnly, setOverdueOnly] = useState(false);
  const [notice, setNotice] = useState('');
  const visible = selectLeads(leads, tasks, {query, overdueOnly});
  function update(id, patch) {
    try { const next = changeLead(leads, id, patch, users); localStorage.setItem(key, JSON.stringify(next)); setLeads(next); setNotice('Saved in this browser only.'); }
    catch (e) {setNotice(e.message);}
  }
  return <main><header><div><p className="eyebrow">Operations</p><h1>Lead follow-up desk</h1></div><button onClick={() => {localStorage.removeItem(key);setLeads(structuredClone(initialLeads));setNotice('Sample records reset.');}}>Reset sample data</button></header>
    <p className="banner">Local prototype · Synthetic records · No live Salesforce connection</p>
    <section className="stats"><div><strong>{leads.length}</strong> leads</div><div><strong>{leads.filter(l => overdueTasks(tasks,l.Id).length).length}</strong> with overdue follow-ups</div><div><strong>{users.length}</strong> sample owners</div></section>
    <section className="filters"><label>Search leads<input placeholder="Name or company" value={query} onChange={e=>setQuery(e.target.value)}/></label><label className="check"><input type="checkbox" checked={overdueOnly} onChange={e=>setOverdueOnly(e.target.checked)}/>Overdue follow-ups only</label></section>
    <p role="status">{notice || `${visible.length} records · Reference date: ${referenceDate}`}</p>
    <div className="table"><table><thead><tr><th>Name / company</th><th>Owner</th><th>Status</th><th>Overdue follow-ups</th></tr></thead><tbody>{visible.map(l=><tr key={l.Id}><td><strong>{l.FirstName} {l.LastName}</strong><small>{l.Company}</small></td><td><select aria-label={`Owner for ${l.Id}`} value={l.OwnerId} onChange={e=>update(l.Id,{OwnerId:e.target.value})}>{users.map(u=><option key={u.Id} value={u.Id}>{u.Name}</option>)}</select></td><td><select aria-label={`Status for ${l.Id}`} value={l.Status} onChange={e=>update(l.Id,{Status:e.target.value})}>{statuses.map(s=><option key={s}>{s}</option>)}</select></td><td>{overdueTasks(tasks,l.Id).map(t=><small key={t.Id}>{t.Subject} · {t.ActivityDate}</small>)}{!overdueTasks(tasks,l.Id).length && 'None'}</td></tr>)}</tbody></table>{!visible.length&&<p>No matching leads.</p>}</div>
    <footer>Changes are local to this browser. There is no backend, shared storage, sign-in or enforced access control.</footer></main>;
}
createRoot(document.getElementById('root')).render(<App/>);
