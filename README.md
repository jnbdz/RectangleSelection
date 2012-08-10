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

###Mootools More:

[Element.Measure](http://mootools.net/docs/more/Element/Element.Measure)

###Extrats:

[Element.collide](http://mootools.net/forge/p/elcollide)

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

#####Arguments:

* thisSelectionRectangleEl - (element) This is the element that is use for selecting the other elements in the document.

####detach

* (function) Executes when the rectangle selection element is removed from the document.

#####Signature:

    onDetach()

####display

* (function) Executes when the element for the rectangle selection appears and when the user starts selecting new elements.

#####Signature:

    onDisplay(thisPoy, thisPox)

#####Arguments:

* thisPoy - (int) This is the "y" starting position of the rectangle selection. Also call the point of origin.
* thisPox - (int) This is the "x" starting position of the rectangle selection. Also call the point of origin.

####Selection

* (function) Executes when the user starts dragging the rectangle selection to resize it, to select the elements.

#####Signature:

    onSelection(thisMy, thisMx, thisHeight, thisWidth, thisPtop, thisPleft)

#####Arguments:

* thisMy - (int) This is the "y" position of the mouse.
* thisMx - (int) This is the "x" position of the mouse.
* thisHeight - (int) This is the height of the distance between the "x" axis of the point of origin and the new position of the mouse by "y".
* thisWidth - (int) This is the width of the distance between the "y" axis of the point of origin and the new position of the mouse by "x".
* thisPtop - (int) This is the distance between the rectangle selection and the top of the window (in CSS it would be the "top").
* thisPleft - (int) This is the distance between the rectangle selection and the left of the window (in CSS it would be the "left").

####Selected

* (function) Executes when the user stops selecting with the rectangle selection and it fades out.

#####Signature:

    onSelected()

####leave

* (function) Executes when the rectangle selection unselects some elements.

#####Signature:

    onLeave(thisSelectionRectangleEl, thisOvered)

#####Arguments:

* thisSelectionRectangleEl - (element) Rectangle selection element.
* thisOvered - (element) Elements used to be selected.

####enter

* (function) Executes when new elements are selected.

#####Signature:

    onEnter(thisSelectionRectangleEl, overed)

#####Arguments:

* thisSelectionRectangleEl - (element) Rectangle selection element.
* overed - (elements) Elements selected.

####Deselected

* (function) Executes when a element is unselected.

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
