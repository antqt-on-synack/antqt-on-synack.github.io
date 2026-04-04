const urlParams2 = new URLSearchParams(window.location.search);
const redirect3 = urlParams2.get('redirect3');
if(new URL(redirect3).hostname == window.location.hostname)
  window.location.href = redirect3;
