(function(){var V='light ocean emerald lavender rose sand dark amoled violet forest slate cyber'.split(' ');function res(t){if(t==='system')return window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';return V.indexOf(t)>-1?t:null}window.__thRes=res;try{var r=res(localStorage.getItem('studyTracker.theme'));if(r)document.documentElement.dataset.theme=r}catch(e){}})();

document.addEventListener('click', function(e){
  var a = e.target && e.target.closest && e.target.closest('a[data-go]');
  if(a && !(e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1)) e.preventDefault();
}, true);
