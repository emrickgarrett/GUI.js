/**
 * Created by Garrett on 3/23/2015.
 */

(function () {
    // GUI returns new Library object that hold our selector. Ex: GUI('.wrapper')
    var GUI = function (params) {
        return new Library(params);
    };

    // In our Library we get our selector with querySelectorAll (we do not support < ie8)
    // We also add selector length, version and twitter/github or whatever you like as information about your library.
    var Library = function (params) {
        // Get params
        var selector = document.querySelectorAll(params),
            i = 0;
        // Get selector length
        this.length = selector.length;
        this.creator = "Garrett Emrick";
        this.version = "v0.1";
        this.guiType = params;

        // Add selector to object for method chaining
        for (; i < this.length; i++) {
            this[i] = selector[i];
        }

        // Return as object
        return this;
    };

    GUI.fn = Library.prototype =
    {
        /** Parse settings for the GUI, and apply them*/
        createGui: function (data) {
            var length = this.length;

            var primaryColor = "red";
            var secondaryColor = "blue";
            var primaryTextColor = "white";
            var secondaryTextColor = "white";
            var borderRadius = "0.5em";
            var border = "none";
            var animated = false;
            var animate_time = "0";
            var animate_type = "hover_colorChange";
            var textDecoration = "none";
            var padding = "1em";
            var margin = "0 0 0 .5em";
            var float = "right";
            var dropdown_borderRadius = "0";
            var dropdown_primaryColor = "blue";
            var dropdown_secondaryColor = "red";
            var dropdown_primaryTextColor = "white";
            var dropdown_secondaryTextColor = "white";
            var dropdown_border = "1px 0 0 0 solid black";
            var dropdown_margin = "0";
            var dropdown_padding = "0";


            //Things that can be currently changed depending on the JSON passed in
            if(this.guiType == ".gui-top-basic") {
                primaryColor = "red";
                secondaryColor = "blue";
                primaryTextColor = "white";
                secondaryTextColor = "white";
                borderRadius = "5px";
                border = "0";
                animated = false;
                animate_time = "0";
                animate_type = "hover_colorChange";
                textDecoration = "none";
                padding = "1em";
                margin = "0 0 0 0";
                float = "right";
                dropdown_borderRadius = "0";
                dropdown_primaryColor = "red";
                dropdown_secondaryColor = "blue";
                dropdown_primaryTextColor = "white";
                dropdown_secondaryTextColor = "white";
                dropdown_border = "0";
                dropdown_margin = "0";
                dropdown_padding = "0";
            }


            try{
                if(data.primaryColor != null){
                    primaryColor = data.primaryColor;
                }
                if(data.secondaryColor != null){
                    secondaryColor = data.secondaryColor;
                }
                if(data.animated != null){
                    animated = data.animated;
                }
                if(data.animate_time != null){
                    animate_time = data.animate_time;
                }
                if(data.textDecoration != null){
                    textDecoration = data.textDecoration;
                }
                if(data.primaryTextColor != null){
                    primaryTextColor = data.primaryTextColor;
                }
                if(data.secondaryTextColor != null){
                    secondaryTextColor = data.secondaryTextColor;
                }
                if(data.borderRadius != null){
                    borderRadius = data.borderRadius;
                }
                if(data.border != null){
                    border = data.border;
                }
                if(data.padding != null){
                    padding = data.padding;
                }
                if(data.margin != null){
                    margin = data.margin;
                }
                if(data.float != null){
                    float = data.float;
                }
                if(data.dropdown_borderRadius != null){
                    dropdown_borderRadius = data.dropdown_borderRadius;
                }
                if(data.dropdown_border != null){
                    dropdown_border = data.dropdown_border;
                }
                if(data.dropdown_primaryColor != null){
                    dropdown_primaryColor = data.dropdown_primaryColor;
                }
                if(data.dropdown_secondaryColor != null){
                    dropdown_secondaryColor = data.dropdown_secondaryColor;
                }
                if(data.dropdown_primaryTextColor != null){
                    dropdown_primaryTextColor = data.dropdown_primaryTextColor;
                }
                if(data.dropdown_secondaryTextColor != null){
                    dropdown_secondaryTextColor = data.dropdown_secondaryTextColor;
                }
                if(data.dropdown_margin != null){
                    dropdown_margin = data.dropdown_margin;
                }
                if(data.dropdown_padding != null){
                    dropdown_padding = data.dropdown_padding;
                }
                if(data.animate_type != null){
                    animate_type = data.animate_type;
                }


            }catch(Exception){
                Console.writeln("There was an error in your data formatting");
            }

            while(length--){

                var ul = this[length].getElementsByClassName("top-menu");
                ul[0].style.float = float;

                var btns = ul[0].getElementsByTagName("li");
                var btns_length = btns.length;

                if(animated){
                    createAnimatedMenu(this.guiType, secondaryColor, secondaryTextColor, dropdown_secondaryColor, dropdown_secondaryTextColor, animate_time, animate_type);
                }
                while(btns_length--){


                    //Apply user styling to the top level links
                    var links = btns[btns_length].getElementsByTagName("a");
                    links[0].style.textDecoration = textDecoration;
                    links[0].style.color = primaryTextColor;
                    links[0].style.background = primaryColor;
                    links[0].style.borderRadius = borderRadius;
                    links[0].style.border = border;
                    links[0].style.padding = padding;
                    links[0].style.margin = margin;

                    //If there is a sublist...
                    var sub_menu = btns[btns_length].getElementsByClassName("sub-menu");
                    if(sub_menu.length){
                        //We are only doing a max of one sub menu depth atm
                        sub_menu[0].style.position = "absolute";

                        //Calculate the top pixels needed to make the dropdown look right
                        var padding_amount = links[0].offsetHeight/2;

                        //alert(padding_amount);

                        sub_menu[0].style.top = padding_amount + 4 +"px";//"100%";
                        sub_menu[0].style.left = links[0].style.margin.substring(links[0].style.margin.lastIndexOf(" "), links[0].style.margin.length);
                        sub_menu[0].style.zIndex = "-1";
                        sub_menu[0].style.padding = "5px 0px";
                        sub_menu[0].style.width = "100px";

                        var sub_links = sub_menu[0].getElementsByTagName("li");
                        var sub_link_length = sub_links.length;

                        //Get the max width of all the list elements so they are equal sizes
                        var max_li_width = 0;
                        var loop_it = sub_link_length;
                        while(loop_it--){
                            if(sub_links[loop_it].offsetWidth > max_li_width)
                                max_li_width = sub_links[loop_it].offsetWidth;
                        }


                        //TODO fix widths of elements, in the example you can see the bottom two are slightly longer. Find out why.
                        while(sub_link_length--){

                            //TODO apply user selected styling to the sub_menu dropdown
                            sub_links[sub_link_length].style.display = "block";
                            sub_links[sub_link_length].style.width = max_li_width;
                            sub_links[sub_link_length].style.marginTop = 0;
                            sub_links[sub_link_length].style.background = dropdown_primaryColor;
                            sub_links[sub_link_length].style.padding = "0 .5em";
                            sub_links[sub_link_length].style.color = dropdown_primaryTextColor;
                            sub_links[sub_link_length].style.border = dropdown_border;
                            sub_links[sub_link_length].style.borderRadius = dropdown_borderRadius;


                            var sub_anchors = sub_links[sub_link_length].getElementsByTagName("a");
                            var sub_anchors_length = sub_anchors.length;

                            sub_links[sub_link_length].style.height = sub_anchors[0].offsetHeight;

                            //Size the li items by filling the <a> with a div as large as the total area
                            while(sub_anchors_length--){
                                sub_anchors[sub_anchors_length].style.margin = dropdown_margin;
                                sub_anchors[sub_anchors_length].style.padding = dropdown_padding;
                                sub_anchors[sub_anchors_length].style.color = dropdown_primaryTextColor;
                                sub_anchors[sub_anchors_length].style.border = dropdown_border;
                                sub_anchors[sub_anchors_length].style.borderRadius = dropdown_borderRadius;
                                sub_anchors[sub_anchors_length].innerHTML = "<div style='width:" + max_li_width + "px;height:100%;padding:5px;'>" + sub_anchors[sub_anchors_length].innerHTML + "</div>";
                            }
                        }

                    }
                }
            }
            return this;
        }
    };


    // Assign our GUI object to global window object.
    if(!window.GUI) {
        window.GUI = GUI;
    }
})();


/*
//Create an animated menu by using OnHover css that has cross-browser compatibility (Of course not < IE8)
//This does it for both the upper level menus, and the sub menus. Perhaps change this at some point?
 */
function createAnimatedMenu(ul, secondaryColor, secondaryTextColor, dropdown_secondaryColor, dropdown_secondaryTextColor, animate_time, animate_type){
    switch(animate_type){
        case "hover_colorChange":
            var style;
            var css = ul + " a:hover{ background: " + secondaryColor + "!important;}";
            css += ".sub-menu a:hover{ background: " + dropdown_secondaryColor + "!important;}";
            css += ".sub-menu div:hover{ background: " + dropdown_secondaryColor + "!important;}";
            css += ".sub-menu li:hover{ background: " + dropdown_secondaryColor + "!important;}";
            style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.rel = "stylesheet";
            style.title = "hover_colorChange";
            if(style.stylesheet)
                style.stylesheet.cssText = css;
            else
                style.appendChild(document.createTextNode(css));
            document.getElementsByTagName("head")[0].appendChild(style);
        return true;
        default:
            alert("it was default");
            return false;
    }
}