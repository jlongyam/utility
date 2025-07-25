# Media-query

## Screen

### 2 response: mobile and desktop

```css
/* mobile */
@media screen and (min-width: 768px) {
/* desktop */
}

OR

/* desktop */
@media screen and (max-width: 768px) {
/* mobile */
}
```

### 3 resposive: compact, medium and wide

```css
@media screen and (max-width: 425px) {
/* compact */
}
@media screen and (min-width: 426px) and (max-width: 768px) {
/* medium */
}
@media screen and (min-width: 769px) {
/* wide */
}
```

### 7 response

```css
/* xx-small */
@media screen and (max-width: 320px) {}
/* x-small */
@media screen and (min-width: 321px) and (max-width: 375px) {}
/* small */
@media screen and (min-width: 376px) and (max-width: 425px) {}
/* medium */
@media screen and (min-width: 426px) and (max-width: 768px) {}
/* large */
@media screen and (min-width: 769px) and (max-width: 1024px) {}
/* x-large */
@media screen and (min-width: 1025px) and (max-width: 1440px) {}
/* xx-large */
@media screen and (min-width: 1441px) {}
```

## Orientation

```css
@media screen and (orientation: portrait) {}
@media screen and (orientation: landscape) {}

/* example mixing */
@media screen and (orientation: portrait), screen and (max-width: 320px) {}
```

## Print

```css
@media print {}
```