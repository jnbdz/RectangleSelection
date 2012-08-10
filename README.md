RectangleSelection
===========

RectangleSelection utility makes it easy to select multiple elements on a page with a mouse.

![Screenshot](https://github.com/jnbdz/RectangleSelection/raw/master/RectangleSelection.png)

How to use
----------

Simply insert RectangleSelection().

###Syntax:

    new RectangleSelection(elements [, options]);

###Implements:

[Events](http://mootools.net/docs/core/Class/Class.Extras#Events), [Options](http://mootools.net/docs/core/Class/Class.Extras#Options)

###Arguments:

1. elements - (string) A CSS selector, (elements), (collection) or (array) An enumerable list of elements
2. options - (object; optional) a key/value set of options

###Options:

* container - (string) The default is null. This is the element that the RectangleSelection does not get out of.
* className - (string) 
* fadeOut - (bool) The default is true. This indicates if the RectangleSelection should fade out or just disappear.

###Events:

####attach

* (function) Executes when the RectangleSelection element has been added to the page.

#####Signature:

    onAttach(thisSelectionRectangleEl)

####display

* (function) Executes when 

#####Signature:

    onDisplay(thisPoy, thisPox)

####Selection

* (function) Executes when

#####Signature:

    onSelection(thisMy, thisMx, thisHeight, thisWidth, thisPtop, thisPleft)

####Selected

* (function) Executes when

#####Signature:

    onSelected()

####Deselected

* (function) Executes when

#####Signature:

    onDeselected()

###Methods:

####attach

* (function) It adds the element use for selecting the elements. And it attaches the events for this class to work.

#####Signature:

    attach()

####detach

* (function) For removing the Rectangle Selection element from the document and to remove the events attach to the document.

#####Signature:

    detach()

####start

* (function) Executes when a user starts using the Rectangle Selection.

#####Signature:

    start(event)

####resizeRectangle

* (function) Executes when the rectangle selection element needs to be resized.

#####Signature:

    resizeRectangle(event)

####drag

* (function) Executes when the mouse is down and is being drag.

#####Signature:

    drag(event)

####stop

* (function) Executes when the mouse is let go by the user. This is to stop the selection of elements and to make the rectangle selection element to fade out.

#####Signature:

    stop(event)

####select

* (function) Executes when the rectangle selection selects or unselects elements.

#####Signature:

    select()

####deselecte

* (function) This is for the removing all selection of any elements, previously selected.

#####Signature:

    deselecte(event)

####calculateLimit

* (function) Made to calculate the limits for the rectangle selection, set forth by the container element.

#####Signature:

    calculateLimit()

-------


Copyright (C) 2012 Jean-Nicolas Boulay ([http://jean-nicolas.com/](http://jean-nicolas.com/))

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
