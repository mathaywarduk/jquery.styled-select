jquery.styled-select
====================

jQuery based snippet which turns HTML ```<select>``` elements into an ```<a>``` and a ```<ul>``` for easy styling.

## Usage

Include jQuery and Styled Select in HTML

```
    <script type="text/javascript" src="lib/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="jquery.styled-select.min.js"></script>
```

Add data-attributes to ```<select>``` elements where necessary

| Attribute |          |                  |
|----------------------|----------|---------------------------------------|
| data-ssel | required | Marks select to be replaced   |
| data-ssel-class | optional | Sets class prefix for style. Default is ```styled-select__``` |
| data-ssel-toggletext | optional | Sets value for toggle  |

See /demo directory for an example.

## Dependencies

* jQuery version 1.9.0 or above 