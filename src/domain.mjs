export const statuses = ['Open', 'Working', 'Qualified', 'Closed'];
export const referenceDate = '2026-10-19';
export function overdueTasks(tasks, leadId, asOf = referenceDate) {
  return tasks.filter(t => t.WhoId === leadId && t.Status !== 'Completed' && t.ActivityDate < asOf);
}
export function selectLeads(leads, tasks, {query = '', overdueOnly = false} = {}) {
  const q = query.toLowerCase().trim();
  return leads.filter(l => `${l.FirstName} ${l.LastName} ${l.Company}`.toLowerCase().includes(q)
    && (!overdueOnly || overdueTasks(tasks, l.Id).length > 0));
}
export function changeLead(leads, id, patch, users) {
  if (!leads.some(l => l.Id === id)) throw new Error('Unknown lead');
  if (Object.keys(patch).some(k => !['OwnerId', 'Status'].includes(k))) throw new Error('Unsupported field');
  if (patch.Status !== undefined && !statuses.includes(patch.Status)) throw new Error('Invalid status');
  if (patch.OwnerId !== undefined && !users.some(u => u.Id === patch.OwnerId)) throw new Error('Unknown owner');
  return leads.map(l => l.Id === id ? {...l, ...patch} : l);
}
