const urlParams2 = new URLSearchParams(window.location.search);
const redirect = urlParams2.get('redirect3');
if(new URL(redirect).hostname == window.location.hostname)
  window.location.href = redirect;
