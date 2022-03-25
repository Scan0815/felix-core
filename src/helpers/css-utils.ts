import {IonicColor} from '../interfaces/IonicColor';

export const CssRgb = (values:string[]|number[]) => {
    return 'rgb(' + values.join(', ') + ')';
};

export const CssInjectStyle = (styleID:string, className:string, styleString: string) => {
  if (!document.getElementById('style_' + styleID)) {
    const style = document.createElement('style');
    style.id = 'style_' + styleID;
    style.className = className;
    style.innerHTML = styleString;
    document.head.appendChild(style);
  }
};

export const createIonColorClasses = (color: IonicColor | undefined | null): string => {
  return `ion-color-${color}`;
};

export const StringToColour = (str:string) => {
  let char = str.charAt(0).toLowerCase();
  let color:any = {
    a: [128, 191, 255],
    b: [179, 219, 255],
    c: [0, 73, 102],
    d: [0, 0, 0],
    e: [22, 55, 40],
    f: [14, 62, 20],
    g: [0, 102, 44],
    h: [102, 88, 0],
    i: [102, 48, 0],
    j: [128, 6, 0],
    k: [235, 122, 177],
    l: [101, 6, 79],
    m: [239, 169, 249],
    n: [221, 221, 221],
    o: [0, 0, 0],
    p: [0, 0, 0],
    q: [128, 191, 255],
    r: [179, 219, 255],
    s: [0, 73, 102],
    t: [0, 0, 0],
    u: [22, 55, 40],
    v: [14, 62, 20],
    w: [0, 102, 44],
    x: [102, 88, 0],
    y: [102, 48, 0],
    z: [128, 6, 0]
  };
  let background:any = {
    a: [0, 31, 63],
    b: [0, 116, 217],
    c: [127, 219, 255],
    d: [57, 204, 204],
    e: [61, 153, 112],
    f: [46, 204, 64],
    g: [1, 255, 112],
    h: [255, 220, 0],
    i: [255, 133, 27],
    j: [255, 65, 54],
    k: [133, 20, 75],
    l: [240, 18, 190],
    m: [177, 13, 201],
    n: [17, 17, 17],
    o: [170, 170, 170],
    p: [221, 221, 221],
    q: [0, 31, 63],
    r: [0, 116, 217],
    s: [127, 219, 255],
    t: [57, 204, 204],
    u: [61, 153, 112],
    v: [46, 204, 64],
    w: [1, 255, 112],
    x: [46, 204, 64],
    y: [1, 255, 112],
    z: [255, 220, 0]
  };

  if (!color.hasOwnProperty(char)) {
    char = 'a';
  }

  return {
    color: color[char],
    background: background[char]
  };
};
