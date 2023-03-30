import path from 'path';

const getFileExt = (filepath) => path.extname(filepath).slice(1);

export default getFileExt;
