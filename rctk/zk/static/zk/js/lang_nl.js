(function(){if(zk._p=zkpi('zul.lang',true))try{

msgzk = {};
msgzk.NOT_FOUND = "Niet gevonden: ";
msgzk.UNSUPPORTED = "Nog niet ondersteund: ";
msgzk.FAILED_TO_SEND = "Verzoek kan niet aan de server gestuurd worden.";
msgzk.FAILED_TO_RESPONSE = "Server kan verzoek niet verwerken.";
msgzk.TRY_AGAIN = "Try again?";
msgzk.UNSUPPORTED_BROWSER = "Niet ondersteunde Browser: ";
msgzk.ILLEGAL_RESPONSE = "Unbekend Antwoord van de Server, Aktualiseer aub de pagina en probeer opnieuw.\n";
msgzk.FAILED_TO_PROCESS = "Verwerking is fout gegaan ";
msgzk.GOTO_ERROR_FIELD = "Ga naar foutief veld";
msgzk.PLEASE_WAIT = "Verwerken...";

msgzk.FILE_SIZE = "Bestandsgrootte: ";
msgzk.KBYTES = "Kb";

msgzk.FAILED_TO_LOAD="Het laden is mislukt ";
msgzk.FAILED_TO_LOAD_DETAIL="Het kan veroorzaakt zijn door foutief verkeer. U kunt de pagina opnieuw landen en opnieuw proberen.";
msgzk.CAUSE="Oorzaak: ";

msgzk.LOADING = "Verwerken";

zk.GROUPING=".";
zk.DECIMAL=",";
zk.PERCENT="%";
zk.MINUS="-";
zk.PER_MILL="‰";
zk.DOW_1ST=1;
zk.ERA="n. Chr.";
zk.YDELTA=0;
zk.SDOW=['ma','di','wo','do','vr','za','zo'];
zk.S2DOW=zk.SDOW;
zk.FDOW=['maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag','zondag'];
zk.SMON=['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'];
zk.S2MON=zk.SMON;
zk.FMON=['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
zk.APM=['AM','PM'];

msgzul = {};
msgzul.UNKNOWN_TYPE = "Onbekende component: ";
msgzul.DATE_REQUIRED = "U moet een datum ingeven. Formaat: ";
msgzul.OUT_OF_RANGE = "Niet in het geldige bereik";
msgzul.NO_AUDIO_SUPPORT = "Uw browser ondersteunt geen geluidsweergave";

zk.$default(msgzul, {
VALUE_NOT_MATCHED:'U moet een waarde kiezen uit de lijst.',
EMPTY_NOT_ALLOWED:'Geen invoer is niet toegestaan.\nAleen spaties zijn ook niet toegestaan',
INTEGER_REQUIRED:'U moet in plaats van {0} een geheel getal invoeren.',
NUMBER_REQUIRED:'U moet in plaats van {0} een getal invoeren.',
DATE_REQUIRED:'{U moet in plaats van {0} een datum invoeren. Formaat: {1}.}',
CANCEL:'Annuleer',
NO_POSITIVE_NEGATIVE_ZERO:'Alleen positieve getallen zijn toegestaan.',
NO_POSITIVE_NEGATIVE:'Alleen nul is toegestaan.',
NO_POSITIVE_ZERO:'Alleen getallen kleiner dan nul zijn toegestaan.',
NO_POSITIVE:'Alleen getallen kleiner of gelijk aan nul zijn toegestaan.',
NO_NEGATIVE_ZERO:'Alleen getallen groter dan nul zijn toegestaan.',
NO_NEGATIVE:'Alleen getallen groter of gelijk aan nul zijn toegestaan.',
NO_ZERO:'Alleen getallen behalve nul zijn toegestaan.',
NO_FUTURE_PAST_TODAY:'Alleen een lege waarde is toegestaan.',
NO_FUTURE_PAST:'Alleen de datum van vandaag is toegestaan.',
NO_FUTURE_TODAY:'Alleen een datum in het verleden is toegestaan.',
NO_FUTURE:'Alleen een datum van vandaag of daarvoor is toegestaan.',
NO_PAST_TODAY:'Alleen een datum in de toekomst is toegestaan.',
NO_PAST:'Alleen een datum uit het verleden is toegestaan.',
NO_TODAY:'De datum van vandaag is niet toegestaan.',
FIRST:'Eerste',
LAST:'Laatste',
PREV:'Vorige',
NEXT:'Volgende',
GRID_GROUP:'Groep',
GRID_OTHER:'Anders',
GRID_ASC:'Sorteer Stijgend',
GRID_DESC:'Sorteer Dalend',
GRID_COLUMNS:'Kolommen',
OK:'OK',
CANCEL:'Annuleer',
YES:'Ja',
NO:'Nee',
RETRY:'Herhalen',
ABORT:'Afbreken',
IGNORE:'Negeren',
RELOAD:'Reload',
UPLOAD_CANCEL:'Afbreken',
ILLEGAL_VALUE:'Ongeldige waarde'});
}finally{zk.setLoaded(zk._p.n);}})();