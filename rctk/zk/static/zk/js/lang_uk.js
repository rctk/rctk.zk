(function(){if(zk._p=zkpi('zul.lang',true))try{

msgzk={};
msgzk.NOT_FOUND="Не знайдений: ";
msgzk.UNSUPPORTED="Не підтримується: ";
msgzk.FAILED_TO_SEND="Не вдалося відіслати запит на сервер.";
msgzk.FAILED_TO_RESPONSE="Сервер тимчасово недоступний.";
msgzk.TRY_AGAIN="Try again?";
msgzk.UNSUPPORTED_BROWSER="Браузер не підтримується: ";
msgzk.ILLEGAL_RESPONSE="Невідома відповідь з серверу. Будьласка, перевантажте сторінку і спробуйте знову.\n";
msgzk.FAILED_TO_PROCESS="Не вдалося обробити ";
msgzk.GOTO_ERROR_FIELD="Перехід до невірного поля";
msgzk.PLEASE_WAIT="Обробка запиту...";
msgzk.FILE_SIZE="Розмір файлу: ";
msgzk.KBYTES="KB";
msgzk.FAILED_TO_LOAD="Не вдалося завантажити ";
msgzk.FAILED_TO_LOAD_DETAIL="Може бути спричинено проблемами з підключенням до мережі. Перевантажте сторінку і спробуйте знову.";
msgzk.CAUSE="Причина: ";
msgzk.LOADING = "Обробка запиту";

zk.GROUPING=".";
zk.DECIMAL=",";
zk.PERCENT="%";
zk.MINUS="-";
zk.PER_MILL="‰";
zk.DOW_1ST=1;
zk.ERA="після н.е.";
zk.YDELTA=0;
zk.SDOW=['пн','вт','ср','чт','пт','сб','нд'];
zk.S2DOW=zk.SDOW;
zk.FDOW=['понеділок','вівторок','середа','четвер','п\'ятниця','субота','неділя'];
zk.SMON=['січ','лют','бер','квіт','трав','черв','лип','серп','вер','жовт','лист','груд'];
zk.S2MON=zk.SMON;
zk.FMON=['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'];
zk.APM=['AM','PM'];

msgzul={};
msgzul.UNKNOWN_TYPE="Невідомий тип компоненту: ";
msgzul.DATE_REQUIRED="Необхідно вказати дату. Формат: ";
msgzul.OUT_OF_RANGE = "Значення поза діапазоном";
msgzul.NO_AUDIO_SUPPORT="Браузер не підтримує динамічне аудіо"

zk.$default(msgzul, {
VALUE_NOT_MATCHED:'Ви маєте вказати одне зі значень в випадаючому списку.',
EMPTY_NOT_ALLOWED:'Пусте значення не дозволено',
INTEGER_REQUIRED:'Ви маєте ввести ціле число замість {0}.',
NUMBER_REQUIRED:'Ви маєте ввести число замість {0}.',
DATE_REQUIRED:'Ви маєте дату число замість {0}.\nФормат: {1}.',
CANCEL:'Відміна',
NO_POSITIVE_NEGATIVE_ZERO:'Дозволені тільки додатні значення',
NO_POSITIVE_NEGATIVE:'Дозволений тільки нуль',
NO_POSITIVE_ZERO:'Дозволені тільки від\'\'ємні значення',
NO_POSITIVE:'Дозволені тільки не додатні значення',
NO_NEGATIVE_ZERO:'Дозволені тільки додатні значення',
NO_NEGATIVE:'Дозволені тільки не від\'\'ємні значення',
NO_ZERO:'Дозволені тільки ненульові значення',
NO_FUTURE_PAST_TODAY:'Дозволене тільки пусте значення',
NO_FUTURE_PAST:'Дозволена тільки сьогоднішня дата',
NO_FUTURE_TODAY:'Дозволена тільки дата, що лежить в минулому',
NO_FUTURE:'Дозволена тільки дата, що не лежить в майбутньому',
NO_PAST_TODAY:'Дозволена тільки дата, що лежить в майбутньому',
NO_PAST:'Дозволена тільки дата, що не лежить в минулому',
NO_TODAY:'Дозволене тільки не сьогоднішня дата',
FIRST:'Перший',
LAST:'Останній',
PREV:'Попередній',
NEXT:'Наступний',
GRID_GROUP:'Group',
GRID_OTHER:'Other',
GRID_ASC:'Sort Ascending',
GRID_DESC:'Sort Descending',
GRID_COLUMNS:'Columns',
OK:'Продовжити',
CANCEL:'Відміна',
YES:'Так',
NO:'Ні',
RETRY:'Спробувати знову',
ABORT:'Перервати',
IGNORE:'Ігнорувати',
RELOAD:'Reload',
UPLOAD_CANCEL:'Відміна',
ILLEGAL_VALUE:'Недозволене значення'});
}finally{zk.setLoaded(zk._p.n);}})();