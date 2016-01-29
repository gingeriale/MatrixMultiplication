/**
 * Created by Ri on 12/7/15.
 */


$(document).ready(function(){

    var switcher = true;

    var i = 1;
    var j = 1;


    $("#clear").click(function(){
        $("input:text").val('');
        $(".Rmatrix").empty().css('border-image','');
        $("nav").css("background-color","lavender");
        $(".error").remove();
        $("#Esign").removeAttr('src');
        switcher = true;
    });

    var cells = function(x,y,cls,o,p,Maction)
    {
        for(x;x<=o;x++)
        {
            for(y;y<=p;y++)
            {
                $(cls).append('<div class="form-group"><label for="cell1">' +
                    '</label><input type="text" value="" maxlength="1" ' +
                    'class="form-control col' + y +
                    'line' + x + '" id="cell1" placeholder="'+Maction+x+y+'"></div>');
            }

            $(cls).append("<br>");
            y = 1;
        }

        $("input[type=text]").focus(function()
        {
            $("nav").css("background-color","#D0E7FA");
            $(".error").remove();
        }).focusout(function()
        {
            $("nav").css("background-color","lavender");
        });


    };

    var Sa = 4;
    var Ca = 2;
    var Sb = 2;
    var Cb = 3;

    cells(i,j,".Amatrix",Sa,Ca,"a");
    cells(i,j,".Bmatrix",Sb,Cb,"b");


    $("#addS").click(function()
    {
        if (switcher === true)
        {
            if (($('#optionB').is(':checked')) && (Sb < 10))
            {
                $(".Bmatrix").css("margin-top", "-=17");
                cells(Sb + 1, j, ".Bmatrix", Sb + 1, Cb, "b");
                Sb = Sb + 1;

                if (Sb > 4 && Sb > Sa)
                {
                    $(".Rmatrix").css("top", "+=18");
                }
            }
            else if ($('#optionA').is(':checked') && (Sa < 10))
            {
                $(".Amatrix").css("margin-top", "-=17");
                cells(Sa + 1, j, ".Amatrix", Sa + 1, Ca, "a");
                Sa = Sa + 1;

                if (Sa > 4 && Sa > Sb)
                {
                    $(".Rmatrix").css("top", "+=18");
                }
            }

            $(".error").remove();
        }
    });

    $("#addC").click(function()
    {
        if (switcher === true)
        {
            if ($('#optionB').is(':checked') && (Cb < 10))
            {
                $(".Bmatrix").empty();
                cells(i, j, ".Bmatrix", Sb, Cb + 1, "b");
                Cb = Cb + 1;
            }
            else if ($('#optionA').is(':checked') && (Ca < 10))
            {
                $(".Amatrix").empty();
                $(".Bmatrix").css("left","+=35");
                $("#Msign").css("left","+=35");
                cells(i, j, ".Amatrix", Sa, Ca + 1, "a");
                Ca = Ca + 1;
            }

            $(".error").remove();
        }
    });

    $("#deleteS").click(function()
    {
        if (switcher === true)
        {
            if($('#optionB').is(':checked') && ((Sb > 1 && Cb > 1) || (Cb === 1 && Sb > 2)))
            {
                $(".Bmatrix").css("margin-top","+=17").empty();
                cells(i,j,".Bmatrix",Sb-1,Cb,"b");
                Sb = Sb - 1;

                if (Sb>3 && Sb>Sa)
                {
                    $(".Rmatrix").css("top","-=18");
                }
            }
            else if($('#optionA').is(':checked') && ((Sa > 1 && Ca > 1) || (Ca === 1 && Sa > 2)))
            {
                $(".Amatrix").css("margin-top", "+=17").empty();
                cells(i, j, ".Amatrix", Sa - 1, Ca, "a");
                Sa = Sa - 1;

                if (Sa > 3 && Sa > Sb)
                {
                    $(".Rmatrix").css("top", "-=18");
                }
            }

            $(".error").remove();
        }
    });

    $("#deleteC").click(function()
    {
        if (switcher === true)
        {
            if ($('#optionB').is(':checked') && ((Cb > 1 && Sb > 1) || (Sb === 1 && Cb > 2)))
            {
                $(".Bmatrix").empty();
                cells(i, j, ".Bmatrix", Sb, Cb - 1, "b");
                Cb = Cb - 1;
            }
            else if ($('#optionA').is(':checked') && ((Ca > 1 && Sa > 1) || (Sa === 1 && Ca > 2)))
            {
                $(".Amatrix").empty();
                $(".Bmatrix").css("left","-=35");
                $("#Msign").css("left","-=35");
                cells(i, j, ".Amatrix", Sa, Ca - 1, "a");
                Ca = Ca - 1;
            }

            $(".error").remove();
        }
    });


    $("#multiply").click(function()
    {
        $(".error").remove();
        $(".Rmatrix").empty();

        var gathering = function(cls,S,C)
        {
            var arrayString = [];
            var arrayMatrix = [];

            for(var x=1; x<=S; x++)
            {

                for (var y = 1; y <= C; y++)
                {
                    if (($(cls+' :input.col' + y + 'line' + x).val()) == '')
                    {
                        $(cls+' :input.col' + y + 'line' + x).val('0');
                        console.log($(cls+' :input.col' + y + 'line' + x).val());
                        arrayString.push(0);
                    }
                    else
                    {
                        arrayString.push($(cls+' :input.col' + y + 'line' + x).val());
                    }
                }

                y = 1;
            }

            console.log(arrayString);

            var LS = arrayString.length;

            for (var l = 0; l < LS; l++)
            {
                arrayString[l] = parseFloat(arrayString[l]);

                if (isNaN(arrayString[l]) == true)
                    {
                        arrayString[l] = 0;
                    }
            }

            console.log(arrayString);

            var n, m, tempArray;

                for (n=0, m = LS; n<m; n+=C)
                {
                    tempArray = arrayString.slice(n,n+C);
                    arrayMatrix.push(tempArray);
                }

            return arrayMatrix;
        };

        var arrayA = gathering(".Amatrix",Sa,Ca);
        var arrayB = gathering(".Bmatrix",Sb,Cb);

        var chunk, element;
        var resultCells = function(S,C,resultArray)
        {
            for(var x=0;x<S;x++)
            {
                chunk = resultArray[x];
                for(var y=0;y<C;y++)
                {
                    element = chunk[y];
                    $(".Rmatrix").append('<div class="form-group"><label for="cell1">' +
                        '</label><input type="text" ' +
                        'class="form-control" readonly id="cell1" value="'+element+'"></div>');
                }

                $(".Rmatrix").append("<br>");
                y = 0;
            }

            $("nav").css("background-color","#ADFABA");
            $(".Rmatrix").css('border-image','url("brackets.png") 5 / 1  stretch');
        };

        var arrayR = new Array();

        if ((Ca === Sb && Sa === Cb) || (Ca === Sb && Sa != Cb))
        {
            arrayR = math.multiply(arrayA, arrayB);
            resultCells(Sa, Cb, arrayR);
            $("#Esign").attr('src','equal1.png');
        }
        else
        {
            $("nav").css("background-color","#FFDADD").append('<div class="error">Multiplication ' +
                'can\'t be executed because matrix\'s <b>A</b> amount of columns is not equal to ' +
                'matrix\'s <b>B</b> amount of strings</div>');
        }

        console.log(arrayR);

        if(Sa>=Sb)
        {
            $("#Esign").css('top',295+Sa*18);
        }
        else
        {
            $("#Esign").css('top',295+Sb*18);
        }

        switcher = false;

    });

    jQuery.fn.ForceNumericOnly = function()
    {
        return this.each(function()
        {
                $(this).keydown(function(e)
                {
                    var key = e.charCode || e.keyCode || 0;
                    // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
                    // home, end, period, and numpad decimal
                    return (
                    key == 8 ||
                    key == 9 ||
                    key == 13 ||
                    //key == 46 ||
                    //key == 110 ||
                    //key == 190 ||
                    (key >= 35 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105));
                });
        });
    };

    $('input[type=text]').ForceNumericOnly();

});
