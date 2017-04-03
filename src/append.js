// use: append.these('my-');

var append = {
  these : function(s) {
    // split prefixes
    var args = s.trim().split(' ');
    if (!args.length) return;
    
    // create regex
    var regex = args.join('|');
    regex = '(^(' + regex + ') )|( (' + regex + ') )';
    
    // for each selector
    $(':regex(class,' + regex + ')').each(function() {
      var e = $(this), retain = 0, remove = '';
      
      // while this has class from args
      while (e.attr('class').match(regex)) {
        function get(start) {
          var arg = '', pos = e.attr('class').length;
          args.forEach(function(f) {
            var i = e.attr('class').indexOf(f);
            if (i <= pos && i >= start) {
              pos = i;
              arg = f;
            }
          });
          return {
            arg: arg, pos: pos
          };
        }
        
        var arg1 = get(0);
        e.removeClass(arg1.arg);
        var arg2 = get(arg1.pos);
        
        retain = (retain === 0) ? e.attr('class').substr(0,arg1.pos).trim() : retain;
        
        var toAddStr = e.attr('class').substring(arg1.pos, arg2.pos).trim().split(' ');
        if (toAddStr != '') {
          toAddStr.forEach(function(f) {
            var pos = /[_a-zA-Z]/.exec(f).index;
            e.addClass(f.substr(0, pos) + arg1.arg + f.substr(pos));
            remove += f + ' ';
          });
        }
      }
      
      e.removeClass(remove).addClass(retain);
    });
  }
};
