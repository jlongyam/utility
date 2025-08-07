import color from "../../src/color.js";
import display from "../../src/display.js";

display(`single: ${color.blue('blue')}`);
display(`brighter: ${color.brightBlue('brightBlue')}`);
display(`background: ${color.bgYellow('yellow')}`);
display(`chaining: ${color.bgBlue.white(`white on blue`)}`);
display(`bold: ${color.red.bold('red bold')}`);
display(`strike ${color.strikethrough('striked')}`);
display(`inverse ${color.inverse.white('white inverse')}`);
display(`dim ${color.dim.red('opacity')}`)