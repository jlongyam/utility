const icons = {
  arrows: {
    left: '←',
    up: '↑',
    right: '→',
    down: '↓',
    leftRight: '↔',
    upDown: '↕',
    upDownUnderlined: '↨',
    leftwardsArrow: '↚',
    rightwardsArrow: '↛',
    leftwardsArrowStroke: '↜',
    rightwardsArrowStroke: '↝',
    leftwardsWaveArrow: '↞',
    rightwardsWaveArrow: '↟',
    leftwardsTwoHeadedArrow: '↠',
    upwardsTwoHeadedArrow: '↡'
  },
  shapes: {
    square: '□',
    squareFilled: '■',
    squareCenter: '▣',
    squareRounded: '▢',
    diamond: '◇',
    diamondFilled: '◆',
    diamondSolid: '◈',
    circle: '○',
    circleFilled: '●',
    circleDouble: '◎',
    circleHalfTop: '◐',
    circleHalfRight: '◑',
    circleHalfBottom: '◒',
    circleHalfLeft: '◓',
    triangleUp: '△',
    triangleUpFilled: '▲',
    triangleRight: '▷',
    triangleRightFilled: '▶',
    triangleDown: '▽',
    triangleDownFilled: '▼',
    triangleLeft: '◁',
    triangleLeftFilled: '◀'
  },
  symbols: {
    check: '✓',
    checkBold: '✔',
    x: '✗',
    xBold: '✘',
    star: '☆',
    starFilled: '★',
    heart: '♡',
    heartFilled: '♥',
    spade: '♤',
    spadeFilled: '♠',
    club: '♧',
    clubFilled: '♣',
    diamondSymbol: '♢',
    diamondSymbolFilled: '♦',
    sun: '☀',
    cloud: '☁',
    umbrella: '☂',
    snowman: '☃',
    comet: '☄',
    phone: '☎',
    pointRight: '☛',
    pointLeft: '☚',
    pointUp: '☝',
    pointDown: '☟'
  },
  math: {
    plus: '+',
    minus: '−',
    multiply: '×',
    divide: '÷',
    equals: '=',
    notEquals: '≠',
    lessThan: '<',
    greaterThan: '>',
    lessOrEqual: '≤',
    greaterOrEqual: '≥',
    plusMinus: '±',
    infinity: '∞',
    therefore: '∴',
    because: '∵',
    proportional: '∝',
    angle: '∠',
    measuredAngle: '∡',
    parallel: '∥',
    notParallel: '∦',
    perpendicular: '⊥'
  },
  currency: {
    dollar: '$',
    cent: '¢',
    pound: '£',
    yen: '¥',
    euro: '€',
    rupee: '₹',
    won: '₩',
    naira: '₦',
    bitcoin: '₿'
  },
  weather = {
    sun: '☀',
    cloud: '☁',
    umbrella: '☂',
    snowman: '☃',
    comet: '☄',
    umbrellaRain: '☔',
    coffee: '☕',
    shamrock: '☘',
    peace: '☮',
    yinYang: '☯',
    farsi: '☸',
    gear: '⚙',
    warning: '⚠',
    highVoltage: '⚡',
    biohazard: '☣',
    radioactive: '☢'
  }
}

function icon(name) {
  for (const category of Object.values(icons)) {
    if (category[name]) {
      return category[name]; //Raw Unicode symbol
    }
  }
  return icons.symbols.check; //Fallback
}

export default icon;