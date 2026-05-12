function addMobileFixes() {
  let style = document.getElementById("mobile-fixes-css");
  if (!style) {
    style = document.createElement("style");
    style.id = "mobile-fixes-css";
    document.head.appendChild(style);
  }

  style.textContent = `
    html,body,#root{max-width:100%!important;overflow-x:hidden!important}
    *{box-sizing:border-box!important}
    img,video,canvas,svg{max-width:100%!important;height:auto!important}
    input,select,textarea,button{max-width:100%!important}

    @media(max-width:900px){
      body{font-size:15px!important;background:#f4f7fb!important;width:100%!important;max-width:100%!important;overflow-x:hidden!important}
      .hero,.publicHost .hero,.portalHost .hero{min-height:auto!important;padding:14px 14px 42px!important;border-radius:0!important;width:100%!important;max-width:100%!important}
      .nav,.publicHost .nav,.portalHost .nav{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:12px!important;margin-bottom:28px!important;width:100%!important;max-width:100%!important}
      .brand{font-size:1.05rem!important;line-height:1.2!important;max-width:100%!important}
      .navLinks,.publicHost .navLinks,.portalHost .navLinks{display:flex!important;width:100%!important;max-width:100%!important;gap:8px!important;overflow-x:auto!important;white-space:nowrap!important;padding:0 0 8px!important;scroll-snap-type:x proximity!important}
      .navLinks a,.publicHost .navLinks a,.portalHost .navLinks a{display:inline-flex!important;flex:0 0 auto!important;padding:9px 12px!important;font-size:.86rem!important;scroll-snap-align:start!important;border-radius:999px!important}
      .heroGrid,.publicHost .heroGrid,.portalHost .heroGrid{display:block!important;width:100%!important;max-width:100%!important}
      .heroContent,.publicHost .heroContent,.portalHost .heroContent{width:100%!important;max-width:100%!important}
      .heroContent h1{font-size:2.15rem!important;line-height:1.05!important;letter-spacing:-.045em!important;max-width:100%!important;word-break:normal!important}
      .lead{font-size:.96rem!important;line-height:1.65!important;margin-top:14px!important;max-width:100%!important}
      .actions{display:grid!important;grid-template-columns:1fr!important;gap:10px!important;margin-top:20px!important;width:100%!important}
      .actions a,.primaryBtn,.secondaryBtn{width:100%!important;text-align:center!important;justify-content:center!important;display:flex!important}

      .publicHost .publicSchoolSite,.publicSchoolSite{display:block!important;grid-template-columns:none!important;margin:0 auto 34px!important;padding:0 12px!important;width:100%!important;max-width:100%!important;gap:0!important}
      .publicHost .publicSideNav,.publicSideNav{position:relative!important;top:auto!important;margin:0 0 14px!important;border-radius:16px!important;padding:10px!important;overflow-x:auto!important;white-space:nowrap!important;display:flex!important;gap:8px!important;align-items:center!important;width:100%!important;max-width:100%!important}
      .publicHost .publicSideNav strong,.publicSideNav strong{display:none!important}
      .publicHost .publicSideNav a,.publicSideNav a{display:inline-flex!important;flex:0 0 auto!important;padding:9px 12px!important;font-size:.86rem!important;background:rgba(255,255,255,.08)!important;border-radius:999px!important}
      .publicHost .publicSiteMain,.publicSiteMain{display:grid!important;grid-template-columns:1fr!important;gap:14px!important;width:100%!important;max-width:100%!important}
      .publicHost .publicHeroCards,.publicHeroCards,.publicHost .aboutGrid,.aboutGrid,.publicHost .newsGrid,.newsGrid,.publicHost .galleryGrid,.galleryGrid,.publicHost .contactGrid,.contactGrid{display:grid!important;grid-template-columns:1fr!important;gap:12px!important;width:100%!important;max-width:100%!important}
      .publicHost .publicHeroCard,.publicHeroCard,.publicHost .publicSection,.publicSection,.publicHost .publicInfoBox,.publicInfoBox,.publicHost .newsCard,.newsCard{border-radius:16px!important;padding:15px!important;width:100%!important;max-width:100%!important;margin:0!important;overflow:hidden!important}
      .publicHeroCard strong{font-size:1.18rem!important;line-height:1.2!important}
      .publicSectionHeader{display:block!important;margin-bottom:12px!important;padding-bottom:10px!important}
      .publicSectionHeader h2{font-size:1.45rem!important;line-height:1.08!important}
      .publicSectionHeader p,.publicInfoBox p,.publicInfoBox li,.newsCard p{font-size:.92rem!important;line-height:1.6!important}
      .galleryTile{min-height:96px!important;border-radius:14px!important}
      .publicAdmissionCTA{display:block!important;border-radius:16px!important;padding:15px!important;width:100%!important;max-width:100%!important}
      .publicAdmissionCTA h3{margin-top:0!important;font-size:1.1rem!important}
      .publicAdmissionCTA a{display:flex!important;justify-content:center!important;width:100%!important;margin-top:12px!important;text-align:center!important}

      .section{padding:36px 12px!important;width:100%!important;max-width:100%!important;overflow:hidden!important}
      .sectionHeader{text-align:left!important;margin-bottom:18px!important}
      .sectionHeader h2{font-size:1.55rem!important;line-height:1.1!important}
      .authGrid,.adminGrid,.dataGrid,.featureGrid,.portalWorkActions,.adminActionGrid,.allModuleGrid,.deskGrid,.studentDetailGrid,.subjectPickerGrid,.exactMetaGrid,.lowerTables,.bioGrid,.classGrid,.scoreFlowGrid{display:grid!important;grid-template-columns:1fr!important;gap:12px!important;width:100%!important;max-width:100%!important}
      .formCard,.dataCard,.featureCard,.portalRecordsDesk,.scoreFlowPanel{border-radius:16px!important;padding:14px!important;width:100%!important;max-width:100%!important;overflow:hidden!important;margin-left:0!important;margin-right:0!important}
      .portalActionCard,.deskCard,.classCard,.activeClassCard{border-radius:16px!important;padding:15px!important;width:100%!important;max-width:100%!important;text-align:left!important}
      .apiStatusCard{flex-direction:column!important;align-items:stretch!important;border-radius:16px!important;padding:14px!important;width:100%!important}
      .inlineActions{display:grid!important;grid-template-columns:1fr!important;width:100%!important;gap:8px!important}
      .inlineActions button,.inlineActions a,.apiStatusCard button{width:100%!important;justify-content:center!important}

      .portalModalOverlay,.studentExplorerModal,.resultPreviewOverlay{padding:8px!important;overflow-x:hidden!important}
      .portalModal,.studentExplorerModalInner,.resultPreviewModal{width:100%!important;max-width:100%!important;border-radius:16px!important;padding:10px!important;margin:0 auto!important;overflow-x:hidden!important}
      .portalModalTop,.studentExplorerModalTop,.resultPreviewTop{border-radius:12px!important;padding:10px!important;gap:8px!important}
      .portalModalTop h2,.studentExplorerModalTop h2,.resultPreviewTop h2{font-size:1rem!important;line-height:1.2!important}
      .portalModalTop button,.studentExplorerModalTop button,.resultPreviewTop button{padding:8px 10px!important;font-size:.82rem!important}

      .portalRecordsDesk h3{font-size:1.2rem!important}
      .deskTabs,.deskClassTabs,.studentClassTabs{display:flex!important;overflow-x:auto!important;white-space:nowrap!important;padding-bottom:6px!important;gap:7px!important;width:100%!important}
      .deskTabs button,.deskClassTabs button,.studentClassTabs button{flex:0 0 auto!important;padding:8px 11px!important;font-size:.82rem!important}
      .deskTools,.studentBrowserTop{display:grid!important;grid-template-columns:1fr!important;gap:8px!important;width:100%!important}
      .deskTools input,.deskTools select,.studentBrowserTop input,.studentBrowserTop select{width:100%!important;min-width:0!important}

      .tableScroll{overflow-x:auto!important;width:100%!important;max-width:100%!important;-webkit-overflow-scrolling:touch!important}
      .exactInputTable{min-width:820px!important;font-size:11px!important}
      .exactResultBuilder{padding:10px!important;border-radius:14px!important;width:100%!important;max-width:100%!important}
      .exactResultBuilder h3{font-size:.9rem!important;padding:10px!important}
      .resultPreviewModal{overflow-x:auto!important}
      .exactResultSheet{width:860px!important;max-width:none!important;transform:scale(.37)!important;transform-origin:top left!important;margin-bottom:-520px!important}
      .resultPreviewModal .resultActions{position:sticky!important;bottom:0!important;background:white!important;padding-top:10px!important}
      .resultPreviewModal .resultActions button{width:100%!important}

      #records:target{padding:18px 12px 48px!important}
      #records:target:before{font-size:.86rem!important;padding:12px!important;border-radius:14px!important}
      main:after{font-size:.8rem!important;padding:22px 14px!important}
    }

    @media(max-width:420px){
      .heroContent h1{font-size:1.9rem!important}
      .publicHost .publicHeroCard,.publicHeroCard,.publicHost .publicSection,.publicSection,.formCard,.dataCard,.portalRecordsDesk{padding:12px!important}
      .publicSectionHeader h2{font-size:1.32rem!important}
      .exactResultSheet{transform:scale(.33)!important;margin-bottom:-570px!important}
    }
  `;
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
setInterval(runMobileFixes, 600);
