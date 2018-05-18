export function cleanObject(obj) {
  Object.keys(obj).forEach(k => {
    if (typeof obj[k] === 'object' && obj[k].constructor === Object) {
      if (Object.keys(obj[k]).length === 0) {
        delete obj[k];
      } else {
        cleanObject(obj[k]);
      }
    }
  });
  return obj;
};

export function isHexColor(str) {
  return str.match(/^#([0-9a-f]{3}){1,2}$/i);
}

export function isRgbaColor(str) {
  return str.match(/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/);
}

export function isRgbColor(str) {
  return str.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/);
}

export function isNumber(str) {
  return str.match(/^\d+$/);
}
