(function(){if(zk._p=zkpi('zul.lang',true))try{

msgzk = {
NOT_FOUND: "Not found: ",
UNSUPPORTED: "Not supported yet: ",
FAILED_TO_SEND: "Failed to send requests to server.",
FAILED_TO_RESPONSE: "The server is temporarily out of service.",
TRY_AGAIN: "Would you like to try again?",
UNSUPPORTED_BROWSER: "Unsupported browser: ",
ILLEGAL_RESPONSE: "Unknown response sent from the server. Please reload and try again.\n",
FAILED_TO_PROCESS: "Failed to process ",
GOTO_ERROR_FIELD: "Go to the wrong field",
PLEASE_WAIT: "Processing...",

FILE_SIZE: "File size: ",
KBYTES: "KB",

FAILED_TO_LOAD: "Failed to load ",
FAILED_TO_LOAD_DETAIL: "It may be caused by bad traffic. You could reload this page and try again.",
CAUSE: "Cause: ",

LOADING: "Loading"
};
zk.GROUPING=",";
zk.DECIMAL=".";
zk.PERCENT="%";
zk.MINUS="-";
zk.PER_MILL="‰";
zk.DOW_1ST=0;
zk.ERA="AD";
zk.YDELTA=0;
zk.SDOW=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
zk.S2DOW=zk.SDOW;
zk.FDOW=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
zk.SMON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
zk.S2MON=zk.SMON;
zk.FMON=['January','February','March','April','May','June','July','August','September','October','November','December'];
zk.APM=['AM','PM'];

msgzul = {
UNKNOWN_TYPE: "Unknown component type: ",
DATE_REQUIRED: "You must specify a date. Format: ",
OUT_OF_RANGE: "Out of range",
NO_AUDIO_SUPPORT: "Your browser doesn't support dynamic audio"
};

zk.$default(msgzul, {
VALUE_NOT_MATCHED:'Only values in the drop-down list are allowed',
EMPTY_NOT_ALLOWED:'This field may not be empty or contain only spaces.',
INTEGER_REQUIRED:'You must specify an integer, rather than {0}.',
NUMBER_REQUIRED:'You must specify a number, rather than {0}.',
DATE_REQUIRED:'You must specify a date, rather than {0}.\nFormat: {1}.',
CANCEL:'Cancel',
NO_POSITIVE_NEGATIVE_ZERO:'Only positive number is allowed',
NO_POSITIVE_NEGATIVE:'Only zero is allowed',
NO_POSITIVE_ZERO:'Only negative number is allowed',
NO_POSITIVE:'Only negative number or zero is allowed',
NO_NEGATIVE_ZERO:'Only positive number is allowed',
NO_NEGATIVE:'Only positive number or zero is allowed',
NO_ZERO:'Zero number is not allowed',
NO_FUTURE_PAST_TODAY:'Only empty is allowed',
NO_FUTURE_PAST:'Only today is allowed',
NO_FUTURE_TODAY:'Only date in the past is allowed',
NO_FUTURE:'Only date in the past or today is allowed',
NO_PAST_TODAY:'Only date in the future is allowed',
NO_PAST:'Only date in the future or today is allowed',
NO_TODAY:'Today is not allowed',
FIRST:'First',
LAST:'Last',
PREV:'Prev',
NEXT:'Next',
GRID_GROUP:'Group',
GRID_OTHER:'Other',
GRID_ASC:'Sort Ascending',
GRID_DESC:'Sort Descending',
GRID_COLUMNS:'Columns',
OK:'OK',
CANCEL:'Cancel',
YES:'Yes',
NO:'No',
RETRY:'Retry',
ABORT:'Abort',
IGNORE:'Ignore',
RELOAD:'Reload',
UPLOAD_CANCEL:'Cancel',
ILLEGAL_VALUE:'Illegal value'});
}finally{zk.setLoaded(zk._p.n);}})();