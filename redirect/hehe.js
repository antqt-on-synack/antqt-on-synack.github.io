const urlParams = new URLSearchParams(window.location.search);
const redirect = urlParams.get('redirect3');
if(new URL(redirect).hostname == window.location.hostname)
  window.location.href = redirect;
