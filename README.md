# CRM records context

A synthetic planning example for a small company's lead follow-up workflow.

## Business context

A 20-person company has ten operations users. Leads, contacts and follow-up tasks currently live in Salesforce, which should remain the source of truth. The team needs to assign leads, identify overdue follow-ups and update lead status. Viewers should read records; managers should also make changes. Engineering capacity is limited, so ongoing maintenance matters.

No application, frontend framework, hosting provider or integration approach has been chosen. Native features of the existing CRM and a separate interface are both possible approaches.

## Files and fields

- `data/users.json`: synthetic record owners; Id and Name.
- `data/leads.json`: Id, FirstName, LastName, Company, Status and OwnerId.
- `data/contacts.json`: Id, FirstName, LastName, AccountName and OwnerId.
- `data/tasks.json`: Id, WhoId (lead or contact), OwnerId, Subject, ActivityDate and Status.
- `data/object-contract.json`: types and relationships for these examples.

The reference date is 2026-10-17. An overdue follow-up has ActivityDate before that date and is not Completed. Suggested lead statuses in this example are Open, Working, Qualified and Closed.

## Limits

All names, identifiers and records are invented. These files are illustrative snapshots, not exports from an actual organization. The identifiers are example keys, not usable service identifiers. There is no live CRM instance, connected API, account or credential. The object contract describes the supplied examples rather than a full provider API specification. This context supports architecture and tool recommendations; live integration behavior requires separately supplied test access.
