(function(){if(zk._p=zkpi('zul.lang',true))try{

msgzk={};
msgzk.NOT_FOUND="Не найден: ";
msgzk.UNSUPPORTED="Не поддерживается: ";
msgzk.FAILED_TO_SEND="Не удалось послать запрос на сервер.";
msgzk.FAILED_TO_RESPONSE="Сервер временно недоступен.";
msgzk.TRY_AGAIN = "Попробуйте снова?";
msgzk.UNSUPPORTED_BROWSER="Неподдерживаемый браузер: ";
msgzk.ILLEGAL_RESPONSE="Неизвестный ответ получен от сервера. Пожалуйста перезагрузите страницу и попробуйте вновь.\n";
msgzk.FAILED_TO_PROCESS="Не удалось обработать ";
msgzk.GOTO_ERROR_FIELD="Перемещение к неверному полю";
msgzk.PLEASE_WAIT="Обработка запроса...";

msgzk.FILE_SIZE="Размер файла: ";
msgzk.KBYTES="KB";

msgzk.FAILED_TO_LOAD="Не удалось загрузить ";
msgzk.FAILED_TO_LOAD_DETAIL="Возможно, проблема с подключением к сети. Перезагрузите страницу и попробуйте снова.";
msgzk.CAUSE="Причина: ";

msgzk.LOADING = "Обработка запроса";

zk.GROUPING=" ";
zk.DECIMAL=",";
zk.PERCENT="%";
zk.MINUS="-";
zk.PER_MILL="‰";
zk.DOW_1ST=1;
zk.ERA="н.э.";
zk.YDELTA=0;
zk.SDOW=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
zk.S2DOW=zk.SDOW;
zk.FDOW=['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье'];
zk.SMON=['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];
zk.S2MON=zk.SMON;
zk.FMON=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
zk.APM=['AM','PM'];

msgzul={};
msgzul.UNKNOWN_TYPE="Неизвестный тип компонента: ";
msgzul.DATE_REQUIRED="Необходимо указать дату. Формат: ";
msgzul.OUT_OF_RANGE = "Не вписывается в диапазон";
msgzul.NO_AUDIO_SUPPORT="Ваш браузер не поддерживает динамическое аудио"

zk.$default(msgzul, {
VALUE_NOT_MATCHED:'Вы должны выбрать одно из значений в выпадающем списке.',
EMPTY_NOT_ALLOWED:'Пустой ввод не разрешен',
INTEGER_REQUIRED:'Вы должны ввести целое число, а не {0}.',
NUMBER_REQUIRED:'Вы должны ввести число, а не {0}.',
DATE_REQUIRED:'Вы должны ввести дату, а не {0}.\nФормат: {1}.',
CANCEL:'Отмена',
NO_POSITIVE_NEGATIVE_ZERO:'Разрешены только положительные числа',
NO_POSITIVE_NEGATIVE:'Разрешен только ноль',
NO_POSITIVE_ZERO:'Разрешены только отрицательные числа',
NO_POSITIVE:'Разрешены только не положительные числа',
NO_NEGATIVE_ZERO:'Разрешены только положительные числа',
NO_NEGATIVE:'Разрешены только не отрицательные числа',
NO_ZERO:'Разрешены только ненулевые числа',
NO_FUTURE_PAST_TODAY:'Разрешено только пустое значение',
NO_FUTURE_PAST:'Разрешена только сегодняшняя дата',
NO_FUTURE_TODAY:'Разрешена только дата, лежащая в прошлом',
NO_FUTURE:'Разрешена только дата, лежащая не в будущем',
NO_PAST_TODAY:'Разрешена только дата, лежащая в будущем',
NO_PAST:'Разрешена только дата, лежащая не в прошлом',
NO_TODAY:'Сегодняшняя дата не разрешена',
FIRST:'Первый',
LAST:'Последний',
PREV:'Предыдущий',
NEXT:'Следующий',
GRID_GROUP:'Group',
GRID_OTHER:'Other',
GRID_ASC:'Sort Ascending',
GRID_DESC:'Sort Descending',
GRID_COLUMNS:'Columns',
OK:'ОК',
CANCEL:'Отмена',
YES:'Да',
NO:'Нет',
RETRY:'Повторить',
ABORT:'Прервать',
IGNORE:'Игнорировать',
RELOAD:'Reload',
UPLOAD_CANCEL:'Отмена',
ILLEGAL_VALUE:'Неверное значение'});
}finally{zk.setLoaded(zk._p.n);}})();