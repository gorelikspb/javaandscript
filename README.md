# javaandscript

Задание: Найти ошибки, провести рефакторинг в разрезе
повышения поддерживаемости и тестируемости.
--------------
Код, который предлагалось исправить, представлял из себя функцию расчета стоимости театральных постановок с разными параметрами и скидками. В код вложен json с примером данных из запроса.

Начальный код: 
https://github.com/gorelikspb/javaandscript/commit/68cda1f26c3a38ab047bc56f2424257e712194e2

Код после рефакторинга: https://github.com/gorelikspb/javaandscript/blob/master/main.js

Результат функции выводится в html, который можно увидеть здесь:
https://gorelikspb.github.io/javaandscript/

В commits change я перечислил шаги рефакторинга
https://github.com/gorelikspb/javaandscript/commits/master,
вкратце, помимо исправления синтаксических и смысловых ошибок в коде я:
- выделил из тела одной большой функции еще две
- избавился от  mutable-перменной
- разбил несколько вычислений происходящих в одном цикле на отдельные циклы - чтобы в дальнейшем выделить их в отдельные фукнции.