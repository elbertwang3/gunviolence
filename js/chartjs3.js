!function(t){"function"==typeof define&&define.amd?define(["jquery","datatables.net","datatables.net-buttons"],function(e){return t(e,window,document)}):"object"==typeof exports?module.exports=function(e,o,l,n){return e||(e=window),o&&o.fn.dataTable||(o=require("datatables.net")(e,o).$),o.fn.dataTable.Buttons||require("datatables.net-buttons")(e,o),t(o,e,e.document,l,n)}:t(jQuery,window,document)}(function(t,e,o,l,n,r){"use strict";function a(){return l||e.JSZip}function d(){return n||e.pdfMake}function p(t){for(var e="A".charCodeAt(0),o="Z".charCodeAt(0),l=o-e+1,n="";t>=0;)n=String.fromCharCode(t%l+e)+n,t=Math.floor(t/l)-1;return n}function i(e,o){h===r&&(h=-1===g.serializeToString(t.parseXML(w["xl/worksheets/sheet1.xml"])).indexOf("xmlns:r")),t.each(o,function(o,l){if(t.isPlainObject(l)){var n=e.folder(o);i(n,l)}else{if(h){var r,a,d=l.childNodes[0],p=[];for(r=d.attributes.length-1;r>=0;r--){var f=d.attributes[r].nodeName,s=d.attributes[r].nodeValue;-1!==f.indexOf(":")&&(p.push({name:f,value:s}),d.removeAttribute(f))}for(r=0,a=p.length;a>r;r++){var m=l.createAttribute(p[r].name.replace(":","_dt_b_namespace_token_"));m.value=p[r].value,d.setAttributeNode(m)}}var y=g.serializeToString(l);h&&(-1===y.indexOf("<?xml")&&(y='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+y),y=y.replace(/_dt_b_namespace_token_/g,":")),y=y.replace(/<([^<>]*?) xmlns=""([^<>]*?)>/g,"<$1 $2>"),e.file(o,y)}})}function f(e,o,l){var n=e.createElement(o);return l&&(l.attr&&t(n).attr(l.attr),l.children&&t.each(l.children,function(t,e){n.appendChild(e)}),l.text&&n.appendChild(e.createTextNode(l.text))),n}function s(t,e){var o,l,n,a=t.header[e].length;t.footer&&t.footer[e].length>a&&(a=t.footer[e].length);for(var d=0,p=t.body.length;p>d;d++){var i=t.body[d][e];if(n=null!==i&&i!==r?i.toString():"",-1!==n.indexOf("\n")?(l=n.split("\n"),l.sort(function(t,e){return e.length-t.length}),o=l[0].length):o=n.length,o>a&&(a=o),a>40)return 52}return a*=1.3,a>6?a:6}var m=t.fn.dataTable,y=function(t){if(!("undefined"==typeof t||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var e=t.document,o=function(){return t.URL||t.webkitURL||t},l=e.createElementNS("http://www.w3.org/1999/xhtml","a"),n="download"in l,a=function(t){var e=new MouseEvent("click");t.dispatchEvent(e)},d=/constructor/i.test(t.HTMLElement)||t.safari,p=/CriOS\/[\d]+/.test(navigator.userAgent),i=function(e){(t.setImmediate||t.setTimeout)(function(){throw e},0)},f="application/octet-stream",s=4e4,m=function(t){var e=function(){"string"==typeof t?o().revokeObjectURL(t):t.remove()};setTimeout(e,s)},y=function(t,e,o){e=[].concat(e);for(var l=e.length;l--;){var n=t["on"+e[l]];if("function"==typeof n)try{n.call(t,o||t)}catch(r){i(r)}}},u=function(t){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t},c=function(e,i,s){s||(e=u(e));var c,I=this,F=e.type,x=F===f,b=function(){y(I,"writestart progress write writeend".split(" "))},h=function(){if((p||x&&d)&&t.FileReader){var l=new FileReader;return l.onloadend=function(){var e=p?l.result:l.result.replace(/^data:[^;]*;/,"data:attachment/file;"),o=t.open(e,"_blank");o||(t.location.href=e),e=r,I.readyState=I.DONE,b()},l.readAsDataURL(e),void(I.readyState=I.INIT)}if(c||(c=o().createObjectURL(e)),x)t.location.href=c;else{var n=t.open(c,"_blank");n||(t.location.href=c)}I.readyState=I.DONE,b(),m(c)};return I.readyState=I.INIT,n?(c=o().createObjectURL(e),void setTimeout(function(){l.href=c,l.download=i,a(l),b(),m(c),I.readyState=I.DONE})):void h()},I=c.prototype,F=function(t,e,o){return new c(t,e||t.name||"download",o)};return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(t,e,o){return e=e||t.name||"download",o||(t=u(t)),navigator.msSaveOrOpenBlob(t,e)}:(I.abort=function(){},I.readyState=I.INIT=0,I.WRITING=1,I.DONE=2,I.error=I.onwritestart=I.onprogress=I.onwrite=I.onabort=I.onerror=I.onwriteend=null,F)}}("undefined"!=typeof self&&self||"undefined"!=typeof e&&e||this.content);m.fileSave=y;var u=function(e,o){var l="*"===e.filename&&"*"!==e.title&&e.title!==r?e.title:e.filename;return"function"==typeof l&&(l=l()),-1!==l.indexOf("*")&&(l=t.trim(l.replace("*",t("title").text()))),l=l.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g,""),o===r||o===!0?l+e.extension:l},c=function(t){var e="Sheet1";return t.sheetName&&(e=t.sheetName.replace(/[\[\]\*\/\\\?\:]/g,"")),e},I=function(e){var o=e.title;return"function"==typeof o&&(o=o()),-1!==o.indexOf("*")?o.replace("*",t("title").text()||"Exported data"):o},F=function(t){return t.newline?t.newline:navigator.userAgent.match(/Windows/)?"\r\n":"\n"},x=function(t,e){for(var o=F(e),l=t.buttons.exportData(e.exportOptions),n=e.fieldBoundary,a=e.fieldSeparator,d=new RegExp(n,"g"),p=e.escapeChar!==r?e.escapeChar:"\\",i=function(t){for(var e="",o=0,l=t.length;l>o;o++)o>0&&(e+=a),e+=n?n+(""+t[o]).replace(d,p+n)+n:t[o];return e},f=e.header?i(l.header)+o:"",s=e.footer&&l.footer?o+i(l.footer):"",m=[],y=0,u=l.body.length;u>y;y++)m.push(i(l.body[y]));return{str:f+m.join(o)+s,rows:m.length}},b=function(){var t=-1!==navigator.userAgent.indexOf("Safari")&&-1===navigator.userAgent.indexOf("Chrome")&&-1===navigator.userAgent.indexOf("Opera");if(!t)return!1;var e=navigator.userAgent.match(/AppleWebKit\/(\d+\.\d+)/);return e&&e.length>1&&1*e[1]<603.1?!0:!1};try{var h,g=new XMLSerializer}catch(v){}var w={"_rels/.rels":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',"xl/_rels/workbook.xml.rels":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',"[Content_Types].xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml" /><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" /><Default Extension="jpeg" ContentType="image/jpeg" /><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" /><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" /><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" /></Types>',"xl/workbook.xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/><workbookPr showInkAnnotation="0" autoCompressPictures="0"/><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/></bookViews><sheets><sheet name="" sheetId="1" r:id="rId1"/></sheets></workbook>',"xl/worksheets/sheet1.xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><sheetData/></worksheet>',"xl/styles.xml":'<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><numFmts count="6"><numFmt numFmtId="164" formatCode="#,##0.00_- [$$-45C]"/><numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/><numFmt numFmtId="166" formatCode="[$€-2] #,##0.00"/><numFmt numFmtId="167" formatCode="0.0%"/><numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/><numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/></numFmts><fonts count="5" x14ac:knownFonts="1"><font><sz val="11" /><name val="Calibri" /></font><font><sz val="11" /><name val="Calibri" /><color rgb="FFFFFFFF" /></font><font><sz val="11" /><name val="Calibri" /><b /></font><font><sz val="11" /><name val="Calibri" /><i /></font><font><sz val="11" /><name val="Calibri" /><u /></font></fonts><fills count="6"><fill><patternFill patternType="none" /></fill><fill/><fill><patternFill patternType="solid"><fgColor rgb="FFD9D9D9" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD99795" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6efce" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6cfef" /><bgColor indexed="64" /></patternFill></fill></fills><borders count="2"><border><left /><right /><top /><bottom /><diagonal /></border><border diagonalUp="false" diagonalDown="false"><left style="thin"><color auto="1" /></left><right style="thin"><color auto="1" /></right><top style="thin"><color auto="1" /></top><bottom style="thin"><color auto="1" /></bottom><diagonal /></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" /></cellStyleXfs><cellXfs count="67"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="left"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="center"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="right"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="fill"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment textRotation="90"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment wrapText="1"/></xf><xf numFmtId="9"   fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="165" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="1" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="2" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0" /></cellStyles><dxfs count="0" /><tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" /></styleSheet>'},B=[{match:/^\-?\d+\.\d%$/,style:60,fmt:function(t){return t/100}},{match:/^\-?\d+\.?\d*%$/,style:56,fmt:function(t){return t/100}},{match:/^\-?\$[\d,]+.?\d*$/,style:57},{match:/^\-?£[\d,]+.?\d*$/,style:58},{match:/^\-?€[\d,]+.?\d*$/,style:59},{match:/^\-?\d+$/,style:65},{match:/^\-?\d+\.\d{2}$/,style:66},{match:/^\([\d,]+\)$/,style:61,fmt:function(t){return-1*t.replace(/[\(\)]/g,"")}},{match:/^\([\d,]+\.\d{2}\)$/,style:62,fmt:function(t){return-1*t.replace(/[\(\)]/g,"")}},{match:/^\-?[\d,]+$/,style:63},{match:/^\-?[\d,]+\.\d{2}$/,style:64}];return m.ext.buttons.copyHtml5={className:"buttons-copy buttons-html5",text:function(t){return t.i18n("buttons.copy","Copy")},action:function(e,l,n,r){this.processing(!0);var a=this,d=x(l,r),p=d.str,i=t("<div/>").css({height:1,width:1,overflow:"hidden",position:"fixed",top:0,left:0});r.customize&&(p=r.customize(p,r));var f=t("<textarea readonly/>").val(p).appendTo(i);if(o.queryCommandSupported("copy")){i.appendTo(l.table().container()),f[0].focus(),f[0].select();try{var s=o.execCommand("copy");if(i.remove(),s)return l.buttons.info(l.i18n("buttons.copyTitle","Copy to clipboard"),l.i18n("buttons.copySuccess",{1:"Copied one row to clipboard",_:"Copied %d rows to clipboard"},d.rows),2e3),void this.processing(!1)}catch(m){}}var y=t("<span>"+l.i18n("buttons.copyKeys","Press <i>ctrl</i> or <i>⌘</i> + <i>C</i> to copy the table data<br>to your system clipboard.<br><br>To cancel, click this message or press escape.")+"</span>").append(i);l.buttons.info(l.i18n("buttons.copyTitle","Copy to clipboard"),y,0),f[0].focus(),f[0].select();var u=t(y).closest(".dt-button-info"),c=function(){u.off("click.buttons-copy"),t(o).off(".buttons-copy"),l.buttons.info(!1)};u.on("click.buttons-copy",c),t(o).on("keydown.buttons-copy",function(t){27===t.keyCode&&(c(),a.processing(!1))}).on("copy.buttons-copy cut.buttons-copy",function(){c(),a.processing(!1)})},exportOptions:{},fieldSeparator:"	",fieldBoundary:"",header:!0,footer:!1},m.ext.buttons.csvHtml5={bom:!1,className:"buttons-csv buttons-html5",available:function(){return e.FileReader!==r&&e.Blob},text:function(t){return t.i18n("buttons.csv","CSV")},action:function(t,e,l,n){this.processing(!0);var r=x(e,n).str,a=n.charset;n.customize&&(r=n.customize(r,n)),a!==!1?(a||(a=o.characterSet||o.charset),a&&(a=";charset="+a)):a="",n.bom&&(r="\ufeff"+r),y(new Blob([r],{type:"text/csv"+a}),u(n),!0),this.processing(!1)},filename:"*",extension:".csv",exportOptions:{},fieldSeparator:",",fieldBoundary:'"',escapeChar:'"',charset:null,header:!0,footer:!1},m.ext.buttons.excelHtml5={className:"buttons-excel buttons-html5",available:function(){return e.FileReader!==r&&a()!==r&&!b()&&g},text:function(t){return t.i18n("buttons.excel","Excel")},action:function(e,o,l,n){this.processing(!0);var d,m,I=this,F=0,x=function(e){var o=w[e];return t.parseXML(o)},b=x("xl/worksheets/sheet1.xml"),h=b.getElementsByTagName("sheetData")[0],g={_rels:{".rels":x("_rels/.rels")},xl:{_rels:{"workbook.xml.rels":x("xl/_rels/workbook.xml.rels")},"workbook.xml":x("xl/workbook.xml"),"styles.xml":x("xl/styles.xml"),worksheets:{"sheet1.xml":b}},"[Content_Types].xml":x("[Content_Types].xml")},v=o.buttons.exportData(n.exportOptions),k=function(e){d=F+1,m=f(b,"row",{attr:{r:d}});for(var o=0,l=e.length;l>o;o++){var n=p(o)+""+d,a=null;if(null!==e[o]&&e[o]!==r&&""!==e[o]){e[o]=t.trim(e[o]);for(var i=0,s=B.length;s>i;i++){var y=B[i];if(e[o].match&&!e[o].match(/^0\d+/)&&e[o].match(y.match)){var u=e[o].replace(/[^\d\.\-]/g,"");y.fmt&&(u=y.fmt(u)),a=f(b,"c",{attr:{r:n,s:y.style},children:[f(b,"v",{text:u})]});break}}if(!a)if("number"==typeof e[o]||e[o].match&&e[o].match(/^-?\d+(\.\d+)?$/)&&!e[o].match(/^0\d+/))a=f(b,"c",{attr:{t:"n",r:n},children:[f(b,"v",{text:e[o]})]});else{var c=e[o].replace?e[o].replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g,""):e[o];a=f(b,"c",{attr:{t:"inlineStr",r:n},children:{row:f(b,"is",{children:{row:f(b,"t",{text:c})}})}})}m.appendChild(a)}}h.appendChild(m),F++};t("sheets sheet",g.xl["workbook.xml"]).attr("name",c(n)),n.customizeData&&n.customizeData(v),n.header&&(k(v.header,F),t("row c",b).attr("s","2"));for(var C=0,S=v.body.length;S>C;C++)k(v.body[C],F);n.footer&&v.footer&&(k(v.footer,F),t("row:last c",b).attr("s","2"));var T=f(b,"cols");t("worksheet",b).prepend(T);for(var N=0,O=v.header.length;O>N;N++)T.appendChild(f(b,"col",{attr:{min:N+1,max:N+1,width:s(v,N),customWidth:1}}));n.customize&&n.customize(g);var z=a(),D=new z,A={type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"};i(D,g),D.generateAsync?D.generateAsync(A).then(function(t){y(t,u(n)),I.processing(!1)}):(y(D.generate(A),u(n)),this.processing(!1))},filename:"*",extension:".xlsx",exportOptions:{},header:!0,footer:!1},m.ext.buttons.pdfHtml5={className:"buttons-pdf buttons-html5",available:function(){return e.FileReader!==r&&d()},text:function(t){return t.i18n("buttons.pdf","PDF")},action:function(e,o,l,n){this.processing(!0);var r=this,a=o.buttons.exportData(n.exportOptions),p=[];n.header&&p.push(t.map(a.header,function(t){return{text:"string"==typeof t?t:t+"",style:"tableHeader"}}));for(var i=0,f=a.body.length;f>i;i++)p.push(t.map(a.body[i],function(t){return{text:"string"==typeof t?t:t+"",style:i%2?"tableBodyEven":"tableBodyOdd"}}));n.footer&&a.footer&&p.push(t.map(a.footer,function(t){return{text:"string"==typeof t?t:t+"",style:"tableFooter"}}));var s={pageSize:n.pageSize,pageOrientation:n.orientation,content:[{table:{headerRows:1,body:p},layout:"noBorders"}],styles:{tableHeader:{bold:!0,fontSize:11,color:"white",fillColor:"#2d4154",alignment:"center"},tableBodyEven:{},tableBodyOdd:{fillColor:"#f3f3f3"},tableFooter:{bold:!0,fontSize:11,color:"white",fillColor:"#2d4154"},title:{alignment:"center",fontSize:15},message:{}},defaultStyle:{fontSize:10}};n.message&&s.content.unshift({text:"function"==typeof n.message?n.message(o,l,n):n.message,style:"message",margin:[0,0,0,12]}),n.title&&s.content.unshift({text:I(n,!1),style:"title",margin:[0,0,0,12]}),n.customize&&n.customize(s,n);var m=d().createPdf(s);"open"!==n.download||b()?m.getBuffer(function(t){var e=new Blob([t],{type:"application/pdf"});y(e,u(n)),r.processing(!1)}):(m.open(),this.processing(!1))},title:"*",filename:"*",extension:".pdf",exportOptions:{},orientation:"portrait",pageSize:"A4",header:!0,footer:!1,message:null,customize:null,download:"download"},m.ext.buttons.json={bom:!1,className:"buttons-json buttons-jsonhtml5",available:function(){return e.FileReader!==r&&e.Blob},text:function(t){return"JSON"},action:function(e,o,l,n){this.processing(!0);for(var r=o.buttons.exportData(),a=[],d=r.header,p=0;p<r.body.length;p++){for(var i={},f=0;f<r.body[p].length;f++)i[d[f]]=r.body[p][f];a.push(i)}t.fn.dataTable.fileSave(new Blob([JSON.stringify(a,null,2)]),u(n)),this.processing(!1)},filename:"*",extension:".json"},m.Buttons});