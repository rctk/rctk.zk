(function(){if(zk._p=zkpi('zul.lang',true))try{

msgzk = {};
msgzk.NOT_FOUND = "Nem található: ";
msgzk.UNSUPPORTED = "Még nem támogatott: ";
msgzk.FAILED_TO_SEND = "A szerver kérelem nem sikerült.";
msgzk.FAILED_TO_RESPONSE = "A webkiszolgáló ideiglenesen nem szolgál.";
msgzk.TRY_AGAIN = "Try again?";
msgzk.UNSUPPORTED_BROWSER = "Nem támogatott böngésző: ";
msgzk.ILLEGAL_RESPONSE = "Ismeretlen szerver válasz. Legyen szíves az oldalt újra letölteni.\n";
msgzk.FAILED_TO_PROCESS = "Nem sikerült feldolgozni ";
msgzk.GOTO_ERROR_FIELD = "Menyen a hibás bejegyzéshez";
msgzk.PLEASE_WAIT = "Feldolgozás...";

msgzk.FILE_SIZE = "Fajl mérete: ";
msgzk.KBYTES = "KB";

msgzk.FAILED_TO_LOAD="Betöltés nem sikerült ";
msgzk.FAILED_TO_LOAD_DETAIL="Rosz kapcsolat okozhatta. Próbáljan újra letölteni az oldalt.";
msgzk.CAUSE="Hibát okozta: ";

msgzk.LOADING = "Feldolgozás";

zk.GROUPING=" ";
zk.DECIMAL=",";
zk.PERCENT="%";
zk.MINUS="-";
zk.PER_MILL="‰";
zk.DOW_1ST=1;
zk.ERA="i.u.";
zk.YDELTA=0;
zk.SDOW=['H','K','Sze','Cs','P','Szo','V'];
zk.S2DOW=zk.SDOW;
zk.FDOW=['hétfő','kedd','szerda','csütörtök','péntek','szombat','vasárnap'];
zk.SMON=['jan.','febr.','márc.','ápr.','máj.','jún.','júl.','aug.','szept.','okt.','nov.','dec.'];
zk.S2MON=['jan','febr','márc','ápr','máj','jún','júl','aug','szept','okt','nov','dec'];
zk.FMON=['január','február','március','április','május','június','július','augusztus','szeptember','október','november','december'];
zk.APM=['DE','DU'];

msgzul = {};
msgzul.UNKNOWN_TYPE = "Ismeretlen összetevő típus: ";
msgzul.DATE_REQUIRED = "Legyen szíves beadni egy időpontot. Alak: ";
msgzul.OUT_OF_RANGE = "nem létezik";
msgzul.NO_AUDIO_SUPPORT = "A böngészője nem tud lejátszani dinamikus hangokat";

zk.$default(msgzul, {
VALUE_NOT_MATCHED:'Only values in the drop-down list are allowed',
EMPTY_NOT_ALLOWED:'Egy üres beadás nem létezik',
INTEGER_REQUIRED:'Legyen szíves beírni egy egész számot, és nem {0}.',
NUMBER_REQUIRED:'Legyen szíves beírni egy számot, és nem {0}.',
DATE_REQUIRED:'Legyen szíves beírni egy időpontot, és nem {0}.\nAlak: {1}.',
CANCEL:'Mégse',
NO_POSITIVE_NEGATIVE_ZERO:'Semilyen számot engedélyez',
NO_POSITIVE_NEGATIVE:'Csak nullát engedélyez',
NO_POSITIVE_ZERO:'Csak negatív számot engedélyez',
NO_POSITIVE:'Csak nullát vagy negatív számot engedélyez',
NO_NEGATIVE_ZERO:'Csak pozitív számot engedélyez',
NO_NEGATIVE:'Csak nullát vagy positív számot engedélyez',
NO_ZERO:'Csak egy számot nullán kivéve engedélyez',
NO_FUTURE_PAST_TODAY:'Csak egy üres beadásat engedélyez',
NO_FUTURE_PAST:'Csak a mai napot engedélyez',
NO_FUTURE_TODAY:'Cask egy elmúlt dátumot engedélyez',
NO_FUTURE:'Jövendő dátumokat nem engedélyez',
NO_PAST_TODAY:'Csak egy jövendő dátumot engedélyez',
NO_PAST:'Elmúlt dátumokat nem engedélyez',
NO_TODAY:'A mai napot nem engedélyez',
FIRST:'Első',
LAST:'Utolsó',
PREV:'Előző',
NEXT:'Következő',
GRID_GROUP:'Group',
GRID_OTHER:'Other',
GRID_ASC:'Sort Ascending',
GRID_DESC:'Sort Descending',
GRID_COLUMNS:'Columns',
OK:'Továb',
CANCEL:'Mégse',
YES:'Igen',
NO:'Nem',
RETRY:'Még egyszer',
ABORT:'Mégse',
IGNORE:'Mindegy',
RELOAD:'Reload',
UPLOAD_CANCEL:'Mégse',
ILLEGAL_VALUE:'Ismeretlen érték'});
}finally{zk.setLoaded(zk._p.n);}})();