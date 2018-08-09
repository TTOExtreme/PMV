function Navegador() { var e, t, a; return this.isIE = !1, this.isNS = !1, this.version = null, e = navigator.userAgent, t = "MSIE", (a = e.indexOf(t)) >= 0 ? (this.isIE = !0, void(this.version = parseFloat(e.substr(a + t.length)))) : (t = "Netscape6/", (a = e.indexOf(t)) >= 0 ? (this.isNS = !0, void(this.version = parseFloat(e.substr(a + t.length)))) : (t = "Gecko", (a = e.indexOf(t)) >= 0 ? (this.isNS = !0, void(this.version = 6.1)) : void 0)) }

function _initSize() { var e = document.getElementById("_divSize");
    e && "100%" == e.style.width && (e.style.height = getInnerHeight() - 10); for (var t = document.getElementsByTagName("textarea"), a = 0; a < t.length; a++)
        if (t[a]) { var r = ""; "100%" == t[a].style.width && (r += "width"), "100%" == t[a].style.height && (r += "height"), "" != r && _addResize(t[a].id, r) }
    _resize() }

function _resize() { for (var e = new Array, t = 0; t < _aObjResize.length; t++) { var a = document.getElementById(_aObjResize[t][0]);
        a && a.parentNode && a.parentNode.offsetWidth && ("grid" == a.getAttribute("tipo") || "treeview" == a.getAttribute("tipo") || "none" != a.style.display) && (a.style.display = "none", e.push([a, _aObjResize[t][1]])) } for (var t = 0; t < e.length; t++) { var a = e[t][0]; if (-1 != e[t][1].indexOf("width")) { var r = 0; try { r = parseInt(a.style.borderLeft) } catch (n) { r = 0 }
            isNaN(r) && (r = 0); var o = 0; try { o = parseInt(a.style.borderRight) } catch (n) { o = 0 }
            isNaN(o) && (o = 0), a.style.width = a.parentNode.offsetWidth - r - o } if (-1 != e[t][1].indexOf("height"))
            if ("grid" != a.getAttribute("tipo")) { var i = 0; try { i = parseInt(a.style.borderTop) } catch (n) { i = 0 }
                isNaN(i) && (i = 0); var l = 0; try { l = parseInt(a.style.borderBottom) } catch (n) { l = 0 }
                isNaN(l) && (l = 0), a.style.height = a.parentNode.offsetHeight - i - l } else { a.style.height = "auto"; var d = a.parentNode.offsetHeight;
                a.style.display = "", a.offsetHeight <= d && (a.style.height = "100%") }
        a.style.display = "" } }

function _addResize(e, t) { for (var a = !1, r = 0; r < _aObjResize.length; r++)
        if (_aObjResize[r][0] == e) { a = !0; break }
    a || _aObjResize.push([e, t]) }

function loadImage() { _aImgLoaded = new Array; for (var e = 0; e < a.length; e++) _aImgLoaded[e] = (new Image).src = a[e] }

function mascara(e, t, a) { var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇÃÕÂÊÔÁÉÍÓÚÀÜ",
        n = "abcdefghijklmnopqrstuvwxyzçãõâêôáéíóàü",
        o = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇÃÕÂÊÔÁÉÍÓÚÀÜabcdefghijklmnopqrstuvwxyzçãõâêôáéíóàü",
        i = "0123456789",
        l = "().-:/ ";
    e && !a && (a = e.getAttribute("mascara")), t = t ? t : window.event ? window.event : ""; var d = e.value; if (t) { var s = t.which ? t.which : t.keyCode; if (tecla = String.fromCharCode(s), 32 > s) return !0; var c = d.length; if (c >= a.length) return !1; for (var u = a.substr(c, 1); - 1 != l.indexOf(u);) { if (d += u, c = d.length, c >= a.length) return !1;
            u = a.substr(c, 1) } switch (u) {
            case "#":
                if (-1 == i.indexOf(tecla)) return !1; break;
            case "A":
                if (-1 == r.indexOf(tecla)) return !1; break;
            case "a":
                if (-1 == n.indexOf(tecla)) return !1; break;
            case "Z":
                if (-1 == o.indexOf(tecla)) return !1; break;
            case "*":
                return e.value = d, !0;
            default:
                return !1 } } return e.value = d, !0 }

function mascara_data(e, t, a) { return mascara(a, e, "##/##/#### ##:##:##.###") }

function mascara_decimal(e) { return mascara_inteiro(e, ".") }

function mascara_inteiro(e, t) { var a = null;
    a = document.all ? event.keyCode : e.charCode; var r = String.fromCharCode(a); return 20 > a || a > 47 && 58 > a || t.indexOf(r) > -1 ? !0 : !1 }

function mascaraDinamica(e, t, a) { return mascara(e, t, a) }

function setMascara(e, t) { return obj = document.getElementById(e), obj ? (obj.onkeypress = function(e) { return mascaraDinamica(obj, e, t) }, void(obj.onblur = function() { validar_mascara(obj, t) })) : !1 }

function validar_mascara(e, t) { var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇÃÕÂÊÔÁÉÍÓÚÀÜ",
        r = "abcdefghijklmnopqrstuvwxyzçãõâêôáéíóàü",
        n = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇÃÕÂÊÔÁÉÍÓÚÀÜabcdefghijklmnopqrstuvwxyzçãõâêôáéíóàüçãõâêôáéíóàü",
        o = "0123456789",
        i = "().-:/ ",
        l = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZÇÃÕÂÊÔÁÉÍÓÚÀÜÇÃÕÂÊÔÁÉÍÓÚÀÜ[]^_/`abcdefghijklmnopqrstuvwxyzçãõâêôáéíóàü{|}~",
        d = !0,
        s = e.value,
        c = s.length; if (0 != c && c != t.length) d = !1;
    else
        for (var u = 0; c > u; u++) { var m = t.charAt(u),
                f = s.charAt(u); switch (m) {
                case "#":
                    -1 == o.indexOf(f) && (d = !1); break;
                case "A":
                    -1 == a.indexOf(f) && (d = !1); break;
                case "a":
                    -1 == r.indexOf(f) && (d = !1); break;
                case "Z":
                    -1 == n.indexOf(f) && (d = !1); break;
                case "*":
                    -1 == l.indexOf(f) && (d = !1); break;
                default:
                    -1 == i.indexOf(f) && (d = !1) } }
    d ? _contadorErro = 0 : (_contadorErro++, _contadorErro > 3 && (e.value = ""), alert("Valor do campo inválido! Formato: " + t), e.select()) }

function validar_data(e) { var t = "",
        a = /^((0[1-9]|[12]\d)\/(0[1-9]|1[0-2])|30\/(0[13-9]|1[0-2])|31\/(0[13578]|1[02]))\/\d{4}$/,
        r = /^(([0-1]\d|2[0-3])(:[0-5]\d:[0-5]\d.\d{3}|:[0-5]\d:[0-5]\d|:[0-5]\d)?)?$/,
        n = e.value; if ("" != n) try { var o = n.substring(0, 10),
            i = n.substring(11);
        a.test(o) ? r.test(i) || (t = "Horario inválido! formato HH:mm:ss.SSS (24H)") : t = "Data inválida! formato dd/MM/yyyy" } catch (l) { t = "Data inválida! formato dd/MM/yyyy" }
    "" != t ? (_contadorErro++, _contadorErro > 3 && (e.value = ""), alert(t), e.select()) : _contadorErro = 0 }

function validar_decimal(e) { var t = /^[+-]?((\d+|\d{1,3}(\,\d{3})+)(\.\d*)?|\.\d+)$/; "" != e.value && (t.test(e.value) ? -1 == e.value.indexOf(".") ? (e.value += ".00", _contadorErro = 0) : _contadorErro = 0 : (_contadorErro++, _contadorErro > 3 && (e.value = ""), alert("Valor numérico inválido! formato 9999.99"), e.select())) }

function validar_inteiro(e) { var t = /^\d+$/; "" == e.value || t.test(e.value) ? _contadorErro++ : (_contadorErro++, _contadorErro > 3 && (e.value = ""), alert("Valor inteiro inválido! formato 999999"), e.select()) }

function isNumber(e) { var t = !1; for (i = 0; i < e.length; i++) { var a = e.charAt(i); "." != a && "," != a && "-" != a && isNaN(parseInt(a)) && (t = !0) } return !t }

function isEmpty(e) { return !e || "" == trim(e) }

function nullToEmpty(e) { return null == e && (e = ""), e }

function inputBox() { var e = document.getElementById("_func");
    e || (e = document.createElement("input"), e.type = "hidden", e.id = "_func", e.name = "_func", document.getElementById("form").appendChild(e)), e.value = arguments[0]; var t = document.getElementById("_params");
    t || (t = document.createElement("input"), t.type = "hidden", t.id = "_params", t.name = "_params", document.getElementById("form").appendChild(t)); for (var a = "", r = 100, n = 1; n < arguments.length; n++) a += "/@@/" + arguments[n], r += "bigtext" == arguments[n].split(",")[2] ? 100 : 20;
    t.value = a.substring(4), toNewFrame(null, "finalizar", "encaminhar,/common/system/params.jsp", "width=300,height=" + r, "_func,_params") }

function showAlt(e, t) { tempo && hideAlt(), tempo = setTimeout('show("' + e + '", ' + t.clientY + ", " + t.clientX + ");", 500) }

function show(e, t, a) { var r = document.getElementById(e); if (r) { "gecko" == navigator.family ? (pad = "0", bord = "1 bordercolor=black") : (pad = "1", bord = "0"); var n = "<table cellspacing=0 cellpadding=" + pad + " border=" + bord + " bgcolor=000000><tr><td>\n<table cellspacing=0 cellpadding=3 border=0 width=100%><tr><td bgcolor=ffffdd><center><font size=-2 face=Verdana>\n" + r.getAttribute("alt") + "\n</td></tr></table>\n</td></tr></table>",
            o = document.getElementById("_alt");
        o.innerHTML = n, t += 20, t + o.offsetHeight > getMaxTop() && (t = t - 22 - o.offsetHeight), a + o.offsetWidth > getMaxLeft() && (a -= a + o.offsetWidth - getMaxLeft()), o.style.left = a, o.style.top = t, o.style.visibility = "visible" } }

function hideAlt() { tempo && clearTimeout(tempo), document.getElementById("_alt").style.visibility = "hidden", document.getElementById("_alt").innerHTML = "" }

function showLoad(e) { if (null != e) { var t = _aCountLoad[e];
        (!t || isNaN(t)) && (t = 0), _aCountLoad[e] = ++t; var a = ""; if (t > 1 && (a = "<span style='font-size:" + 20 * t + "px'>X" + t + "</span>"), "geral" == e) { var r = document.getElementById("_load"); if (r) { document.getElementById("_tdLoadLabel").innerHTML = a, r.style.top = "50%", r.style.left = "50%"; var n = r.offsetLeft - r.offsetWidth / 2,
                    o = r.offsetTop - r.offsetHeight / 2;
                r.style.top = o, r.style.left = n, r.style.visibility = "visible" } } else { var r = document.getElementById("_" + e + "Loader");
            r && r.parentNode.removeChild(r), a = "" == a ? "..." : " " + a; var i = document.createElement("span");
            i.id = "_" + e + "Loader", i.innerHTML = "Carregando" + a, i.className = "subLoader", i.style.cssText = "position:absolute; top:0px; left:0px;", document.getElementById(e).appendChild(i) } } }

function hideLoad(e) { if (null != e) { var t = _aCountLoad[e]; if (_aCountLoad[e] = --t, "geral" == e) { if (_aCountLoad[e] = --t, showLoad(e), 0 == _aCountLoad[e]) { var a = document.getElementById("_load");
                a && (a.style.visibility = "hidden") } } else if (_aCountLoad[e] = --t, showLoad(e), 0 == _aCountLoad[e]) { var a = document.getElementById("_" + e + "Loader");
            a.parentNode.removeChild(a) } } }

function showCombos() { for (var e = 0; e < aSelHidden.length; e++) aSelHidden[e].style.visibility = "visible";
    aSelHidden = new Array }

function hideCombos() { for (var e = document.getElementsByTagName("select"), t = 0, a = 0; a < e.length; a++)("" == e[a].style.visibility || "visible" == e[a].style.visibility) && (e[a].style.visibility = "hidden", aSelHidden[t++] = e[a]) }

function getBody() { var e = document.getElementById("body"); return e || (e = document.getElementsByName("body")[0]), e }

function getFrameParent() { for (var e = 1, t = self; t != t.parent;) t = t.parent, e++; var a = t.document.createElement("div"); return a.id = "_frameParent", a.style.cssText = "overflow:hidden; position:absolute; top:0px; left:0px; width:100%; height:100%; z-index:" + 90 * e + ";", a.onscroll = new Function("this.scrollLeft = 0; this.scrollTop = 0;"), t.getBody().appendChild(a), a }

function getShadow(e) { var t = getPrincipal(),
        a = t.document.createElement("div");
    a.style.cssText = "position:absolute; margin-left:3px; margin-top:3px;"; var r = t.document.createElement("div");
    r.style.cssText = "position:absolute; top:0; left:0; width:100%; height:100%;", r.className = "cShadow"; var n = t.document.createElement("div"); return n.style.cssText = e.style.cssText, r.appendChild(n), a.appendChild(r), a.appendChild(e), a }

function showModal() { hideCombos(); for (var e = 1, t = getJAtivo(); t != t.parent;) t = t.parent, e++; var a = t.document.getElementById("_dModal"); return a && "none" != a.style.display || (a = t.document.createElement("div"), a.className = "cModal", a.style.cssText = "position:absolute; top:0px; left:0px; width:100%; height:100%; filter:alpha(opacity=55); -moz-opacity:0.55; opacity:0.55; z-index:" + 90 * e + ";", t.getBody().appendChild(a)), t.aModal.push(a), a }

function hideModal() { var e = getPrincipal(),
        t = e.aModal.pop(); try { t.parentNode.removeChild(t) } catch (a) { t.style.display = "none" }
    getJAtivo().showCombos() }

function getMiddleTop(e) { return screen.height / 2 - e / 2 }

function getMiddleLeft(e) { return screen.width / 2 - e / 2 }

function getTopVlr(e) { var t; if (t = e.offsetTop, null != e.offsetParent) t += ("fieldset" == e.offsetParent.getAttribute("tipo") ? 2 : 0) + getTopVlr(e.offsetParent);
    else { var a = getPrincipal(); if (a != self) { var r = a.document.getElementById(a._aFrame[a._aFrame.length - 1][0]).parentNode;
            t += r.offsetTop + 24 - 3 } } return t }

function getLeftVlr(e) { var t; if (t = e.offsetLeft, null != e.offsetParent) t += ("fieldset" == e.offsetParent.getAttribute("tipo") ? 2 : 0) + getLeftVlr(e.offsetParent);
    else { var a = getPrincipal(); if (a != self) { var r = a.document.getElementById(a._aFrame[a._aFrame.length - 1][0]).parentNode;
            t += r.offsetLeft + 2 - 3 } } return t }

function getMaxLeft() { return getInnerWidth(arguments[0]) + getScrollLeft(arguments[0]) }

function getMaxTop() { return getInnerHeight(arguments[0]) + getScrollTop(arguments[0]) }

function getInnerWidth() { var e = arguments[0]; return null == e && (e = document.getElementById("_divScroll")), e.offsetWidth }

function getInnerHeight() { var e = arguments[0]; return null == e && (e = document.getElementById("_divScroll")), e.offsetHeight }

function getScrollLeft() { var e = arguments[0]; return null == e && (e = document.getElementById("_divScroll")), e.scrollLeft }

function getScrollTop() { var e = arguments[0]; return null == e && (e = document.getElementById("_divScroll")), e.scrollTop }

function preencherCampos(req) { var xml = req.responseXML; if (xml) { var lDados = xml.getElementsByTagName("dados")[0]; if (lDados)
            for (var aCampo = lDados.getElementsByTagName("campo"), i = 0; i < aCampo.length; i++) { var campo = aCampo[i],
                    node, nome = ""; if (node = campo.getElementsByTagName("nome")[0].firstChild) var nome = node.nodeValue; var valor = "";
                node = campo.getElementsByTagName("valor")[0].firstChild, node && (valor = node.nodeValue), eval("document.form." + nome + '.value = "' + valor + '";'), eval("try{ document.form." + nome + ".focus(); }catch(e){}") } else alert("dados = false\r\n" + req.responseText) } else alert("xml = false\r\n" + req.responseText) }

function fastSearch() { var e = arguments[0]; if ("" != e && searchValue != e) { searchValue = ""; var t = (document.getElementById("form"), newXMLHttpRequest()),
            a = getReady(t, preencherCampos, arguments[2], arguments[3]);
        t.onreadystatechange = a, t.open("POST", getAction(), !0), t.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded; charset=UTF-8'); var r = "",
            n = document.getElementById("obj");
        n && (r += n.name + "=" + n.value + "&"), r += "cmd=buscaRapida&submitedType=fastSubmit&vlrComparacao=" + e + "&objFast=" + arguments[1], _enviarReq(t, r, "geral") } else searchValue = "" }

function openSearch(e, t) { var a = getPrincipal(); if (!a.document.getElementById(a._currentSearch)) { var r = 353,
            n = 83,
            o = getTopVlr(e) + e.offsetHeight - getJAtivo().getScrollTop(),
            i = getLeftVlr(e) - getJAtivo().getScrollLeft(),
            l = a.getMaxLeft() - r,
            d = a.getMaxTop() - n;
        i > l && (i = Math.max(0, Math.min(i, l))), o > d && (o = Math.max(0, o - e.offsetHeight - n)), a._currentSearch = "_iSearch" + a._qtdFrames++; var s = a.document.createElement("iframe");
        s.setAttribute("id", a._currentSearch), s.setAttribute("name", a._currentSearch), s.frameBorder = "0", s.style.cssText = "background-color:#ffffff; width:" + (r - 3) + "px; height:" + (n - 3) + "px; position:relative; bottom:3px; right:3px;"; var c = getShadow(s);
        c.style.top = o + "px", c.style.left = i + "px", c.style.zIndex = 90 * a._qtdFrames, a.getBody().appendChild(c); { a.document.getElementById("form") }
        jSubmit = a.frames[a._currentSearch], jSubmit.document.write("<html><body><form name='form' id='form' action='" + getAction() + "' method='POST'><table width='100%' height='100%'><tr><td width='100%' height='100%' align='center' vAlign='middle'><img src='/smarrh/imagens/system/workingGG.gif'/></td></tr></table><input type='hidden' name='cmd' value='search'/><input type='hidden' name='parametros' value='" + t + "'/><input type='hidden' name='submitedType' value='toNewFrame'/>"), jSubmit.document.write("<input type='hidden' name='tag' value='" + (e ? e.getAttribute("id") : "") + "'/>"); for (var u = getObjetos(null), m = 0; m < u.length; m++) { var f = u[m].split("/*@@*/");
            jSubmit.document.write("<textarea name='" + f[0] + "' style='display:none;'>" + f[1] + "</textarea>") }
        jSubmit.document.write("</form></body></html>"), _navegador.isNS && jSubmit.document.close(); var g = jSubmit.document.getElementById("form");
        g.submit() } }

function closeSearch() { var e = getPrincipal(),
        t = e.document.getElementById(e._currentSearch).parentNode;
    t.parentNode.removeChild(t) }

function formToURL() { for (var e = "", t = document.getElementsByTagName("input"), a = 0; a < t.length; a++) { var r = t[a]; "file" != r.type && ("checkbox" != r.getAttribute("tipo") && "radio" != r.getAttribute("tipo") ? e += "&" + r.name + "=" + r.value : r.checked && (e += "&" + r.name + "=" + r.value)) } for (var n = document.getElementsByTagName("textarea"), a = 0; a < n.length; a++) { var r = n[a];
        e += "&" + r.name + "=" + r.value } for (var o = document.getElementsByTagName("select"), a = 0; a < o.length; a++) { var r = o[a];
        e += "&" + r.name + "=" + r.value } return "" != e && e.substring(1), e }

function fechar() { var e = arguments[0],
        t = arguments[1]; if (null == t && (t = !0), e && e.document || (e = self), e) { var a = getPrincipal(); if (e == a) window.opener ? window.close() : window.location = "about:blank";
        else if (e.opener) e.close();
        else if (e.parent) { var r = a._aFrame.pop(),
                n = r[0];
            t && atualizarWin(r[1]); var o = a.document.getElementById(n).parentNode.parentNode;
            o.parentNode.removeChild(o), a.hideModal() } } }

function atualizarWin() { for (var e = arguments[0], t = e.document.getElementsByTagName("div"), a = 0; a < t.length; a++) { var r = t[a].getAttribute("tipo"); if (null != t[a] && ("grid" == r || "treeview" == r)) { var n = t[a].getAttribute("id");
            e.setTimeout('fastSubmit(null, "getPage", "' + n + '", null, ' + n + "Navegacao)", 0) } } for (var o = e.document.getElementsByTagName("input"), a = 0; a < o.length; a++) null != o[a] && "suggestinput" == o[a].getAttribute("tipo") && e.removeAutoSuggest(o[a]) }

function removerElemento(e) { if (e) { var t = e.parentNode;
        t.removeChild(e) } }

function setValor(e) { e && (searchValue = e.value) }

function getValor() { return searchValue }

function addListener(e, t, a, r) { e.addEventListener ? ("undefined" == typeof r && (r = !1), e.addEventListener(t, a, r)) : this.attachEvent && e.attachEvent("on" + t, a) }

function getPrincipal() { var e = arguments[0]; for (null == e && (e = self); e != e.parent;) e = e.parent; return e }

function getIndex() { var e = 1,
        t = arguments[0]; for (null == t && (t = self); t != t.parent;) t = t.parent, e++; return e }

function getJAtivo() { var e = getPrincipal(),
        t = e; if (e._aFrame.length > 0) { var a = e._aFrame[e._aFrame.length - 1][0];
        t = e.frames[a].frames.inferior } return t }

function getOpener() { var e = getPrincipal(),
        t = e; return e._aFrame.length > 0 && (t = e._aFrame[e._aFrame.length - 1][1]), t }

function setFocusTo(e) { e = e.toLowerCase(); var t = document.getElementsByName(e);
    t[0] && t[0].select() }

function DecHex(e) { var t = "0123456789ABCDEF",
        a = t.charAt(Math.floor(e / 16)),
        r = t.charAt(e % 16); return a + r }

function toURL(e) { return encodeURIComponent(e) }

function validaForm() { for (var e = 0; e < _aNotNull.length; e++) isEmpty(document.getElementsByName(_aNotNull[e][0])[0].value) && erro.put(_aNotNull[e][0], _aNotNull[e][1]) }

function trim(e) { return e.replace(/^\s*|\s*$/g, "") }

function replaceAll(e, t, a) { for (; e.indexOf(t) > -1;) e = e.replace(t, a); return e }

function getAction() { return "/smarrh/servlet/controle" }

function getValue(e) { var t = null,
        a = document.getElementById(e); if (a)
        if ("radio" == a.getAttribute("tipo"))
            for (var r = document.getElementsByName(e), n = 0; n < r.length; n++) r[n].checked && (t = r[n].value);
        else t = "check" == a.getAttribute("tipo") ? document.getElementById(e + "H").value : a.value;
    return t }

function finalize_calendar() { var e = getPrincipal().document.getElementById("_iCalendar");
    e && (e.parentNode.style.display = "none") }

function finalize_history(e) { var t = getPrincipal().document.getElementById("_history" + e);
    t && (t.style.display = "none") }

function Erro() { this.aErro = new Array }

function validaManual(e) { var e = trim(e); if ("Microsoft Internet Explorer" == navigator.appName) { var t = null; if (window.ActiveXObject) { try { t = new ActiveXObject("AcroPDF.PDF") } catch (a) {} if (!t) try { t = new ActiveXObject("PDF.PdfCtrl") } catch (a) {} }
        t ? window.open("/smarrh/Help/" + e, "", "") : show_confirm() } else { var r = navigator.plugins.length,
            n = !1; for (i = 0; i < r; i++) "Adobe Acrobat" == navigator.plugins[i].name && (n = !0);
        n ? window.open("/smarrh/Help/" + e, "", "") : show_confirm() } }

function show_confirm() { var e = confirm("O plugin do Acrobat Reader não está instalado. Se desejar instalá-lo, clique em OK para ser redirecionado para a página de Download do programa."); if (1 == e) { var t = "http://get.adobe.com/br/reader/";
        window.open(t) } }
var tempo, descarray = new Array,
    aSelHidden = new Array,
    aModal = new Array,
    _navegador = new Navegador,
    _aFrame = new Array,
    _aNotNull = new Array,
    _currentSearch = "",
    _aObjResize = new Array,
    _aCountLoad = new Array,
    _contadorErro = 0,
    searchValue = "",
    _taskCalendar = null,
    _timeCalendar = 500,
    _taskHistory = null,
    _timeHistory = 500;
Erro.prototype = { put: function(e, t) { null == t && (t = e, e = "XXXXXX"), this.aErro.push([e, t]) }, getSize: function() { return this.aErro.length }, show: function() { for (var e = "", t = 0; t < this.aErro.length; t++) t > 0 && (e += "<br/>"), e += "<a href='javascript:setFocusTo(\"" + this.aErro[t][0] + "\");'>" + this.aErro[t][1] + "</a>\n";
        document.getElementById("_errText").innerHTML = e, document.getElementById("_errMess").style.display = "", this.aErro = new Array } };
var erro = new Erro;