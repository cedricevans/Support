const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  return date;
};

const buildDetails = (caseData) => {
  const lines = [
    `Case Number: ${caseData?.caseNumber || 'N/A'}`,
    `Child: ${caseData?.childName || 'N/A'}`,
    `Custody Schedule: ${caseData?.custodySchedule || 'N/A'}`,
    `Monthly Income: ${caseData?.monthlyIncome || 'N/A'}`,
    `Other Parent Income: ${caseData?.otherParentIncome || 'N/A'}`,
    'Prepared with FamilyBridge.'
  ];
  return lines.join('\n');
};

export const getGoogleCalendarUrl = (caseData) => {
  const date = formatDate(caseData?.courtDate);
  if (!date) return 'https://calendar.google.com/calendar/u/0/r/eventedit';

  const start = date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const end = new Date(date.getTime() + 60 * 60 * 1000)
    .toISOString()
    .replace(/[-:]/g, '')
    .split('.')[0] + 'Z';

  const details = buildDetails(caseData);
  const params = new URLSearchParams({
    text: `FamilyBridge Court Prep: ${caseData?.caseNumber || 'Child Support Case'}`,
    dates: `${start}/${end}`,
    details,
    location: caseData?.courtName || 'Family Court'
  });

  return `https://calendar.google.com/calendar/u/0/r/eventedit?${params.toString()}`;
};

export const getOutlookCalendarUrl = (caseData) => {
  const date = formatDate(caseData?.courtDate);
  if (!date) return 'https://outlook.live.com/calendar/0/deeplink/compose';

  const start = date.toISOString();
  const end = new Date(date.getTime() + 60 * 60 * 1000).toISOString();
  const details = buildDetails(caseData);

  const params = new URLSearchParams({
    subject: `FamilyBridge Court Prep: ${caseData?.caseNumber || 'Child Support Case'}`,
    startdt: start,
    enddt: end,
    body: details,
    location: caseData?.courtName || 'Family Court'
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
};

export const downloadIcsFile = (caseData) => {
  const date = formatDate(caseData?.courtDate);
  if (!date) return;

  const start = date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const end = new Date(date.getTime() + 60 * 60 * 1000)
    .toISOString()
    .replace(/[-:]/g, '')
    .split('.')[0] + 'Z';

  const details = buildDetails(caseData).replace(/\n/g, '\\n');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FamilyBridge//Support Prep//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@familybridge.ai`,
    `DTSTAMP:${start}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:FamilyBridge Court Prep: ${caseData?.caseNumber || 'Child Support Case'}`,
    `LOCATION:${caseData?.courtName || 'Family Court'}`,
    `DESCRIPTION:${details}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'familybridge-court-prep.ics';
  link.click();
  URL.revokeObjectURL(link.href);
};
