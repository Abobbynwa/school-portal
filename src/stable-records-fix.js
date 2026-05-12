function addStableRecordsFix() {
  let style = document.getElementById("stable-records-fix-css");
  if (!style) {
    style = document.createElement("style");
    style.id = "stable-records-fix-css";
    document.head.appendChild(style);
  }

  style.textContent = `
    #records{display:block!important;position:relative!important;inset:auto!important;width:auto!important;height:auto!important;overflow:visible!important;background:#f4f7fb!important;padding:72px 6vw!important;max-width:1250px!important;margin:0 auto!important;z-index:1!important}
    #records:target{display:block!important;position:relative!important;inset:auto!important;width:auto!important;height:auto!important;overflow:visible!important;background:#f4f7fb!important;padding:72px 6vw!important;max-width:1250px!important;margin:0 auto!important;z-index:1!important}
    #records:target:before{display:none!important;content:none!important}
    .apiStatusCard~.dataGrid>.dataCard:nth-child(1),.apiStatusCard~.dataGrid>.dataCard:nth-child(2){display:block!important}
    .dataGrid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:20px!important}
    .record{display:grid!important}
    .classSection{display:block!important}
    .classGrid{display:grid!important}
    .dataCard{display:block!important}
    .authGrid .dataCard{display:block!important}
    #admission{display:block!important}
    .wideForm{display:grid!important}
    @media(max-width:800px){
      #records,#records:target{padding:42px 14px!important;width:100%!important;max-width:100%!important}
      .dataGrid,.adminGrid,.classGrid{grid-template-columns:1fr!important}
      .record span{word-break:break-word!important}
      .section{padding-left:14px!important;padding-right:14px!important}
    }
  `;
}

function runStableRecordsFix() {
  addStableRecordsFix();
}

window.addEventListener("load", runStableRecordsFix);
new MutationObserver(runStableRecordsFix).observe(document.documentElement, { childList: true, subtree: true });
setInterval(runStableRecordsFix, 1000);
