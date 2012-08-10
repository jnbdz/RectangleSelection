/*
---
description: RectangleSelection utility makes it easy to select multiple elements on a page with a mouse.

authors:
  - Jean-Nicolas Boulay (http://jean-nicolas.com/)

license:
  - MIT-style license

requires:
 - core/1.4
 - More:/Element.Measure
 - Element.Collide/0.5

provides:
  - RectangleSelection
...
*/

var RectangleSelection = new Class({

    Implements: [Options, Events],
    
    options: {/*
        onAttach: function(thisSelectionRectangleEl){},
        onDisplay: function(thisPoy, thisPox){},
        onSelection: function(thisMy, thisMx, thisHeight, thisWidth, thisPtop, thisPleft){},
        onSelected: function(thisSelectionRectangleEl){},
        onDeselecte: function(){},
        */
        container: null,
        className: 'selection-rectangle',
        fadeOut: true
    },

    initialize: function(selectables, options) {
    
        this.setOptions(options || {});
        
        this.selectables = $$(selectables);
        this.container = document.id(this.options.container);
        
        if (this.container && typeOf(this.container) != 'element')
                this.container = document.id(this.container.getDocument().body);
        
        this.bound = {
                start: this.start.bind(this),
                drag: this.drag.bind(this),
                stop: this.stop.bind(this),
                select: this.select.bind(this),
                deselecte: this.deselecte.bind(this)
        };
        
        this.attach();
        
        this.addEvent('selection', this.bound.select, true);
    },
    
    attach: function(){
    
        this.pox = null;
        this.poy = null;
        this.ptop = null;
        this.pleft = null;
        this.height = null;
        this.width = null;
        this.newSelector = true;
        this.mousedown = false;
        this.periodicalRectChange = null;
        
        this.selectionRectangleEl = new Element('div', {
            'display': 'none',
            'position': 'absolute',
            'class': this.options.className
        }).inject(this.container);
    
        this.document = this.selectionRectangleEl.getDocument();
        
        this.opacity = this.selectionRectangleEl.getStyle('opacity');
        
        this.tween = this.selectionRectangleEl.get('tween');

        this.document.addEvents({
            'mousedown': this.bound.start,
            'mousemove': this.bound.drag,
            'mousewheel': this.bound.drag,
            'mouseup': this.bound.stop
        });

        this.selectables.addEvent('mousedown', function(e){
            e.stopPropagation();
        });
 
        this.fireEvent('attach', [this.selectionRectangleEl]);
        
        return this;
        
    },
    
    detach: function(){
        this.selectionRectangleEl.dispose();
        this.fireEvent('detach');
        return this;
    },

    start: function(e) {
        this.deselecte();
        
        var target = document.id(e.target);
        if (!target.match(this.container) && !target.match(this.selectionRectangleEl)) return;
        e.stop();
        if (e.rightClick) return;
        
        this.addScrollY = 0;
        this.addScrollX = 0;
        this.poy = e.page.y;
        this.pox = e.page.x;
        this.mousedown = true;
        this.newSelector = false;

        this.tween.stop();

        this.selectionRectangleEl.setStyles({
            'display': 'block',
            'height': 0,
            'width': 0,
            'top': this.poy,
            'left': this.pox,
            'opacity': this.opacity,
            'filter': 'alpha(opacity=' + this.opacity + ')'
        });
        
        this.element = this.selectionRectangleEl;
        
        this.limits = this.calculateLimit();
        
        this.fireEvent('display', [this.poy, this.pox]);
    
    },

    resizeRectangle: function(e) {

        var mx = e.page.x,
            my = e.page.y;

        if(this.scrollToX != 0 || this.scrollToY != 0) {
        
            var rectSelHeight = this.selectionRectangleEl.getStyle('height').toInt();
            this.winScroll = window.getScroll();
            this.winScrollY = this.winScroll.y;
            this.winScrollX = this.winScroll.x;
            this.toScrollToX = this.winScrollX + this.scrollToX;
            this.toScrollToY = this.winScrollY + this.scrollToY;
            
            this.toScrollToX = (this.toScrollToX >= 0) ? this.toScrollToX : 0;
            this.toScrollToY = (this.toScrollToY >= 0) ? this.toScrollToY : 0;

            if((this.winScrollY <= 8 && this.scrollToY < 0) ||
                (((this.winSizeY + this.winScrollY) == this.scrollSize.y) && this.scrollToY > 0) ||
                (this.winScrollX <= 8 && this.scrollToX < 0) ||
                (((this.winSizeX + this.winScrollX) == this.scrollSize.x) && this.scrollToX > 0)
            ) {
                clearInterval(this.periodicalRectChange);
            } else {
                window.scrollTo(this.toScrollToX, this.toScrollToY);
            }
            
            my = my + this.toScrollToY - this.toRemoveY;
            mx = mx + this.toScrollToX - this.toRemoveX;
            
        }
        
        
        mx = (mx >= this.limits['left']) ? mx : this.limits['left'];
        mx = (mx <= this.limits['right']) ? mx : this.limits['right'];
        my = (my >= this.limits['top']) ? my : this.limits['top'];
        my = (my <= this.limits['bottom']) ? my : this.limits['bottom'];
        
        if (mx >= this.limits['left'] && mx <= this.limits['right']) {
            if (this.pox < mx) {
                this.width = (mx - this.pox).abs();
                this.pleft = this.pox;
            } else {
                this.width = (mx - this.pox).abs();
                this.pleft = mx;
            }
        }
        
        if (my >= this.limits['top'] && my <= this.limits['bottom']) {
            if (this.poy < my) {
                this.height = (my - this.poy).abs();
                this.ptop = this.poy;
            } else {
                this.height = (my - this.poy).abs();
                this.ptop = my;
            }
        }
        
        this.selectionRectangleEl.setStyles({
            height: this.height,
            width: this.width,
            top: this.ptop,
            left: this.pleft
        });
        
        this.fireEvent('selection', [my, mx, this.height, this.width, this.ptop, this.pleft]);

    },

    drag: function(e){

        if (this.mousedown) {
            
            clearInterval(this.periodicalRectChange);
            
            this.scrollSize = window.getScrollSize();
            this.winSize = window.getSize();
            this.winSizeY = this.winSize.y;
            this.winSizeX = this.winSize.x;
            var getScroll = window.getScroll();
            this.toRemoveY = getScroll.y;
            this.toRemoveX = getScroll.x;
            this.clientY = e.client.y;
            this.clientX = e.client.x;
            this.scrollToX = 0;
            this.scrollToY = 0;
            this.toScrollToX = 0;
            this.toScrollToY = 0;

            // For the Bottom
            if ((this.winSizeY - 5).abs() < this.clientY) {
                this.scrollToY = 30;
            } else if((this.winSizeY - 10).abs() < this.clientY) {
                this.scrollToY = 20;
            } else if((this.winSizeY - 20).abs() < this.clientY) {
                this.scrollToY = 10;
            }
            // For the Top
            else if(5 > this.clientY) {
                this.scrollToY = -30;
            } else if(10 > this.clientY) {
                this.scrollToY = -20;
            } else if(20 > this.clientY) {
                this.scrollToY = -10;
            }

            // For the Right
            if ((this.winSizeX - 5).abs() < this.clientX) {
                this.scrollToX = 30;
            } else if((this.winSizeX - 10).abs() < this.clientX) {
                this.scrollToX = 20;
            } else if((this.winSizeX - 20).abs() < this.clientX) {
                this.scrollToX = 10;
            }
            // For the Left
            else if(5 > this.clientX) {
                this.scrollToX = -30;
            } else if(10 > this.clientX) {
                this.scrollToX = -20;
            } else if(20 > this.clientX) {
                this.scrollToX = -10;
            }

            if(this.scrollToX != 0 || this.scrollToY != 0) {
                this.periodicalRectChange = this.resizeRectangle.periodical(10, this, e);
            } else {
                this.resizeRectangle(e);
            }
            
        }

    },

    stop: function(e){
    
        clearInterval(this.periodicalRectChange);
        this.mousedown = false;
        if(!this.options.fadeOut){
                    
            this.selectionRectangleEl.setStyle('display', 'none');
            
            this.fireEvent('selected', [this.selectionRectangleEl]);
            return;
        }

        this.tween.start('opacity', 0);
        this.tween.chain(function() {
            this.selectionRectangleEl.setStyle('display', 'none');
            this.fireEvent('selected', [this.selectionRectangleEl]);
        }.bind(this));
    
    },
    
    select: function(){
            
			var overed = this.selectables.filter(function(el, i){
                return el.collide(this.selectionRectangleEl);
			}, this);

			if (this.overed != overed){
				if (this.overed) this.fireEvent('leave', [this.selectionRectangleEl, this.overed]);
				if (overed) this.fireEvent('enter', [this.selectionRectangleEl, overed]);
				this.overed = overed;
			}

    },
    
    deselecte: function(e){
            this.selectables.removeClass('selected');
            this.fireEvent('deselecte', [this.selectables]);
    },
    
    calculateLimit: function(){
        var container = this.container,
            selRectEl = this.selectionRectangleEl,
            borderTop = selRectEl.getStyle('border-top').toInt(),
            borderLeft = selRectEl.getStyle('border-left').toInt(),
            coors = container.getCoordinates();

        coors['top'] += borderTop;
        coors['left'] += borderLeft;
        coors['bottom'] -= selRectEl.getStyle('border-bottom').toInt() + borderTop;
        coors['right'] -= selRectEl.getStyle('border-right').toInt() + borderLeft;
        
        return coors;
    }

});