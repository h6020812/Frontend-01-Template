function getStyle(element) {
  if (!element.style) {
    element.style = {};
  }
  element
  for (const prop in element.computedStyle) {
      console.log(prop)
      // const p = element.computedStyle.value;
      // element.style[prop]/*?*/ = p;

      if (/px$/.test(element.computedStyle[prop].value.toString())) {
        element.style[prop] = parseInt(element.computedStyle[prop].value)
      } else if (/^[0-9\.]+$/.test(element.computedStyle[prop].value.toString())) {
        element.style[prop] = parseInt(element.computedStyle[prop].value)
      } else {
        element.style[prop] = element.computedStyle[prop].value;
      }
  }
  return element.style;
}

function layout(element) {
  if (!element.computedStyle) return;

  let elementStyle = getStyle(element);

  if (elementStyle.display !== 'flex') {
    return;    
  }

  let items = element.children.filter(e => e.type === 'element');

  // items.sort((a, b) => (a.order || 0) - (b.order || 0));

  let style = elementStyle;

  ['width', 'height'].forEach(size => {
    if (style[size] === 'auto' || style[size] === '') {
      style[size] = null;
    }
  })
  // 默認值
  if (!style.flexDirection || style.flexDirection === 'auto') {
    style.flexDirection = 'row';    
  }
  if (!style.alignItems || style.alignItems === 'auto') {
    style.alignItems = 'stretch';    
  }
  if (!style.justifyContent || style.justifyContent === 'auto') {
    style.justifyContent = 'flex-start';    
  }
  if (!style.flexWrap || style.flexWrap === 'auto') {
    style.flexWrap = 'nowrap';    
  }
  if (!style.alignContent || style.alignContent === 'auto') {
    style.alignContent = 'stretch';    
  }
  // 設定方向
  let mainSize, mainStart, mainEnd, mainSign, mainBase,
      crossSize, crossStart, crossEnd, crossSign, crossBase;
  if (style.flexDirection === 'row') {
    mainSize = 'width';
    mainStart = 'left';
    mainEnd = 'right';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if (style.flexDirection === 'row-reverse') {
    mainSize = 'width';
    mainStart = 'right';
    mainEnd = 'left';
    mainSign = -1;
    mainBase = style.width;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if (style.flexDirection === 'column') {
    mainSize = 'height';
    mainStart = 'top';
    mainEnd = 'bottom';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }
  if (style.flexDirection === 'column-reverse') {
    mainSize = 'height';
    mainStart = 'bottom';
    mainEnd = 'top';
    mainSign = -1;
    mainBase = style.height;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }
  if (style.flexDirection === 'wrap-reverse') {
    let tmp = crossStart;
    crossStart = crossEnd;
    crossEnd = tmp;
    crossSign = -1;
  } else{
    crossBase = 0;
    crossSign = 1;
  }

  // 特例
  let isAutoMainSize = false;
  if (!style[mainSize]) { // auto sizing
    elementStyle[mainSize] = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
        elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
      }
    }
    isAutoMainSize = true;
    // style.flexWrap = 'nowrap'
  }
  // 行
  let flexLine = [];
  let flexLines = [flexLine];
  // 行內空白
  let mainSpace = elementStyle[mainSize];
  let crossSpace = 0;
  crossSpace
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    let itemStyle = getStyle(item);

    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0;
    }

    if (itemStyle.flex) {
      flexLine.push(item);
    } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
      mainSpace -= itemStyle[mainSize];
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      flexLine.push(item);
    } else {
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize];
      }
      if (mainSpace < itemStyle[mainSize]) {
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace;
        flexLine = [item];
        flexLines.push(flexLine);
        mainSpace = style[mainSize];
        crossSpace = 0;
      } else {
        flexLine.push(item);
      }
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      mainSpace -= itemStyle[mainSize];
      mainSpace
    }
  }
  flexLine.mainSpace = mainSpace;

  console.log(items);

  if (style.flexWrap === 'nowrap' || isAutoMainSize) {
    flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace;
  } else {
    flexLine.crossSpace = crossSpace;
  }

  if (mainSpace < 0) {
    // overflow
    let scale = style[mainSize] / (style[mainSize] - mainSpace);

    let currentMain = mainBase;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let itemStyle = getStyle(item);

      if (itemStyle.flex) {
        itemStyle[mainSize] = 0;
      }

      itemStyle[mainSize] = itemStyle[mainSize] * scale;

      itemStyle[mainStart] = currentMain;
      itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
      currentMain = itemStyle[mainEnd];
    }
  } else {
    // process each flex line
    flexLines.forEach((items) => {
      items
      let mainSpace = items.mainSpace;
      let flexTotal = 0;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let itemStyle = getStyle(item);

        if ((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
          flexTotal += itemStyle.flex;
          continue;
        }
      }
        if (flexTotal > 0) {
          // There is flexible flex items
          let currentMain = mainBase;
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let itemStyle = getStyle(item);
    
            if (itemStyle.flex) {
              itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
            }
    
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
          }
        } else {
          // there is NO flexible flex items, which means,justifyContent should work
          let currentMain = mainBase;
          let step = 0;
          if (style.justifyContent === 'flex-start') {
            currentMain = mainBase;
            step = 0;
          }
          if (style.justifyContent === 'flex-end') {
            currentMain = mainSpace * mainSign + mainBase;
            step = 0;
          }
          if (style.justifyContent === 'center') {
            currentMain = mainSpace / 2 * mainSign + mainBase;
            step = 0;
          }
          if (style.justifyContent === 'space-between') {
            step = mainSpace / (items.length - 1) * mainSign;
            currentMain = mainBase;
          }
          if (style.justifyContent === 'space-around') {
            step = mainSpace / items.length * mainSign;
            currentMain = step / 2 + mainBase;
          }
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemStyle = getStyle(item);//?
            itemStyle[mainSize]//?
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
            currentMain = itemStyle[mainEnd] + step;
          }
        }
      
    })
  }
  items

    // compute the cross axis sizes
    // align-items, slign-self
  // let crossSpace;

  if (!style[crossSize]) { // auto Sizing
    crossSpace = 0;
    elementStyle[crossSize] = 0;
    for (let i = 0; i < flexLines.length; i++) {
      elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
    }
  } else {
    crossSpace = style[crossSize]
    for (let i = 0; i < flexLines.length; i++) {
      crossSpace -= flexLines[i].crossSpace;
    }
  }


  if (style.flexWrap === 'wrap-reverse') {
    crossBase = style[crossSize];
  } else {
    crossBase = 0;
  }
  let lineSize = style[crossSize] / flexLines.length;

  let step;
  if (style.alignContent === 'flex-start') {
    crossBase += 0;
    step = 0;
  }
  if (style.alignContent === 'flex-end') {
    crossBase += crossSpace * crossSign;
    step = 0;
  }
  if (style.alignContent === 'center') {
    crossBase += crossSpace / 2 * crossSign;
    step = 0;
  }
  if (style.alignContent === 'space-between') {
    step = crossSpace / (flexLines.length - 1);
    crossBase += 0;
  }
  if (style.alignContent === 'space-around') {
    step = crossSpace / flexLines.length;
    crossBase += crossSign * step / 2;
  }
  if (style.alignContent === 'stretch') {
    step = 0;
    crossBase += 0;
  }
  flexLines
  flexLines.forEach((items) => {
  let lineCrossSize = style.alignContent === 'stretch' ?
    items.crossSpace + crossSpace / flexLines.length :
    items.crossSpace;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let itemStyle = getStyle(item);

      let align = itemStyle.alignSelf || style.alignItems;

      if (itemStyle[crossSize] === null) {
        itemStyle[crossSize] = (align === 'stretch') ? 
          lineCrossSize : 0
      }
      if (align === 'flex-start') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if (align === 'flex-end') {
        itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
        itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
      }
      if (align === 'center') {
        itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
        itemStyle[crossEnd] = itemStyle[crossStart] - crossSign * itemStyle[crossSize];
      }
      if (align === 'stretch') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0) ? itemStyle[crossSize] : lineCrossSize);

        itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
      }
    }
    crossBase += crossSign * (lineCrossSize + step);
  });
  }
//--------------test----------------
// const test = {
//   attributes: [ { name: 'id', value: 'container' } ],
//   children: [
//     { content: '\n        ', type: 'text' },
//     {
//       attributes: [
//         { name: 'id', value: 'myid' },
//         { name: 'isSelfClosing', value: true }
//       ],
//       children: [],
//       computedStyle: { width: { specificity: [ 0, 2, 0, 0 ], value: '200px' } },
//       tagName: 'div',
//       type: 'element'
//     },
//     { content: '\n        ', type: 'text' },
//     {
//       attributes: [
//         { name: 'class', value: 'c1' },
//         { name: 'isSelfClosing', value: true }
//       ],
//       children: [],
//       computedStyle: { flex: { specificity: [ 0, 1, 1, 0 ], value: '1' } },
//       tagName: 'div',
//       type: 'element'
//     },
//     { content: '\n    ', type: 'text' }
//   ],
//   computedStyle: {
//     display: { specificity: [ 0, 1, 0, 0 ], value: 'flex' },
//     height: { specificity: [ 0, 1, 0, 0 ], value: '300px' },
//     width: { specificity: [ 0, 1, 0, 0 ], value: '500px' }
//   },
//   tagName: 'div',
//   type: 'element'
// }

// layout(test);

module.exports = layout;