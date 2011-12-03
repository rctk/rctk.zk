(function(){if(zk._p=zkpi('zul.lang',true))try{

msgzk = {};
msgzk.NOT_FOUND = "No s'ha trobat: ";
msgzk.UNSUPPORTED = "Encara no és compatible: ";
msgzk.FAILED_TO_SEND = "Ha fallat l'enviament de la petició al servidor.";
msgzk.FAILED_TO_RESPONSE = "El servidor ha fallat en processar la petició.";
msgzk.TRY_AGAIN = "Voleu provar una altra vegada?";
msgzk.UNSUPPORTED_BROWSER = "El navegador no és compatible: ";
msgzk.ILLEGAL_RESPONSE = "Resposta desconeguda enviada des del servidor. Si us plau, recarregueu i proveu una altra vegada.\n";
msgzk.FAILED_TO_PROCESS = "Ha fallat el procés ";
msgzk.GOTO_ERROR_FIELD = "Aneu al camp erroni";
msgzk.PLEASE_WAIT = "S'està processant...";

msgzk.FILE_SIZE = "Mida de l'arxiu: ";
msgzk.KBYTES = "KB";

msgzk.FAILED_TO_LOAD = "Ha fallat la càrrega ";
msgzk.FAILED_TO_LOAD_DETAIL = "Pot haver estat provocat pel mal trànsit de les comunicacions. Podríeu recarregar aquesta pàgina i provar una altra vegada.";
msgzk.CAUSE = "Motiu: ";

msgzk.LOADING = "S'està processant";

zk.GROUPING=".";
zk.DECIMAL=",";
zk.PERCENT="%";
zk.MINUS="-";
zk.PER_MILL="‰";
zk.DOW_1ST=1;
zk.ERA="AD";
zk.YDELTA=0;
zk.SDOW=['dl.','dt.','dc.','dj.','dv.','ds.','dg.'];
zk.S2DOW=['dl','dt','dc','dj','dv','ds','dg'];
zk.FDOW=['dilluns','dimarts','dimecres','dijous','divendres','dissabte','diumenge'];
zk.SMON=['gen.','feb.','març','abr.','maig','juny','jul.','ag.','set.','oct.','nov.','des.'];
zk.S2MON=['gen','feb','març','abr','maig','juny','jul','ag','set','oct','nov','des'];
zk.FMON=['gener','febrer','març','abril','maig','juny','juliol','agost','setembre','octubre','novembre','desembre'];
zk.APM=['AM','PM'];

msgzul = {};
msgzul.UNKNOWN_TYPE = "El tipus de component és desconegut: ";
msgzul.DATE_REQUIRED = "Heu d'especificar una data. Format: ";
msgzul.OUT_OF_RANGE = "Fora dels valors a l'abast";
msgzul.NO_AUDIO_SUPPORT = "El navegador no admet l'àudio dinàmic";

zk.$default(msgzul, {
VALUE_NOT_MATCHED:'Heu d\'especificar un dels valors de la llista desplegable.',
EMPTY_NOT_ALLOWED:'Cal emplenar el camp.\nNo es pot deixar buit ni a blancs.',
INTEGER_REQUIRED:'S\'ha d\'especificar un nombre enter, en lloc de {0}.',
NUMBER_REQUIRED:'S\'ha d\'especificar un nombre, en lloc de {0}.',
DATE_REQUIRED:'S\'ha d\'especificar una data, en lloc de {0}.\nFormat: {1}.',
CANCEL:'Cancel·la',
NO_POSITIVE_NEGATIVE_ZERO:'Només són permesos nombres majors que zero',
NO_POSITIVE_NEGATIVE:'Només es permet el valor zero',
NO_POSITIVE_ZERO:'Només es permeten nombres negatius',
NO_POSITIVE:'Només es permeten nombres negatius o zero',
NO_NEGATIVE_ZERO:'Només es permeten nombres positius',
NO_NEGATIVE:'Només es permeten nombres positius o zero',
NO_ZERO:'No es permet zero',
NO_FUTURE_PAST_TODAY:'Només es permet buit',
NO_FUTURE_PAST:'Només es permet la data d\'avui',
NO_FUTURE_TODAY:'Només es permet una data anterior a la d\'avui',
NO_FUTURE:'No es permet una data posterior a la d\'avui',
NO_PAST_TODAY:'Només es permet una data posterior a la d\'avui',
NO_PAST:'No es permet una data anterior a la d\'avui',
NO_TODAY:'No es permet la data d\'avui',
FIRST:'Primera',
LAST:'Darrera',
PREV:'Precedent',
NEXT:'Següent',
GRID_GROUP:'Agrupa',
GRID_OTHER:'Altre',
GRID_ASC:'Ordena en sentit ascendent',
GRID_DESC:'Ordena en sentit descendent',
GRID_COLUMNS:'Columnes',
OK:'D\'acord',
CANCEL:'Cancel·la',
YES:'Sí',
NO:'No',
RETRY:'Reintenta',
ABORT:'Avorta',
IGNORE:'Ignora',
RELOAD:'Recarrega',
UPLOAD_CANCEL:'Cancel·la',
ILLEGAL_VALUE:'Valor invàlid'});
}finally{zk.setLoaded(zk._p.n);}})();