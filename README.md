# Lead follow-up desk

A working React prototype for a ten-person operations team's lead follow-up process.

## Run locally

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by the server. `npm run build` creates a production bundle; `npm test` checks the core filtering and update behavior.

## Current behavior

- Search thirty sample leads by name or company.
- Show overdue follow-ups relative to 2026-10-19.
- Assign owners and change lead status.
- Keep edits in localStorage and restore them after refresh.
- Reset the demo to the supplied sample records.

The UI is functional but local only. There is no backend, user authentication, shared storage, production deployment or server-enforced authorization. No AI builder or hosting platform was used for this prototype.

## Next business requirement

The team already keeps its live leads and follow-up tasks in Salesforce. Salesforce must remain the source of truth. They want the working lead search, owner assignment, status editing and overdue-follow-up behavior to use those live records rather than browser-local copies. Ten people will use the workflow. Most should read records; designated managers may change owners and status. The team can maintain small changes but does not have a dedicated infrastructure team.

The existing interface is useful; preserving it is preferable where practical, but its implementation is not a fixed requirement. No integration, backend or deployment approach has been chosen. Native capabilities of the existing CRM and a separate interface are both possible approaches.

## Data and access

Every name, company, record and identifier is synthetic. `data/object-contract.json` describes the examples, not the full Salesforce API schema. The sample lead statuses need mapping to the actual organization's configured values. These are not valid Salesforce IDs.

There are no credentials or live service connections. Live authorization, permissions and API behavior require separately supplied access. Browser-local edits do not update any external system.
