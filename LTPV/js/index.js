var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var lst = [];

function load() {
    var i = 0;
    alpha.forEach((e) => {
        lst[i] = {
            letter: e,
            lst: []
        }
        i++;
    })
    i = 0;

    TR.list.forEach((e) => {
        var let = e.local.toUpperCase().substring(0, 1);
        let = alpha.lastIndexOf(let);
        lst[let].lst.push(e);
    })

    var l = document.getElementById("table_list");
    lst.forEach((e) => {
        var tr = document.createElement('tr');
        tr.setAttribute('id', 'letter_' + e.letter);
        tr.setAttribute('class', 'hidden')

        var htm = "<table><tr>";
        i = 0;
        e.lst.forEach((f) => {
            if (i > 2) { htm += "</tr><tr>"; i = 0; }
            htm += "<td class='table_tr' style='margin-left:30px;width:300px' onclick='openTel(\"" + f.local + "\")'><pre><b>" + f.local + "</b></pre><pre id='" + f.local + "' class='hidden'>Tel:" + f.tel + "  Ram:" + f.ram + "</pre></td>";
            i++;
        })
        htm += "</tr></table>";

        tr.innerHTML = '<td><img title="' + e.letter + '" src="./img/' + e.letter + '.png"></td><td>' + htm + '</td>';
        l.appendChild(tr);
    })

}

function clickAlpha(letter) {
    if (letter == 'All') {
        var let = document.getElementById("tab_All");
        if (let.getAttribute('class') == "alph_normal") {
            document.getElementById("tab_" + letter).setAttribute('class', 'alph_clicked');
            alpha.forEach((e) => {
                document.getElementById("tab_" + e).setAttribute('class', 'alph_clicked');
                show(e);
            });
        } else {
            document.getElementById("tab_" + letter).setAttribute('class', 'alph_normal');
            alpha.forEach((e) => {
                document.getElementById("tab_" + e).setAttribute('class', 'alph_normal');
                hide(e);
            });
        }
    } else {
        toggle(letter);
    }
}

function toggle(letter) {
    var let = document.getElementById("letter_" + letter);
    if (let.getAttribute('class') == "hidden") {
        show(letter);
        document.getElementById("tab_" + letter).setAttribute('class', 'alph_clicked');
    } else {
        hide(letter);
        document.getElementById("tab_" + letter).setAttribute('class', 'alph_normal');
    }
}

function show(letter) {
    var let = document.getElementById("letter_" + letter);
    let.setAttribute('class', 'shown');
}

function hide(letter) {
    var let = document.getElementById("letter_" + letter);
    let.setAttribute('class', 'hidden');
}

function openTel(name) {
    var let = document.getElementById(name);
    if (let.getAttribute('class') == "hidden") {
        let.setAttribute('class', 'shown');
    } else {
        let.setAttribute('class', 'hidden');
    }
}