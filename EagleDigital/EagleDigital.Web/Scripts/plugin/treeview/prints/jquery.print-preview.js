/*!
 * jQuery Print Previw Plugin v1.0.1
 *
 * Copyright 2011, Tim Connell
 * Licensed under the GPL Version 2 license
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Date: Wed Jan 25 00:00:00 2012 -000
 */
 
(function($) { 
    
	// Initialization
	$.fn.printPreview = function() {
		this.each(function() {
		    $(this).bind('click', function (e) {
		        e.preventDefault();
		        var $objID = jQuery('.menu-tab-show li.active > a').attr('href');
			    if (!$('#print-modal').length) {
			        $.printPreview.loadPrintPreview($objID);
			    }
			});
		});
		return this;
	};
    
    // Private functions
    var mask, size, print_modal, print_controls;
    $.printPreview = {
        loadPrintPreview: function ($objID) {
            // Declare DOM objects
            print_modal = $('<div id="print-modal"></div>');
            print_controls = $('<div id="print-modal-controls">' + 
                                    '<a href="#" class="print" title="Print page">Print page</a>' +
                                    '<a href="#" class="close" title="Close print preview">Close</a>').hide();
            var print_frame = $('<iframe id="print-modal-content" scrolling="no" border="0" frameborder="0" name="print-frame" />');

            // Raise print preview window from the dead, zooooooombies
            print_modal
                .hide()
                .append(print_controls)
                .append(print_frame)
                .appendTo('body');

            // The frame lives
            var print_frame_ref = '';
            for (var i = 0; i < window.frames.length; i++) {
                if (i == window.frames.length-1) {
                    if (window.frames[i].name == "print-frame") {
                        var print_frame_ref = window.frames[i].document;
                        break;
                    }
                }
                
                
               
                /*
                if (window.frames[i].name == "print-frame") {
                    var print_frame_ref = window.frames[i].document;
                    break;
                }*/
            }

            print_frame_ref.open();
            print_frame_ref.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
                '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">' + 
                '<head><title>' + document.title + '</title></head>' +
                '<body></body>' +
                '</html>');
            print_frame_ref.close();
            
            // Grab contents and apply stylesheet
            var $iframe_head = $('head link[media*=print], head link[media=all]').clone(),
                //$iframe_body = $($objID + ' :not(#print-modal):not(script):not(iframe)').clone();
                $iframe_body = $($objID + ':not(#print-modal):not(script):not(iframe)').clone();

            $iframe_head.each(function() {
                $(this).attr('media', 'all');
            });
            $iframe_body.find('iframe').replaceWith("<span style='color:#909090;'>Video content is not supported to print</span>");
            
            //$iframe_body.find("iframe").remove();
            //if (!$.browser.msie && !($.browser.version < 7) ) {
            if (!(navigator.appName == 'Microsoft Internet Explorer')) {
                $('head', print_frame_ref).append($iframe_head);

                $('head', print_frame_ref).append($iframe_head);
                $('body', print_frame_ref).append('<div id="printContainer"/>');
                $('body', print_frame_ref).find('#printContainer').append($iframe_body);
                
                //$('body', print_frame_ref).find("svg > path").each(function () {
                //    $('#searchHelp').remove();
                //});
            }
            else {
               
            }
            
            // Disable all links
            $('a', print_frame_ref).bind('click.printPreview', function(e) {
                e.preventDefault();
            });
            
            // Introduce print styles
            $('head').append('<style type="text/css">' +
                '@media print {' +
                    '/* -- Print Preview --*/' +
                    '#print-modal-mask,' +
                    '#print-modal {' +
                        'display: none !important;' +
                    '}' +
                '}' +
                '</style>'
            );

            // Load mask
            $.printPreview.loadMask();

            // Disable scrolling
            $('body').css({overflowY: 'hidden', height: '100%'});
            $('img', print_frame_ref).load(function() {
                print_frame.height($('body', print_frame.contents())[0].scrollHeight);
            });
            
            // Position modal            
            starting_position = $(window).height() + $(window).scrollTop();
            var css = {
                    top:         starting_position,
                    height:      '100%',
                    overflowY:   'auto',
                    zIndex:      10000,
                    display:     'block'
                }
            print_modal
                .css(css)
                .animate({ top: $(window).scrollTop()}, 400, 'linear', function() {
                    print_controls.fadeIn('slow').focus();
                });
            print_frame.height($('body', print_frame.contents())[0].scrollHeight + 20);
            
            // Bind closure
            $('a', print_controls).bind('click', function(e) {
                e.preventDefault();
                //if ($(this).hasClass('print')) { window.print(); }

                if ($(this).hasClass('print')) {
                    var pwin = window.open('', 'print_content', 'width=1,height=1');
                    pwin.document.open();
                    var print_content = $("#print-modal-content").contents().find("html").html();
                    // FOR IE browser
                    print_content = print_content.replace('<BODY>', '<BODY onload="window.print()">');
                    // FOR Other browser
                    print_content = print_content.replace('<body>', '<body onload="window.print()">');
                    pwin.document.write(print_content);
                    pwin.document.close();
                    setTimeout(function () { pwin.close(); }, 1000);
                    distroyPrintPreview();
                }

                else { $.printPreview.distroyPrintPreview(); }
            });
    	},
    	
    	distroyPrintPreview: function() {
    	    print_controls.fadeOut(100);
    	    print_modal.animate({ top: $(window).scrollTop() - $(window).height(), opacity: 1}, 400, 'linear', function(){
    	        print_modal.remove();
    	        $('body').css({overflowY: 'auto', height: 'auto'});
    	    });
    	    mask.fadeOut('slow', function()  {
    			mask.remove();
    		});				

    		$(document).unbind("keydown.printPreview.mask");
    		mask.unbind("click.printPreview.mask");
    		$(window).unbind("resize.printPreview.mask");
	    },
	    
    	/* -- Mask Functions --*/
	    loadMask: function() {
	        size = $.printPreview.sizeUpMask();
            mask = $('<div id="print-modal-mask" />').appendTo($('body'));
    	    mask.css({				
    			position:           'absolute', 
    			top:                0, 
    			left:               0,
    			width:              size[0],
    			height:             size[1],
    			display:            'none',
    			opacity:            0,					 		
    			zIndex:             9999,
    			backgroundColor:    '#000'
    		});
	
    		mask.css({display: 'block'}).fadeTo('400', 0.75);
    		
            $(window).bind("resize..printPreview.mask", function() {
				$.printPreview.updateMaskSize();
			});
			
			mask.bind("click.printPreview.mask", function(e)  {
				$.printPreview.distroyPrintPreview();
			});
			
			$(document).bind("keydown.printPreview.mask", function(e) {
			    if (e.keyCode == 27) {  $.printPreview.distroyPrintPreview(); }
			});
        },
    
        sizeUpMask: function() {
            if (navigator.appName == 'Microsoft Internet Explorer') {
            	// if there are no scrollbars then use window.height
            	var d = $(document).height(), w = $(window).height();
            	return [
            		window.innerWidth || 						// ie7+
            		document.documentElement.clientWidth || 	// ie6  
            		document.body.clientWidth, 					// ie6 quirks mode
            		d - w < 20 ? w : d
            	];
            } else { return [$(document).width(), $(document).height()]; }
        },
    
        updateMaskSize: function() {
    		var size = $.printPreview.sizeUpMask();
    		mask.css({width: size[0], height: size[1]});
        }
    }
})(jQuery);