Element.implement({
    collide: function(el){
        var thisCoors = this.getCoordinates(),
            elCoors = el.getCoordinates();
        
        return !((thisCoors['bottom'] < elCoors['top']) ||
                 (thisCoors['top'] > elCoors['bottom']) ||
                 (thisCoors['right'] < elCoors['left']) ||
                 (thisCoors['left'] > elCoors['right']));
    }
});
