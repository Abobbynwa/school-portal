function addMobileFixes() {
  if (document.getElementById("mobile-fixes-css")) return;

  const style = document.createElement("style");
  style.id = "mobile-fixes-css";
  style.textContent = `
    html,body,#root{max-width:100%;overflow-x:hidden!important}
    img,video,canvas,svg{max-width:100%;height:auto}
    input,select,textarea,button{max-width:100%}

    @media(max-width:768px){
      body{font-size:15px!important;background:#f4f7fb!important}
      .hero{min-height:auto!important;padding:16px 16px 48px!important;border-radius:0!important}
      .nav{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:14px!important;margin-bottom:34px!important;width:100%!important}
      .brand{font-size:1.05rem!important;line-height:1.2!important}
      .navLinks{display:flex!important;width:100%!important;gap:8px!important;overflow-x:auto!important;white-space:nowrap!important;padding-bottom:8px!important;scroll-snap-type:x proximity!important}
      .navLinks a{flex:0 0 auto!important;padding:9px 12px!important;font-size:.88rem!important;scroll-snap-align:start!important}
      .heroGrid{display:block!important;width:100%!important}
      .heroContent h1{font-size:2.35rem!important;line-height:1.05!important;letter-spacing:-.045em!important;max-width:100%!important}
      .lead{font-size:.98rem!important;line-height:1.65!important;margin-top:16px!important}
      .actions{gap:10px!important;margin-top:22px!important}
      .actions a,.primaryBtn,.secondaryBtn{width:100%!important;text-align:center!important;justify-content:center!important;display:flex!important}

      .publicSchoolSite{display:block!important;margin:0 auto 40px!important;padding:0 14px!important;width:100%!important;max-width:100%!important}
      .publicSideNav{position:relative!important;top:auto!important;margin:0 0 16px!important;border-radius:18px!important;padding:12px!important;overflow-x:auto!important;white-space:nowrap!important;display:flex!important;gap:8px!important;align-items:center!important}
      .publicSideNav strong{display:none!important}
      .publicSideNav a{display:inline-flex!important;flex:0 0 auto!important;padding:9px 12px!important;font-size:.88rem!important;background:rgba(255,255,255,.08)!important}
      .publicSiteMain{display:grid!important;gap:16px!important;width:100%!important}
      .publicHeroCards,.aboutGrid,.newsGrid,.galleryGrid,.contactGrid{display:grid!important;grid-template-columns:1fr!important;gap:14px!important;width:100%!important}
      .publicHeroCard,.publicSection,.publicInfoBox,.newsCard{border-radius:18px!important;padding:18px!important;width:100%!important}
      .publicHeroCard strong{font-size:1.25rem!important}
      .publicSectionHeader{display:block!important;margin-bottom:14px!important;padding-bottom:12px!important}
      .publicSectionHeader h2{font-size:1.65rem!important;line-height:1.05!important}
      .publicSectionHeader p,.publicInfoBox p,.publicInfoBox li,.newsCard p{font-size:.94rem!important;line-height:1.65!important}
      .galleryTile{min-height:110px!important;border-radius:16px!important}
      .publicAdmissionCTA{display:block!important;border-radius:18px!important;padding:18px!important}
      .publicAdmissionCTA h3{margin-top:0!important}
      .publicAdmissionCTA a{display:flex!important;justify-content:center!important;width:100%!important;margin-top:14px!important;text-align:center!important}

      .section{padding:42px 14px!important;width:100%!important;max-width:100%!important}
      .sectionHeader{text-align:left!important;margin-bottom:22px!important}
      .sectionHeader h2{font-size:1.8rem!important;line-height:1.1!important}
      .authGrid,.adminGrid,.dataGrid,.featureGrid,.portalWorkActions,.adminActionGrid,.allModuleGrid,.deskGrid,.studentDetailGrid,.subjectPickerGrid,.exactMetaGrid,.lowerTables,.bioGrid,.classGrid{display:grid!important;grid-template-columns:1fr!important;gap:12px!important;width:100%!important}
      .formCard,.dataCard,.featureCard,.portalRecordsDesk,.scoreFlowPanel{border-radius:18px!important;padding:16px!important;width:100%!important;max-width:100%!important;overflow:hidden!important}
      .portalActionCard,.deskCard,.classCard,.activeClassCard{border-radius:18px!important;padding:17px!important;width:100%!important}
      .apiStatusCard{flex-direction:column!important;align-items:stretch!important;border-radius:18px!important;padding:16px!important}
      .inlineActions{display:grid!important;grid-template-columns:1fr!important;width:100%!important}
      .inlineActions button,.inlineActions a,.apiStatusCard button{width:100%!important;justify-content:center!important}

      .portalModalOverlay,.studentExplorerModal,.resultPreviewOverlay{padding:10px!important}
      .portalModal,.studentExplorerModalInner,.resultPreviewModal{width:100%!important;max-width:100%!important;border-radius:18px!important;padding:12px!important;margin:0 auto!important}
      .portalModalTop,.studentExplorerModalTop,.resultPreviewTop{border-radius:14px!important;padding:12px!important;gap:10px!important}
      .portalModalTop h2,.studentExplorerModalTop h2,.resultPreviewTop h2{font-size:1.05rem!important;line-height:1.2!important}
      .portalModalTop button,.studentExplorerModalTop button,.resultPreviewTop button{padding:8px 10px!important;font-size:.85rem!important}

      .portalRecordsDesk h3{font-size:1.3rem!important}
      .deskTabs,.deskClassTabs,.studentClassTabs{display:flex!important;overflow-x:auto!important;white-space:nowrap!important;padding-bottom:6px!important;gap:8px!important}
      .deskTabs button,.deskClassTabs button,.studentClassTabs button{flex:0 0 auto!important;padding:9px 12px!important;font-size:.85rem!important}
      .deskTools,.studentBrowserTop{display:grid!important;grid-template-columns:1fr!important;gap:10px!important}
      .deskTools input,.deskTools select,.studentBrowserTop input,.studentBrowserTop select{width:100%!important;min-width:0!important}

      .tableScroll{overflow-x:auto!important;width:100%!important;-webkit-overflow-scrolling:touch!important}
      .exactInputTable{min-width:850px!important;font-size:11px!important}
      .exactResultBuilder{padding:12px!important;border-radius:16px!important}
      .exactResultBuilder h3{font-size:.95rem!important;padding:12px!important}
      .exactResultSheet{width:900px!important;max-width:none!important;transform:scale(.38)!important;transform-origin:top left!important;margin-bottom:-520px!important}
      .resultPreviewModal{overflow-x:auto!important}
      .resultPreviewModal .resultActions{position:sticky!important;bottom:0!important;background:white!important;padding-top:10px!important}
      .resultPreviewModal .resultActions button{width:100%!important}

      #records:target{padding:18px 12px 48px!important}
      #records:target:before{font-size:.88rem!important;padding:14px!important;border-radius:16px!important}
      main:after{font-size:.82rem!important;padding:24px 16px!important}
    }

    @media(max-width:420px){
      .heroContent h1{font-size:2rem!important}
      .publicHeroCard,.publicSection,.formCard,.dataCard,.portalRecordsDesk{padding:14px!important}
      .publicSectionHeader h2{font-size:1.45rem!important}
      .exactResultSheet{transform:scale(.34)!important;margin-bottom:-560px!important}
    }
  `;
  document.head.appendChild(style);
}

function improveMobileViewport() {
  let viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    viewport = document.createElement("meta");
    viewport.name = "viewport";
    document.head.appendChild(viewport);
  }
  viewport.content = "width=device-width, initial-scale=1, maximum-scale=1";
}

function runMobileFixes() {
  improveMobileViewport();
  addMobileFixes();
}

window.addEventListener("load", runMobileFixes);
new MutationObserver(runMobileFixes).observe(document.documentElement, { childList: true, subtree: true });
setInterval(runMobileFixes, 1500);
