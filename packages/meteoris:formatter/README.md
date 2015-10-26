- this Meteoris.Formatter extension used for formatting anything like date, datetime, currency etc
- this require lepozepo:accounting and momentjs:moment to works
- how to use in your html view:
```
{{meteoris_formatter 'the function name' firstParam secondParam}}
```
- available function name:
```
    - date (date, format)
    - dateTime (date, format)
    - elapsedTime (date)
    - currency (value)
    - combodate (date)
    - combodateEmpty (date)
```