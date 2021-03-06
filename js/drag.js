function TooluxDrag ( tpl, clsName )
{
    'use strict';
    
    this._tpl = tpl;
    this._clsName = clsName;
    
    this.bindEvent();
}

TooluxDrag.prototype.bindEvent = function (e)
{
    'use strict';
    
    var _self = this,
        _isClicked = false,
        _diff = {
            x: 0,
            y: 0
        };
    
    this._tpl.bind('mousedown', function (e)
    {
        if(!_isClicked && jQuery(e.target).hasClass(_self._clsName)) {
                
            if(jQuery('.adfab-drag').size() > 0) {
                jQuery('.adfab-drag').removeClass('adfab-drag');
            }
            jQuery(this).addClass('adfab-drag');
            
            e.preventDefault();
            _isClicked = true;
            
            _diff.x = e.clientX - _self._tpl.offset().left;
            _diff.y = (e.clientY + jQuery(window, document).scrollTop()) - _self._tpl.offset().top;
        
            jQuery(document).bind('mousemove', function (e)
            {
                if(_isClicked) {
                    var newX = e.clientX - _diff.x,
                        newY = (e.clientY + jQuery(window, document).scrollTop()) - _diff.y;
                    
                    
                    _self._tpl.css({
                        top: newY + 'px',
                        left: newX + 'px'
                    });
                }
            });
            
            jQuery(document).bind('mouseup', function (e)
            {
                if(_isClicked) {
                    jQuery(document).unbind('mousemove');
                    jQuery(document).unbind('mouseup');
                    
                    e.preventDefault();
                    _isClicked = false;
                    
                    var newX = e.clientX - _diff.x,
                        newY = (e.clientY + jQuery(window, document).scrollTop()) - _diff.y;
                    
                    _self._tpl.css({
                        top: newY + 'px',
                        left: newX + 'px'
                    });
                    return false;
                }
            });
            
            return false;
        }
    });
    
    jQuery(document).keydown(function (e)
    {
        if(_self._tpl.hasClass('adfab-drag')
            && (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39
                || e.keyCode == 40)) {
            e.preventDefault();
            
            var t = parseInt(_self._tpl.css('top').replace('px', '')),
                l = parseInt(_self._tpl.css('left').replace('px', '')),
            	isShift = false;
            
            if (window.event) {
            	isShift = window.event.shiftKey ? true : false;
            }
            
            switch(e.keyCode) {
                // left
                case 37 :
                    l -= (isShift) ? 10 : 1;
                    break;
                // right
                case 39 :
                    l += (isShift) ? 10 : 1;
                    break;
                // down
                case 40 :
                    t += (isShift) ? 10 : 1;
                    break;
                // up
                case 38 :
                    t -= (isShift) ? 10 : 1;
                    break;
            }
            
            _self._tpl.css({
                top: t + 'px',
                left: l + 'px'
            });
            return false;
        }
    });
};

TooluxDrag.prototype.destroy = function (e)
{
    'use strict';
    
    this._tpl.unbind('mousedown');
    jQuery(document).unbind('mousemove');
    jQuery(document).unbind('mouseup');
};