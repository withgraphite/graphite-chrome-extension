const VIEW_ON_GRAPHITE_ID = 'view-on-graphite';
const TAB_ICON =
  '<svg style="margin-right: 6px; vertical-align: text-bottom;" xmlns="http://www.w3.org/2000/svg" height=16 width=16 viewBox="0 0 16 16"><path fill="currentColor" d="M9.7932,1.3079L3.101,3.101l-1.7932,6.6921,4.899,4.899,6.6921-1.7931,1.7932-6.6921L9.7932,1.3079Zm1.0936,11.6921H5.1133l-2.8867-5L5.1133,3h5.7735l2.8867,5-2.8867,5Z"/><polygon fill="currentColor" points="11.3504 4.6496 6.7737 3.4232 3.4232 6.7737 4.6496 11.3504 9.2263 12.5768 12.5768 9.2263 11.3504 4.6496"/></svg>';

function getGraphitePRUrl(): string | null {
  const matches = document.URL.match(/\/([^/]+)\/([^/]+)\/pull\/(\d+)/);

  if (matches) {
    const organization = matches[1];
    const repoName = matches[2];
    const pullRequestId = matches[3];

    return `https://app.graphite.dev/github/${organization}/${repoName}/pull/${pullRequestId}`;
  } else {
    return null;
  }
}

function addViewOnGraphiteButton() {
  if (document.getElementById(VIEW_ON_GRAPHITE_ID)) {
    return;
  }

  const tabs = document.querySelector('[aria-label="Pull request tabs"]');
  if (!tabs) {
    return;
  }

  const graphiteUrl = getGraphitePRUrl();
  if (!graphiteUrl) {
    return;
  }

  const a = document.createElement('a');
  a.id = VIEW_ON_GRAPHITE_ID;
  a.className = 'tabnav-tab flex-shrink-0';
  a.href = graphiteUrl;
  a.innerHTML = TAB_ICON + 'View this PR on Graphite';

  tabs.appendChild(a);
}

const MERGE_WARNING_ID = 'graphite-merge-warning';
const WARNING_ICON =
  '<svg style="margin-right: 4px; vertical-align: text-bottom;" xmlns="http://www.w3.org/2000/svg" height=20 width=20 viewBox="0 0 16 16"><path fill="currentColor" d="M9.7932,1.3079L3.101,3.101l-1.7932,6.6921,4.899,4.899,6.6921-1.7931,1.7932-6.6921L9.7932,1.3079Zm1.0936,11.6921H5.1133l-2.8867-5L5.1133,3h5.7735l2.8867,5-2.8867,5Z"/><polygon fill="currentColor" points="11.3504 4.6496 6.7737 3.4232 3.4232 6.7737 4.6496 11.3504 9.2263 12.5768 12.5768 9.2263 11.3504 4.6496"/></svg>';

function addMergeWarning() {
  if (document.getElementById(MERGE_WARNING_ID)) {
    return;
  }

  const merge = document.getElementsByClassName('merge-message')[0];
  if (!merge) {
    return;
  }

  const span = document.createElement('span');
  span.innerText = 'Merge this pull request on the Graphite dashboard';
  span.className = 'h4 status-heading color-fg-attention';

  const a = document.createElement('a');
  a.innerHTML = WARNING_ICON;
  a.id = MERGE_WARNING_ID;
  a.style.color = 'inherit';
  a.style.marginBottom = '8px';
  a.style.display = 'block';
  a.href =
    document.URL.replace('github.com', 'app.graphite.dev/github') +
    (document.URL.includes('?') ? '&' : '?') +
    'merge-modal=true';
  a.appendChild(span);

  merge.prepend(a);
}

function addGraphiteElements() {
  console.log('addGraphiteElements');
  addViewOnGraphiteButton();
  addMergeWarning();
}

new MutationObserver(addGraphiteElements).observe(document.body, {
  childList: true,
  attributes: true,
  subtree: true,
});

addGraphiteElements();

export {};
