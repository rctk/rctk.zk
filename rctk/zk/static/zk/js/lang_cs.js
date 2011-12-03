(function(){if(zk._p=zkpi('zul.lang',true))try{

msgzk = {};
msgzk.NOT_FOUND = "Nenalezeno: ";
msgzk.UNSUPPORTED = "Nepodporováno: ";
msgzk.FAILED_TO_SEND = "Chyba při komunikaci se serverem.";
msgzk.FAILED_TO_RESPONSE = "Server je dočasně nedostupný, prosím opakujte akci později.";
msgzk.TRY_AGAIN = "Zkusit znovu?";
msgzk.UNSUPPORTED_BROWSER = "Váš prohlížeč není podporován: ";
msgzk.ILLEGAL_RESPONSE = "Neznámá odpověď od serveru, opakujte prosím akci.\n";
msgzk.FAILED_TO_PROCESS = "Chyba zpracování ";
msgzk.GOTO_ERROR_FIELD = "Jdi na pole s chybou";
msgzk.PLEASE_WAIT = "Pracuji...";

msgzk.FILE_SIZE = "Velikost souboru: ";
msgzk.KBYTES = "KB";

msgzk.FAILED_TO_LOAD = "Chyba při nahrávání ";
msgzk.FAILED_TO_LOAD_DETAIL = "Chyba může být způsobena špatným připojením, zkuste obnovit stránku";
msgzk.CAUSE = "Příčina: ";

msgzk.LOADING = "Pracuji";

zk.GROUPING=" ";
zk.DECIMAL=",";
zk.PERCENT="%";
zk.MINUS="-";
zk.PER_MILL="‰";
zk.DOW_1ST=1;
zk.ERA="po Kr.";
zk.YDELTA=0;
zk.SDOW=['Po','Út','St','Čt','Pá','So','Ne'];
zk.S2DOW=zk.SDOW;
zk.FDOW=['Pondělí','Úterý','Středa','Čtvrtek','Pátek','Sobota','Neděle'];
zk.SMON=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
zk.S2MON=zk.SMON;
zk.FMON=['leden','únor','březen','duben','květen','červen','červenec','srpen','září','říjen','listopad','prosinec'];
zk.APM=['dop.','odp.'];

msgzul={};
msgzul.UNKNOWN_TYPE="Neznámý typ komponenty: ";
msgzul.DATE_REQUIRED="Je nutné zadat datum. Formát: ";
msgzul.OUT_OF_RANGE = "Hodnota je mimo daný rozsah";
msgzul.NO_AUDIO_SUPPORT="Váš prohlížeč nepodporuje streamované audio"

zk.$default(msgzul, {
VALUE_NOT_MATCHED:'Vyberte prosím jednu z nabízených hodnot',
EMPTY_NOT_ALLOWED:'Zadejte hodnotu',
INTEGER_REQUIRED:'Povoleny pouze celočíselné hodnoty, místo {0}',
NUMBER_REQUIRED:'Povoleny pouze číslené hodnoty, místo {0}',
DATE_REQUIRED:'Povoleno pouze datum ve formátu: {1}',
CANCEL:'Zrušit',
NO_POSITIVE_NEGATIVE_ZERO:'Povolena pouze kladná čísla',
NO_POSITIVE_NEGATIVE:'Povolena pouze nula',
NO_POSITIVE_ZERO:'Povolena pouze záporná čísla',
NO_POSITIVE:'Povolena pouze nekladná čísla',
NO_NEGATIVE_ZERO:'Povolena pouze kladná čísla',
NO_NEGATIVE:'Povolena pouze nezáporná čísla',
NO_ZERO:'Nula není povolena',
NO_FUTURE_PAST_TODAY:'Tento den nelze vybrat',
NO_FUTURE_PAST:'Lze vybrat pouze dnešek',
NO_FUTURE_TODAY:'Povoleno pouze datum v minulosti',
NO_FUTURE:'Povoleno pouze datum v minulosti a dnešek',
NO_PAST_TODAY:'Povolenou pouze datum v budoucnosti',
NO_PAST:'Povolenou pouze datum v budoucnosti a dnešek',
NO_TODAY:'Dnešek není povolen',
FIRST:'První',
LAST:'Poslední',
PREV:'Předchozí',
NEXT:'Následující',
GRID_GROUP:'Group',
GRID_OTHER:'Other',
GRID_ASC:'Sort Ascending',
GRID_DESC:'Sort Descending',
GRID_COLUMNS:'Columns',
OK:'OK',
CANCEL:'Zrušit',
YES:'Ano',
NO:'Ne',
RETRY:'Opakovat',
ABORT:'Přerušit',
IGNORE:'Ignorovat',
RELOAD:'Obnovit',
UPLOAD_CANCEL:'Zrušit',
ILLEGAL_VALUE:'Nesprávná hodnota'});
}finally{zk.setLoaded(zk._p.n);}})();