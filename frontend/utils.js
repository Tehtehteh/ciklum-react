let createAPIUrl = function(path){
  return "{0}/api{1}{2}".format(path.origin, path.pathname, path.search);
};

String.prototype.format = function(){
  let str = this;
  for (let i = 0; i < arguments.length; i++){
      str = str.replace('{' + i + '}', arguments[i]);
  }
  return str;
};

export {createAPIUrl}